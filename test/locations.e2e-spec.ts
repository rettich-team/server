import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, NotFoundException, ConflictException } from '@nestjs/common';

import { LocationsModule } from '../src/locations/locations.module';
import { LocationsService } from '../src/locations/locations.service';
import { LocationsRepository } from '../src/locations/locations.repository';
import { LocationFillingLevel } from '../src/locations/locationFillingLevel.enum';

const mockLocationsService = {
  getLocations: jest.fn(),
  getLocation: jest.fn(),
  addLocation: jest.fn(),
  updateLocationDescription: jest.fn(),
  updateLocationFillingLevel: jest.fn(),
};

describe('Locations', () => {
  let app: INestApplication;
  
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [LocationsModule],
    })
      .overrideProvider(LocationsService)
      .useValue(mockLocationsService)
      .overrideProvider(LocationsRepository)
      .useValue(() => ({}))
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('/locations/ GET', () => {
    it('should return an array of locations', () => {
      return request(app.getHttpServer())
        .get('/locations/')
        .expect(200)
        .expect(mockLocationsService.getLocations.mockReturnValue([]));
    });
  });

  describe('/locations/:latitude/:longitude GET', () => {
    it('should return one location', () => {
      return request(app.getHttpServer())
        .get('/locations/0/0')
        .expect(200)
        .expect(mockLocationsService.getLocation.mockReturnValue({}));
    });

    it('should return a 404 if the location was not found', () => {
      mockLocationsService.getLocation = jest.fn().mockImplementationOnce(() => { 
        throw new NotFoundException('Location at 1,1 not found.'); 
      });

      return request(app.getHttpServer())
        .get('/locations/1/1')
        .expect(404)
        .expect({
          statusCode: 404,
          message: 'Location at 1,1 not found.',
          error: 'Not Found'
        });
    });
  });

  describe('/locations POST', () => {
    it('should return the added location', () => {
      return request(app.getHttpServer())
        .post('/locations')
        .send({ latitude: 0, longitude: 0 })
        .expect(201)
        .expect(mockLocationsService.addLocation.mockReturnValue({}));
    });

    it('should return a 409 if the location already exists', () => {
      mockLocationsService.addLocation = jest.fn().mockImplementationOnce(() => { 
        throw new ConflictException('Location at 0,0 already exists.'); 
      });

      return request(app.getHttpServer())
        .post('/locations')
        .send({ latitude: 0, longitude: 0 })
        .expect(409)
        .expect({
          statusCode: 409,
          message: 'Location at 0,0 already exists.',
          error: 'Conflict'
        });
    });
  });

  describe('/locations/:latitude/:longitude/description PATCH', () => {
    it('should update the description of a location', () => {
      return request(app.getHttpServer())
        .patch('/locations/0/0/description')
        .send({ description: 'new' })
        .expect(200)
        .expect(mockLocationsService.updateLocationFillingLevel.mockReturnValue({}));
    });

    it('should return a 404 if the location was not found', () => {
      mockLocationsService.updateLocationDescription = jest.fn().mockImplementationOnce(() => { 
        throw new NotFoundException('Location at 1,1 not found.'); 
      });

      return request(app.getHttpServer())
        .patch('/locations/1/1/description')
        .expect(404)
        .expect({
          statusCode: 404,
          message: 'Location at 1,1 not found.',
          error: 'Not Found'
        });
    });
  });

  describe('/locations/:latitude/:longitude/fillingLevel PATCH', () => {
    it('should update the filling level of a location', () => {
      return request(app.getHttpServer())
        .patch('/locations/0/0/fillingLevel')
        .send({ fillingLevel: LocationFillingLevel.FULL })
        .expect(200)
        .expect(mockLocationsService.updateLocationFillingLevel.mockReturnValue({}));
    });

    it('should return a 404 if the location was not found', () => {
      mockLocationsService.updateLocationFillingLevel = jest.fn().mockImplementationOnce(() => { 
        throw new NotFoundException('Location at 1,1 not found.'); 
      });

      return request(app.getHttpServer())
        .patch('/locations/1/1/fillingLevel')
        .expect(404)
        .expect({
          statusCode: 404,
          message: 'Location at 1,1 not found.',
          error: 'Not Found'
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});