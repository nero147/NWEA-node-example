# NWEA-node-example
## Preliminaries

This is deployed via docker, so it will require that you have docker installed. On Ubuntu/Debian this is done with `sudo apt-get install docker.io`, and on Mac OS you can do it via the DMG file you can grab [here](https://docs.docker.com/docker-for-mac/install/). The instructions for this are going to be for Ubuntu since that's most of what people are deploying to these days, but it is very similar for other environments as well. The application is running node.js and the image is based off the latest node docker container.

##Create Docker Image
To create the docker image run the following command and replace the <username> section with your username `sudo docker build -t <username>/node-blog-api`. You should get some output like this
```
Sending build context to Docker daemon 102.4 kB
Step 1/9 : FROM node:latest
 ---> c888d933885c
Step 2/9 : MAINTAINER Noah
 ---> Running in 61cbd6902cc7
 ---> 5449e50eb92b
Removing intermediate container 61cbd6902cc7
Step 3/9 : WORKDIR /usr/src/app
 ---> 1b691a33f159
Removing intermediate container e3aabbb51ed6
Step 4/9 : COPY package*.json ./
 ---> ec47bdad46ec
Removing intermediate container a68010c0e401
Step 5/9 : RUN npm install
 ---> Running in 935fc386500e

> sqlite3@3.1.13 install /usr/src/app/node_modules/sqlite3
> node-pre-gyp install --fallback-to-build

[sqlite3] Success: "/usr/src/app/node_modules/sqlite3/lib/binding/node-v59-linux-x64/node_sqlite3.node" is installed via remote
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN docker_web_app@1.0.0 No repository field.
npm WARN docker_web_app@1.0.0 No license field.

added 168 packages in 9.209s
 ---> 941ed5b027b2
Removing intermediate container 935fc386500e
Step 6/9 : COPY db.sqlite.template db.sqlite
 ---> 2375475fbcb6
Removing intermediate container 787fe6cec57a
Step 7/9 : COPY . .
 ---> 1b50045abece
Removing intermediate container 0508c7db0cf2
Step 8/9 : EXPOSE 8080
 ---> Running in bf616a3d8e27
 ---> f86e8225ac5c
Removing intermediate container bf616a3d8e27
Step 9/9 : CMD npm start
 ---> Running in f2bb8d0bec96
 ---> 32854ee7ecfa
Removing intermediate container f2bb8d0bec96
Successfully built 32854ee7ecfa
```
After that you can run this command to create an image from the output Replace the first port number with whatever port you want to map to the docker container. I just mapped mine to 8080. the `-d` in the command means that it will run detached and not be tied to your current bash session. `sudo docker run -p -d <username>/node-blog-api` You should get some output like this
```
> docker_web_app@1.0.0 start /usr/src/app
> node server.js

Server started! At http://localhost:8080
```

Now your docker container should be running. 

## Testing Your Container

You can test your API by running `GET` and `POST` commands from Postman. Just make sure that your post commands are using json (set the application type in the header) fields and that the keys are `body` and `title`. The endpoints are
```
GET http://localhost:8080/posts
POST http://localhost:8080/post
```
Just be sure to replace the port with whatever you mapped the Docker container to.