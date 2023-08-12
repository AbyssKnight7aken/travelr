# travelR

travelR web application is my course project for the Angular course (June 2023) in SoftUni.

## Project Overview

1. [Introduction](#introduction)
2. [Client](#client)
   - [Features](#user-features)
   - [Architecture-Overview](#architecture-overview)
3. [Server](#server)
4. [Database](#database)

## Introduction
The main goal of TravelR is to be like a bonfire place where you are welcome to share the magic of your journeys all over the world through the art of photography.

 The application is designed and inmplemented according to the project defense assignment. It has public and private parts.

The public part is visible without authentication and includes the home, catalogue, and about pages, login and register forms and search functionality.

The private part is only for registered users and it is accessible only after successful login. It contains the user profile page that holds all user's logs and the functionality to edit the user's info. Logged in users can create, edit and delete their logs and have the options to like, comment and download the photos.


## Client

The client-side is build with Angular. To test the application, you have to follow these steps:
* Download the repository.
* Run `npm install` in the client directory to install the required dependencies.
* Run `ng serve` for the app to start.
* Navigate to `http://localhost:4200/`.

The application will automatically reload if you change any of the source files.
    

### Features 
The main feature of the application is fully working CRUD operations with image files.

* Home page - displays the last three logs from the database.
* Logs page - Catalogue that displays all logs from the database in separate pages.
* About page - Brief documentaton about the application.
* Sign In/UP button - shows Register and Login forms.
* Search bar - shows search input to find all matches in the database by log name.
* Add Log - Logged in users can upload an image and create log.
* Profile page:
    - dispalys the User info and all user's logs.
    - Edit Profile - Logged in users can edit their username, email and upload new avatar.
* Log Details page:
    - shows detailed information and all comments about the log.
    - Loged in users can like, post comments and download the log image.
    - The creator of the log can post comments, download the log image, edit the log info and delete the log.
* 404 page - Animated page, that pops up when there is no matching route.    


### Architecture-Overview
Angular applications are modular and Angular has its own modularity system called NgModules. NgModules are containers for a cohesive block of code dedicated to an application domain, a workflow, or a closely related set of capabilities. They can contain components, service providers, and other code files whose scope is defined by the containing NgModule. They can import functionality that is exported from other NgModules, and export selected functionality for use by other NgModules.

* App Module - The root module and the entry point of the application. Imports all modular routes.
* Auth Module - Holds the compomens and logic about user authentication, autorization and the corresponting routes.
    - Register Component.
    - Login Component.
    - Profile Page Component.
    - Edit Profile Component.
    - User Routing Module.
* Core Module - Loads Header and Footer Components.
* Shared Module - Holds reusable comonents, needed for different parts of the application:
    - Card Component
    - Loader Component
    - Modal Component
    - Pagination Component
* Views Module - Includes Components and logic about the Logs and loads the Logs Routing Module.
* Guards - Route Guards that prevents unauthorized access, according to the users roles.
* Interceptors - HttpInterceptor that attches the needed headers for authorized requests to the server.
* Services - Holds the logic for communicating with the server and provide core functionalities across the components.
* Types - Hollds all application interfaces.


## Server

The server is a RESTful API that is build with Node.js and Express.js. Run `npm install` in the server directory to install the required dependencies and after that run `npm start` to start the server. The server will automatically reload if you change any of the source files.

* Used libraries:
    - `nodemon` - automaticaly restarts the server during development.
    - `bcrypt`, `cookie-parser`, `jsonwebtoken` - for authentication and authorizaton.
    - `express-validator` - for data validation.
    - `moment` for date manipulation.
    - `mongoose` - for easily working with mongoDB.
    - `multer` - middleware for file storing and file uploads.

## Database

MongoDB with Mongoose is used for storing and managing the data.