#!/bin/sh

echo "=====> Waiting for MongoDB to start..."
./wait-for db:27017 

echo "=====> Waiting for Redis to start..."
./wait-for redis:6379  

echo "=====> Starting the server..."
npm run dev 