
API SERVICES ENDPOINTS
======================

### SERVICES EVENTS

Default Services 3.x Drupal 7 module : 

    /api/node?parameters[type]=event
    
    /api/node?parameters[type]=event&parameters[status]=1&fields=nid,title
    
    ,field_event_img,field_event_town,field_event_city,field_event_start_date,field_event_venue


### SERVICES VIEWS

Drupal 7 module - Services Views : 
    
    /api/views/section_events
    
    /api/views/section_events?limit=10&page=0
    
    /api/views/section_events?limit=250&page=0



### NEWS 

    /api/node?parameters[type]=news