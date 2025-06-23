# SCOS

## Libraries and tools used in the project

- [Bun](https://bun.sh/docs/installation) for runtime, package manager and any TS ecosystem
- [Express JS](https://expressjs.com/)
- [InversifyJS](https://inversify.io/) for dependecies injection
- [Prisma](https://www.prisma.io/) for ORM
- [Postgresql](https://www.postgresql.org/) for database server
- [Zod](https://zod.dev/) for validation and open api schema

## Prerequisites to run locally

- Install [Bun](https://bun.sh/docs/installation)
- Install [Docker and Docker Compose](https://docs.docker.com/compose/install/)

## Get Started

1. `bun install`
2. `bun setup`
3. `docker compose up -d` to have running database server locally.
4. `bun db:migrate` to create database with up-to-date schema
5. `bun db:seed` to feed some initial data. This is idempotent. So we can run as much as we want later.
6. `bun dev`, the app will be available in http://localhost:3000 and Api docs will be available in http://localhost:3000/swagger

## Other notes

### Folder Structure

- `controllers`: Handle HTTP requests and responses
- `business`: Implement core application logic in service classes
- `dtos`: Define data transfer objects with Zod validation
- `core`: Core application utilities
- `entities`: Auto generated using `prisma-class-generator`.
- `enums`
- `helper`: business logic reusable pure functions
- `openApi`: Api documentation related

### What to do when I want to update DB schema

1. Update schema in prisma/schema.prisma file
2. run `bun db:generate` to regenerate new prisma client
3. run `bun db:migrate` to apply migration to the database

### Unit test

Run `bun test`

### Assumptions

1. Total price does not include include discount and shipping cost. I based this assumption from the online shopping app
   For e.g., totalPrice = 1000, discount = 10 and shippingCost = 100.
   So the actual amount that customer will pay is 1000 - 10 + 100 = 1090
2. The db is supporting multi-currency but not being used yet for simplicity.
3. The distance will be always rounded up. For e.g., 12.3 km will be 13 km.
4. The distance calculation will be as the crow flies approach.

### Improvement roadmap

- Setup actual infra and continuous deployment (Now only CI is implemented)
- Use geospatial data
- Use distributed cache for some data such as shipping rate
