# Dokan API
A simple inventory boilerplate using Typescript, ExpressJS, Mongoose, Redis, JWT, and Docker

## Installation

Download the project from  [GitHub](https://github.com/trroyel/dokan) and open the project directory with your favorite IDE or terminal. You can Build & Run the project with [Docker Compose](https://docs.docker.com/compose/). The app will start with [ts-node](https://typestrong.org/ts-node/). This project is in development mode and the project directory is mapped to the container app directory for publishing changes immediately (Hot Reloading). So, you have to install dependencies in the project folder.

```bash
npm install
docker-compose build --no-cache
docker-compose up
```
If you want to run this project without docker, then you've to install [NodeJS](https://nodejs.org/en/download/), [MongoDB](https://www.mongodb.com/docs/manual/installation/), and [RediSearch](https://redis.io/docs/stack/search/) in your system. If you have a Typescript compiler installed globally in your system, then you can compile this project's Typescript src folder into Javascript to the build folder as well as see the real-time logs to the console.

```bash
npm install
tsc -w
```
After compiling the project, you can run it by node, nodemon, or npm in a separate terminal window.

```bash
npm start 
node build/server.js
nodemon build/server.js
```
Here, nodemon will use ts-node under the hood.
## Usage
An src/rests folder attached to this project contains all API routes and sample data. You can start with the 'auth.rest' for getting access and refresh tokens. 
```JSON
###
#Get authenticated
POST {{server}} HTTP/1.1
Accept: application/json
Content-Type: application/json

{   
    "email": "misirali@gmail.com",
    "password": "12345"
}

{
    "_user": "632d9bcb80d4007d9f18d0bc",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9****",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJkOWJjYjgwZDQwMDdkOWY****",
    "createdAt": 1663946411402,
    "accessTokenExpAt": 1663950011405,
    "refreshTokenExpAt": 1695482411405
}
```
Then you can access other routes with this token.
## Contributing
Pull requests are welcome. This is a very simple boilerplate. For major changes, please make a pull request for what you would like to change.

Please make sure to update tests as appropriate. Thank You!

## License
[MIT](https://choosealicense.com/licenses/mit/)