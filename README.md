# Rettich

:wrench: Under construction

## Table of Contents

- [Get Started](#get-started)
- [Contribution](#contribution)
- [API Documentation](#api-documentation)
- [License](#license)

<a name="get-started"></a>

### Get Started

#### 1. Install node dependencies

```sh
npm i
```

If you have an error saying `npm Error: Cannot find module 'nan'`, just install `nan` globally:

```sh
npm i -g nan
```

#### 2. Configure your environment

Create an *.env* file in the root directory. You can use this sample configuration

```yml
SERVER_PORT=3000

NODE_ENV=development

DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=admin
DATABASE_NAME=RettichDB
DATABASE_LOGGING=false
DATABASE_SYNCHRONIZE=true

SWAGGER_TITLE=RettichAPI
SWAGGER_DESCRIPTION=API
SWAGGER_VERSION=1.0
SWAGGER_PATH=api-docs

LOCATION_DESCRIPTION_MAX_LENGTH=3000
```

#### 3. Start the postgres database

- To start the database in a `Docker` container you need to install `Docker` on your system from [here](https://www.docker.com/products/docker-desktop).

- When Docker is installed start the database like this:

```sh
docker-compose up -d
```

#### 4. Start the server

```sh
npm start
```

<a name="contribution"></a>

### Contribution

Please have a look at [here](https://github.com/rettich-team/server/blob/master/CONTRIBUTING.md)

<a name="api-documentation"></a>

### API Documentation

The api documentation is generated with [Swagger](https://docs.nestjs.com/recipes/swagger)

To access it start your server in development mode and navigate to `/api-docs` (you can change the path in the environment variables -> SWAGGER_PATH)

<a name="license"></a>

### License

[MIT](https://github.com/rettich-team/server/blob/master/LICENSE)
