#!/bin/bash

docker run --rm -it --name pinder -v $(pwd):/data -e "INSTAGRAM_ID=e8505534a78f493cad3f6bbf4cb3b4f9" -e "INSTAGRAM_SECRET=7d08a0ea0671479183a24ae27c749015" -e "MONGODB=mongodb://mongodb:27017/pinder" --link mongodb:mongodb -p 3000:3000 dockerfile/nodejs node app.js
