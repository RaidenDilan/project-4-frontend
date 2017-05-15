<center><h1>GA WDI London - Project 4 (Final Project) April 2017</h1></center>

<center><h1>Project 4: Palm Trees</h1></center>

<center>[Launch Application!](https://desolate-sands-98689.herokuapp.com)</center>

![Imgur](http://i.imgur.com/SKFSDrN.jpg)

The frontend of a full stack RESTful application. A lending site where users can log in and request and accept/decline friends on the app, upload items they are willing to lend to friends or mutual friends and friends. Users can also borrow their friends items.

<center><h1>Inspiration</h1></center>

<p>The idea was inspired by travelling and adventures, creating a community to share a selection of holiday destinations with users.</p>

<center><h1>Approach</h1></center>

I had a clear view of how I wanted the application to function from the beggining. Similarly with the UX design, I wanted to keep it quite simple.

You must create a profile on the app before you can use a lot of the features. Users must also create a group before they can use a lot of the features the app provides. On creating a group you can add other users to communicate with them to share your discoveries and reviews. Users are also allowed to create multiple groups because maybe you wanna go on hoilday with multiple group of people.

When a group is created you then have full access to the application. From within a group, you can create new holidays which will be posted in the group you created the holiday. Once a holiday has been created you can then find flights information provided by Skyscanner API.

Users will have access to all the holidays that have been stored in the group their attending, so that they can also check for flights information. When viewing a holiday users can also write reviews and talk to other attendees.

<center><h1>Technologies Used</h1></center>

* JavaScript, Express, Node.js, AngularJS, HTML5, CSS, SASS, Bootstrap were used to create the frontend application. Ruby, Ruby on Rails and PostgreSQL database in the backend.
* Pictures are base64 encoded and stored using the AWS S3 service.
* Authentication uses JWT with Satellizer and BCrypt.
* The Google Web Font 'Raleway' & 'Poppins has been used to style the application
* Background images are from Google.

I own none of the images or background used in the game. All other work is my own.

<center><h1>Challenges & Problems</h1></center>

One of the more tricky parts of this project was the scope of it, at the start of the project there was so much to do it was overwhelming. I started building the app by keeping the scope small and building it up as I went further along. CSS was a challenge at the start as my background images were not dispayed the way I wanted them to. In the week this was completed, I was unable to display the groups that each user was attending.

<p><strong>Features & Bugs
</strong></p>

* The GitHub login after the first 'login with github' is slightly slow, maybe it's because I'm hosting my app on Heroku because Heroku is very slow.

<h3>Project Forking</h3>

<h5>In Terminal</h5>

<p><strong>Back-End</strong></p>
* rails db:create db:migrate db:seed
* bundle

<p><strong>Front-End</strong></p>

* npm i && bower i


<center><strong>Copyright © Palm Trees</strong></center>