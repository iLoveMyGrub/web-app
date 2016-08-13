WEB APP
===============

[![Build Status](https://travis-ci.org/iLoveMyGrub/web-app.svg?branch=master)](https://travis-ci.org/iLoveMyGrub/web-app)

This is the source code for the standalone javascript wep app.

Data is sourced via requests to the Content (REST) APIs and the Data (REST) APIs. 

*Tools used :* 

    - AngularJS 1.x (latest)
    - Bower
    - Gulp
    - Bootstrap  
    - SASS
    - BEM
    
    
*Testing :*

    - Jasmine
    - Karma 
    - Protractor
    
   
Setup
---------------

From within the ./build folder run the following :

```
npm install
```

Builds
-------------

The current tooling is built around Gulp (http://gulpjs.com/)

Once this has been installed you can run from the 'gulp' command from the *./build* folder.


```
cd ./build
gulp
```

This creates assets (html,js,css) within the 'deploy' folder. 

Server
-------------

This site uses docker for dev and production.

Please run the following commands to get up and running from the project root :

```
docker-compose build
docker-compose up -d
```

Then visit : http://localhost:8000 

**Success, you are now up and running.** 

*Some other useful Docker commands to stop / remove all of Docker containers:*

    docker stop $(docker ps -a -q)
    docker rm $(docker ps -a -q)



Components & Microservices
--------------------------

The application architecture is based around the component model along with supporting "microservices" from the API.

@see : 
 
  - https://en.wikipedia.org/wiki/Component-based_software_engineering
  - https://en.wikipedia.org/wiki/Microservices
  


CSS/SASS/BEM
-------------

All CSS/SASS should be worked on within either the SASS folder or the specific component folder.

Please see [http://getbem.com](http://getbem.com) for the style guides and approach.

Gulp will then compile these to a single minified CSS file. 

JS
-------------

All JS work should be worked on within the 'src' folder and via gulp compiled to a single uglified JS file. 

This is Angular 1.x codebase and uses the [https://github.com/johnpapa/angular-styleguide/tree/master/a1](https://github.com/johnpapa/angular-styleguide/tree/master/a1) as a style guide.

Libraries
-------------

All frontend tools should be added via Bower install --save; and build / test tools should be added via npm install --save


AWS SDK
-------------

AWS JS SDK for the browser is included. 

You can build custom scripts here : https://sdk.amazonaws.com/builder/js/

(installed via bower)


MAPS
---------------------

Please see http://angular-ui.github.io/angular-google-maps/#!/use

http://maps.googleapis.com/maps/api/geocode/json?address=sw10xy,+UK&sensor=false



