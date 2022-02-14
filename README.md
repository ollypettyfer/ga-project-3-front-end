Project 3
# GA-Project-3-Back-end

## Travel App
https://bit.ly/3ri1rfQ


## Requirements:
* Build a Full-stack MERN app with CRUD functionality in 2 weeks
* Use an Express API to serve your data from a Mongo database
* Consume your API with a separate front-end built with React

## Technologies:
* Vanilla JavaScript
* CSS
* HTML5
* MongoDb
* Express
* React
* Node
* Postman
* Git
* GitHub

## MVP:
* An application where users can log in to their account.
* Users can update a country they have visited on their account.
* Application stores these countries so other users can see what countries they have visited.

## Planning:

To wireframe this project we used Figma. 

![Screenshot 2022-01-13 at 11 06 12](https://user-images.githubusercontent.com/85187554/149320310-6d441706-86df-404f-bbc4-7c4b51a2b25a.png)

![Screenshot 2022-01-13 at 11 06 23](https://user-images.githubusercontent.com/85187554/149320315-1e05f834-8304-43a9-b062-f865fb4765d2.png)

We also used Trello to plan out the specific tasks that needed to be completed and assigned roles to each person. At the beginning of each class, we would have a standup to address where we were at with our certain tasks and how we wanted the day to progress. It was also a good opportunity to address any issues we had encountered.


# Highlights
When building out the back-end we completed a lot of pair coding. The tasks in question were planning and building the countries models and Schemas. 

Once this has been completed I then took control of building the CRUD functionality for the cities. I then built the comment model and schema which would allow users to leave comments/reviews on the relevant cities.

When we had data returning from our API and the user's section had been built by the team members we moved onto the front-end.
I took charge of building the home page and the navigation of the site. Once I was happy with the basic layout, I moved on to creating the Countries page which would display each place a user had visited.

I then continued to help create the member's dashboard page and styling for the app.

## Build

We were very careful when writing out countries models and schema to include all the correct data we would need for our API. This is what we all decided on.
```javascript
import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-Unique-Validator";
 
const countriesSchema = new mongoose.Schema(
 {
   // userAccount: { type: String, required: true },
   name: { type: String, required: true },
   city: { type: String },
   yearVisited: { type: Number, required: true },
   comments: { type: String, maxlength: 300 },
   rating: { type: Number, min: 1, max: 5 },
   createdBy: {
     type: mongoose.Schema.ObjectId,
     ref: "user",
   },
 },
 { timestamp: true }
);
 
countriesSchema.plugin(mongooseUniqueValidator);
 
const Country = mongoose.model("Country", countriesSchema);
 
export default Country;
```


We all had an equal share of this build, I completed the CRUD functionality on the back-end. 
```javascript
import Country from '../models/country.js'
import User from '../models/user.js'
async function getAllCountries(_req, res, next) {
 try {
   const countries = await Country.find().populate('createdBy')
 
   return res.status(200).json(countries)
 } catch (err) {
   next(err)
 }
}
 
//create Country
async function createCountry(req, res, next) {
 try {
   const newCountry = await Country.create({
     ...req.body,
     createdBy: req.currentUser._id,
   })
   console.log(`New Country >>>`, req.currentUser)
 
   return res.status(201).json(newCountry)
 } catch (err) {
   next(err)
 }
}
 
//get country
async function getCountry(req, res, next) {
 const id = req.params.id
 try {
   const country = await Country.findById(id).populate('createdBy')
   console.log(`COUNTRY >>>>> `, country)
 
   if (!country) {
     return res.status(404).send({ message: 'Country does not exit' })
   }
   return res.status(200).json(country)
 } catch (err) {
   next(err)
 }
}
 
//delete country
async function deleteCountry(req, res, next) {
 try {
   const id = req.params.id
 
   const country = await Country.findById(id)
 
   if (!country) {
     return res.status(404).send({ message: 'Country does not exist' })
   }
 
   await country.remove()
   return res.status(200).send({ message: `${country} was deleted` })
 } catch (err) {
   next(err)
 }
}
 
//update country
async function updateCountry(req, res, next) {
 try {
   const id = req.params.id
   const country = await Country.findById(id)
 
   if (!country) {
     return res.status(404).send({ message: 'Country does not exist' })
   }
 
   country.set(req.body)
   const savedCountry = await country.save()
 
   return res.status(200).json(savedCountry)
 } catch (err) {
   next(err)
 }
}
 
export default {
 getAllCountries,
 getCountry,
 createCountry,
 deleteCountry,
 updateCountry,
}
 
```

Similar to the countries model and schema we discussed as a team what we wanted the comments and review data to include before I completed the code and settle with the below data.
```javascript
import Country from "../models/country.js";
 
//create comment
async function createComment(req, res, next) {
 try {
   const { id } = req.params;
   const country = await Country.findById(id);
 
   if (!country) {
     return res.status(404).send({ message: "Country does not exist" });
   }
 
   const newComment = {
     ...req.body,
     //   createdBy: req.currentUser,
   };
 
   country.comments.push(newComment);
   const savedCountry = await country.save();
   console.log(savedCountry);
 
   return res.status(201).json(savedCountry);
 } catch (err) {
   next(err);
 }
}
 
//delete comment
async function deleteComment(req, res, next) {
 try {
   const { id, commentId } = req.params;
   const country = await Country.findById(id);
 
   if (!country) {
     return res.status(404).send({ message: "country does not exist" });
   }
   console.log(req.params);
   const comment = country.comments.id(commentId);
 
   if (!comment) {
     return res.status(404).send({ message: "comment does not exist" });
   }
   comment.remove();
 
   const savedCountry = await country.save();
   return res.status(200).send(savedCountry);
 } catch (err) {
   next(err);
 }
}
 
//update Comment
 
async function updateComment(req, res, next) {
 try {
   const { id, commentId } = req.params;
   const country = await Country.findById(id);
   console.log(req.params);
   if (!country) {
     return res.status(404).send({ message: "Country does not exist" });
   }
 
   const comment = country.comments.id(commentId);
 
   if (!comment) {
     return res.status(404).send({ message: "Comment does not exist" });
   }
 
   comment.set(req.body);
   const savedCountry = await country.save();
   return res.status(200).send(savedCountry);
 } catch (err) {
   next(err);
 }
}
 
export default { createComment, deleteComment, updateComment };
 
```

On the front-end, I took control of the BrowserRouter, Home page and Navigation.
```javascript Browser-router
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
 
import Navbar from './components/Navbar'
import { isLoggedIn } from './lib/auth'
 
import Home from './pages/Home'
import CountriesIndex from './pages/CountriesIndex.js'
import Register from './pages/Register.js'
import Login from './pages/Login.js'
import Logout from './pages/Logout'
import MembersDashboard from './pages/MembersDashboard.js'
import SearchResults from './pages/SearchResults'
import EditDelete from './pages/EditDelete'
 
const App = () => {
 const [isAuthenticated, setIsAuthenticated] = useState(false)
 
 useEffect(() => {
   if (isLoggedIn()) {
     setIsAuthenticated(true)
   }
 })
 
 return (
   <BrowserRouter>
     <Navbar isAuthenticated={isAuthenticated} />
     <Switch>
       <Route exact path="/" component={Home} />
       <Route exact path="/countries/:id" component={SearchResults} />
       <Route exact path="/countries" component={CountriesIndex} />
       <Route exact path="/register" component={Register} />
 
       <Route
         exact
         path="/login"
         component={() => <Login callback={() => setIsAuthenticated(true)} />}
       />
       <Route
         exact
         path="/logout"
         component={() => (
           <Logout callback={() => setIsAuthenticated(false)} />
         )}
       />
       <Route exact path="/members" component={MembersDashboard} />
       <Route exact path="/editdelete/:id" component={EditDelete} />
       <Route exact path="/editdelete/" component={MembersDashboard} />
     </Switch>
   </BrowserRouter>
 )
}
 
export default App
 
```
```javascript Nav-bar
import React from 'react'
import { Link } from 'react-router-dom'
 
const Navbar = ({ isAuthenticated }) => {
 return (
   <nav>
     <div className="navbar-container">
       <Link to="/" className="navbar-items">
         Home
       </Link>
       <Link to="/countries" className="navbar-items">
         Countries
       </Link>
 
       {/* NAVBAR conditional rendering if a user is logged in show
            members Dashboard & Logout Link else show Register and login */}
 
       {isAuthenticated ? (
         <>
           <Link to="/members" className="navbar-items">
             Members Dashboard
           </Link>
           <Link to="/logout" className="navbar-items">
             Logout
           </Link>
         </>
       ) : (
         <>
           <Link to="/register" className="navbar-items">
             Register
           </Link>
           <Link to="/login" className="navbar-items">
             Login
           </Link>
         </>
       )}
     </div>
   </nav>
 )
}
 
export default Navbar
 
```

I then built up the countries portfolio cards mapping over the data and linking them to images and users.
```javascript Countires Card
<div className="display-country-cards">
       {/* countries starts */}
 
       {filterCountries().map((country) => (
         <CountriesCard
           key={country._id}
           username={country.createdBy}
           name={country.name}
           city={country.city}
           yearVisited={country.yearVisited}
           comments={country.comments}
           rating={country.rating}
         />
       ))}
     </div>
```

```javascript Linking images and users to the specific countries cards
import React, { useState, useEffect } from 'react'
import { getPhoto } from '../lib/api'
 
const CountriesCard = ({
 name,
 username,
 city,
 yearVisited,
 comments,
 rating,
}) => {
 const [image, setImage] = useState()
 const placeImages = async () => {
   console.log(`HANDLE CLICKED!`)
   const imageUrl2 = await getPhoto(name)
   setImage(imageUrl2.data.photos[0].src.landscape)
 }
 
 useEffect(() => {
   placeImages()
 }, [name])
 
 console.log(`THIS IS THE USERNAME`, username)
 let user = username?.username
 return (
   <div className="country-card-container">
     <div className="country-card">
       <div className="country-card-content">
         <div className="image-container">
           <img src={image} alt="picture of the country" />
         </div>
         <div className="country-card-content">
           <h2>CREATED BY: {user}</h2>
         </div>
       </div>
       <div className="country-card-content">
         <h3>Country: {name}</h3>
       </div>
       <div className="country-card-content">
         <h4>Cities Visited: {city}</h4>
       </div>
       <div className="country-card-content">
         <h4>Year Visted: {yearVisited}</h4>
       </div>
       <div className="country-card-content">
         <h4>Comments: {comments}</h4>
       </div>
       <div className="country-card-content">
         <h4>Rating: {rating}</h4>
       </div>
     </div>
   </div>
 )
}
 
export default CountriesCard
 
```



## Challenges
* When users dashboard loads the drop pins on the map do not display until the page is interacted with, such as a scroll down the page.

## Wins
* One of our biggest wins was being able to use a map to plot countries around the world on the user’s dashboard.
* When creating a new country and cities visited in that country, the card displays the user’s details of who has created it. This allowed for more search functionality when searching for which countries an individual user has been to.

## Future Developments
* We would like to expand the user’s dashboard further, allowing users to interact with each other through some sort of messaging or chat service.
* Fix the issue with the map displaying correctly on page load.

## Key Learning

Working in a larger group it is key that you regularly communicate throughout the project, especially one someone has completed a certain task. On a number of occasions when pushing to Git we had conflicts within the code. Some of these could have been stopped by talking before pushing. However, sometimes this was harder when not working at the same times or days of the week.
