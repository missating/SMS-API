[![Coverage Status](https://coveralls.io/repos/github/missating/SMS-API/badge.svg?branch=ch-setup-travis)](https://coveralls.io/github/missating/SMS-API?branch=ch-setup-travis)
[![Build Status](https://travis-ci.com/missating/SMS-API.svg?branch=dev)](https://travis-ci.com/missating/SMS-API)


# SMS-API

## Introduction

> **SMS Manager** is an API that enables users send and recieve messages after they successfully register as a contact.

## Table of Content
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Testing](#testing)
- [API Docs](#api-docs)

## Features

* A user can register as contact
* A user can send SMS
* A user can receive SMS
* A user can view their contact details, sent message and received messages
* Deleting a user deletes all reference to messages they sent or received

## Technologies

* NodeJS
* ExpressJS
* MongoDB
* Mongoose
* Mocha
* Chai

## Installation

* Install `Node.js` on your local machine
* Then, Clone the repo by running

```sh
> $ git clone https://github.com/missating/SMS-API.git
```

* Change directory into the root of the project

```sh
> $ cd SMS-API
```

* Install all needed dependencies by running

```sh
> $ npm install
```

* Once installation is done, create a database to be used with the application

* To start the application, run

```sh
> $ npm start
```

* The APP should be up and running on `localhost:4000`

## Testing
Unit tests - Run `npm run test` on the terminal while within the project root directory. Unit testing is achieved through the use of Mocha (A JS test framework 
that runs both on Node.js and in the browser) and Chai (A BDD/TDD assertion library for node and the browser).

## API docs

* POST `localhost:4000/api/v1/contact/register`

  * To register as a contact, hit this endpoint via postman and supply the `Name`, and `phoneNumber` properties to the request body

* GET `localhost:4000/api/v1/contact/:id`
  * To view your contact details, supply your userId i.e id as a params to the route.
  
* DELETE `localhost:4000/api/v1/contact/:id`
    * To delete your contact details, supply your userId i.e id as a params to the route.

  **NOTE**: Deleting your contact details removes all messages that you have sent or received in the application.

* POST `localhost:4000/api/v1/sms`
  * To send a message, hit this endpoint via postman and supply the `message`, `senderNumber` and `receiverNumber` as properties to the request body.

* GET `localhost:4000/api/v1/message/sent_messages/:id`
  * To view your sent messages, supply your userId i.e id as a params to the route.

* GET `localhost:4000/api/v1/received_messages/:id`
  * To view your received messages, supply your userId i.e id as a params to the route.
