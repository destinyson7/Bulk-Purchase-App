# Design and Analysis of Software Systems

## Assignment 2

**Tanish Lad** <br/>
**2018114005**

## Bulk Purchase App

## About

- Web application based on MERN stack - MongoDB, Express.js, React.js, and Node.js.

- The app will has an option for sellers to host their products along with the minimum bulk dispatch quantity.

- Various customers can select from the listed products and order them with their own required quantity.

- When enough orders are placed for the product and bulk quantity requirements are met, the vendor can dispatch the order

### Pre-requisites

You need to install the following to make this work.

- `mongodb`
- `express`
- `react`
- `node`
- `mongoose`

## Running the app

Run Mongo daemon:

```
sudo mongod
```

Mongo will be running on port 27017.

Run Express:

```
cd backend/
npm install
nodemon server.js
```

Run React:

```
cd frontend
npm install/
npm start
```

Navigate to localhost:3000/ in your browser.
