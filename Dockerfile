FROM node:alpine3.17

WORKDIR /backend

COPY ./package.json* .
RUN npm cache clean --force
RUN npm install -g nodemon
RUN npm install
COPY . /backend

EXPOSE 8000

# CMD npm start
#RUN cd ./src
#CMD ["./docker/startup"]
CMD ["npm", "run", "start:watch"]

#CMD ["npm", "run", "dev:run"]
#CMD ["yarn", "run", "watch-server"]
