FROM alpine:latest

WORKDIR /app

COPY ./app /app

RUN apk add --update nodejs npm
RUN npm install -g @angular/cli

RUN npm install
RUN npm install --save-dev @angular-devkit/build-angular

CMD ng serve --host 0.0.0.0
