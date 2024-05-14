# MERN Booking App Setup Guide

This guide will walk you through the process of setting up the MERN Booking App on your local machine.

## Prerequisites

 - Before you begin, ensure you have Node.js installed on your system.

## Cloning the Repository

 - Start by cloning the repository to your local machine:

```bash
git clone https://github.com/AhmedNasr0/MERN_Hotel_Booking_App.git
cd MERN_Hotel_Booking_App

```

## Backend Configuration
### Setup Environment Files 
 add two files one .env and second .env.e2e 
 and add this content to both of files:
```
MONGODB_CONNECTION_STRING=
JWT_SECRET_KEY=
FRONTEND_URL=

#cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

#stripe
SECKRET_STRIPE_API_KEY=
```
2. MongoDB Setup
    1. Sign up for an account at MongoDB Atlas.
    2. Create a new cluster and follow the instructions to set up a new database.
    3. Once set up, obtain your MongoDB connection string and add it to the MONGODB_CONNECTION_STRING variable in your .env files.
3. Cloudinary Setup
    1. Create an account at Cloudinary.
    2. Navigate to your dashboard to find your cloud name, API key, and API secret.
    3. Add these details to the respective CLOUDINARY_* variables in your .env files.
4. Stripe Setup
    1. Sign up for a Stripe account at Stripe.
    2. Find your API keys in the Stripe dashboard.
    3. Add your Stripe API key to the STRIPE_API_KEY variable in your .env files.
5. JWT_SECRET_KEY
    - This just needs to be any long, random string. You can google "secret key generator".
6. Frontend URL:
    - The FRONTEND_URL should point to the URL where your frontend application is running (typically http://localhost:3000 if you're running it locally).

## Frontend Configuration
### Environment Files
1. go to the frontend folder and create a file: .env 
2. add to it : 
    - VITE_API_BASE_URL=
    - VITE_STRIPE_PUB_KEY=

### VITE_API_BASE_URL
 - The VITE_API_BASE_URL should point to the URL where your backend application is running (typically http://localhost:7000 if you're running it locally).

## Running the Application
1. Backend 
    1. got to backend 
    2. instal dependencies : npm install
    3. run server : npm run dev
1. Frontend 
    1. got to frontend
    2. instal dependencies : npm install
    3. run server : npm run dev

## Running Automated Tests
1. Mongo Setup:
    1. You will ideally want to create a new mongoDb database for your tests to run against. This is to keep the data stable
    2. Sign up for an account at MongoDB Atlas.
    3. Create a new project (e.g e2e tests)
    4. Create a new cluster and follow the instructions to set up a new database.
       Once set up, obtain your MongoDB connection string and add it to the MONGODB_CONNECTION_STRING variable in your .env.e2e file.

2. Importing Test Data into MongoDB:
    - add dummy data to test database to test with it follow my dummy data in test folder

3. Running tests:
    1. In VS Code install the Playwright extension
    2. Navigate to the e2e-tests directory.
    3. Install dependencies: npm install.
    4. Start the frontend and backend server using the steps above
    5. Using the Playwright extension to run the tests