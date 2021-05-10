[![Build Status](https://travis-ci.com/mrndhlovu/productivity-tracker.svg?branch=master)](https://travis-ci.com/mrndhlovu/productivity-tracker)

#### React Frontend with Node JS, MongoDB Backend


## Description

A simple to-do task manager built with react, react hooks, scss. JWT web tokens is used for authentication and the production version is hosted on an Amazon EC2 instance. Used `Let's Encrypt` for an SSL certification with `Nginx` as the reverse proxy.

### Technologies

- React
- React hooks
- Webpack
- AWS S3
- Amazon EC2
- Nginx
- Let's Encrypt
- Mongodb
- Material UI
- Node JS
- Express
- Send grid
- JSON Wen Tokens
- Yarn
- Axios

### Installation

Clone the repo and `cd` into the backend folder and run
`yarn && yarn client:install`

Environmental variables
In a `.env` file the project expects the following variables

```
For sending emails
For JWT token signing
TOKEN_SIGNATURE=REPLACE WITH YOUR OWN.

// process.env.NODE_ENV returns undefined so has this only in development.
DEVELOPMENT='development'

For your development mongodb database
LOCAL_MONGO_DB=mongodb://localhost:27017/DB_NAME

Production mongodb database
MONGO_DB_URI=mongodb://localhost:27017/DB_NAME

```
