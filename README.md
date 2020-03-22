# Crisisite – a complete website ecosystem to help crisis management teams contact with citizens

## Introduction

Crisisite is a website ecosystem for cities, communes and other organizations to help them exchange most important local information about crisis with their citizens.

Our idea was to make simple as possible – out of the box solution which would organise local information about COVID-19 or any other crisis case. Currently most of the informations is mixed with other daily basis content on city hall websites and that’s why many important news may disappear.

[Read more about our ideas & technical details in a documentation on Google Docs](https://docs.google.com/document/d/1s8sjNXSRdiYaO02y-mWCWHxW-udl1G5MU9eDY9hPN7A/edit?usp=sharing).

## Basic commands setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate

# generate SPA mode project
$ yarn build --spa

# run docker ecosystem (builds WordPress back-end and runs Nuxt app in SSR mode)
$ docker-compose up --build -d
```

## Links

*Dockerhub image* [https://hub.docker.com/r/softwarethings/crisisite](https://hub.docker.com/r/softwarethings/crisisite)

*Demo* [https://czk.softwarethings.pro](https://czk.softwarethings.pro)
