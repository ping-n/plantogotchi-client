# Plantogotochi
---

This is a team project created for the final assessment during the Coder Academy bootcamp. For this assessment we had one week for planning and less than two week to code. We had to create a React App with a Ruby on Rails backend.

Plantogotchi took inspiration from Tamagotchi giving users the ability to grow plants from a little seedling to a fully grown plant.


Rail Backend - https://github.com/novacoole/plantogotchi-api

### Team Member
---

Ping Nge - https://github.com/ping-n

Alex Coole - https://github.com/novacoole

### Installation

1: Clone the this repository through git or download as a zip file

2: Clone the backend repository from this [link](https://github.com/novacoole/plantogotchi-api)

For this repo to run the following commands from the root folder through cli of your choice
```git
<!-- Run yarn install to install on the dependencies for this react app -->
yarn install
```
3: You will need to create an .env file in your root folder for this repository and add the following code inside your .env file
```
<!-- Backend port for Rails -->
REACT_APP_BACKEND_URL=http://localhost:3000
<!-- Add a port of your choice, we will use 8080 -->
PORT=8080
```

4: You will need to follow the installation guide from Rails repository and start the Rails server on port 3000

To summarize, you should run the following commands to install the rails backend.
```git

<!-- install rails dependencies -->
bundle install

<!-- create a new database in PostgreSQL -->
rails db:create

<!-- create the schema for database -->
rails db:migrate

<!-- seed the database with different plants breed -->
rails db:seed

<!-- start the rails server -->
rails start
```

5: Start the react server and have fun 😀😀😀😀.

```git
<!-- start teh react server on the port assigned in .env -->
yarn start
```

---
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).