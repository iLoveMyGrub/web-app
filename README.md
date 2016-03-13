WEB APP
===============

This is the source code for the standalone javascript wep application

Tools used : 

    - AngularJS 
    - Bower
    - Gulp
    - Bootstrap 
    - SASS
    - jQuery 
    
    
Testing : 

    - Jasmine
    - Karma 
    - Protractor
    
   
Setup
---------------


```
npm install
```

Builds
-------------

The current tooling is built around Gulp JS

Then once installed you can run from the 'gulp' command from the main content root. 


```
gulp
```


Server
-------------

This site flat html so any webserver will run the app without any config amends. 
 
One nodejs webserver that is very good while developing is live-server (https://www.npmjs.com/package/live-server)

 - Install via // npm install -g live-server
 - cd ./app

```
live-server
```



Core Files
-------------

The core CSS is located from within the SASS folder, and includes the vendor libs Bootstrap. 
 
The core JS files and components are located within "./app/sites/", the main JS is "app/app.js"

Please adjust these to meet your specific requirements. 


Components & Microservices
--------------------------

The application architecture is based around the component model along with supporting "micro services" to the API.

@see : 
 
  - https://en.wikipedia.org/wiki/Component-based_software_engineering
  - https://en.wikipedia.org/wiki/Microservices
  


CSS
-------------

All CSS work should be worked on within the SASS folder and via grunt compiled to a single minified CSS file. 

This is all setup currently and only the sass files need to updated / created.


JS
-------------

All JS work should be worked on within the SITE folder + root level 'app.js' and via grunt compiled to a single uglified JS file. 

This is setup and working.


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

