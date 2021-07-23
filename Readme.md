This is a simple transaction app that uses NestJs as backend and Angular as front end

# How to Run Project
## 1. Add an environment file to api
Add a .env file in the api folder (at the root of your api folder, so nest can find it)
- add below configuration to .env file 
  - DB_USERNAME=username
  - DB_PASSWORD=password
  - DB_HOST=your host
  - DB_PORT=5432
  - DB_NAME=your db
  - DB_LOG_LEVEL=all
  - DB_TYPE=postgres
  - JWT_SECRET=jwt secret

    
## To Start the Backend in dev Mode after you added the .env file
`cd api`  
`npm install`  
`npm run start:dev`

## Start the Frontend in dev Mode after you added the .env file
`cd client`    
`npm install`  
`ng serve`

## To run nestjs as a single application 
`cd client`    
`ng build --prod --aot`  
`cd api`
`npm run start:dev`


## To deploy with DOCKER

`run docker-compose up`   




