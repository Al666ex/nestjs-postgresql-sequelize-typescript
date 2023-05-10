<p align="center">

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
  
## Requirements
1. RESTfull web service working with JSON data in node.js using express and postgresql
2. two types of users: bloggers and admins
3. authentication with name/email and password, with sign-up and sign-in for bloggers, but only sign-in for admins
4. bloggers can create posts
5. bloggers can update and remove their posts
6. bloggers can publish and hide their posts
7. bloggers can see their posts whether they're public or hidden
8. blogers can see posts of other bloggers as long as they're public
9. admins can do everything bloggers can do
10. admins can remove any public post

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
