import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigurationsModule } from '../configurations/configurations.module';
import { TypeOrmLoader } from './typeORM.loader';

@Module({
    imports: [
        ConfigurationsModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigurationsModule],
            useClass: TypeOrmLoader,
        }),
    ],
    providers: [TypeOrmLoader]
})
export class LoadersModule {}
