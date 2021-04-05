# Getting Started with Project

There are 3 Module for this project (Client app, Server app, Database).

## Client app Setup
Clone/Download this Repo.

Run command `npm install`.

After successfull install, run command `npm start`

For now Client app setup is done.

## Server side app Setup

Download/Clone API project from repo [http://localhost:3000](http://localhost:3000)

Go to `appsettings.json` and open in Edit mode, Replace `DefaultConnection` value with your local database server.

## Database Setup

First run `CrudOperation.sql` to create the database.

Once it successfully completed then run `UserDetails.sql`

# What not Covered in Project

Unit test cases are not covered.

Code can be more optimized to move to base files.

JWT authentication is for demo, it does not validate with database username/passowrd- Its demonstrate the idea to retrive token from server and consume at client end.
