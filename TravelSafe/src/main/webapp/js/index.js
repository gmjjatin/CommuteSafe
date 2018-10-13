//for origin current location button
var originPlaceId2,map;	

function giveMeResultsOfRoutes() {

		map = new google.maps.Map(document.getElementById('map'), {
          mapTypeControl: false,
          //28.7041° N, 77.1025 delhi coords
          center: {lat: 28.7041, lng: 77.1025},
          zoom: 13
        });

        new AutocompleteDirectionsHandler(map);
      }

       /**
        * @constructor
       */
      function AutocompleteDirectionsHandler(map) {
        this.map = map;
        this.originPlaceId = null;
        this.destinationPlaceId = null;
        this.travelMode = 'WALKING';
        var originInput = document.getElementById('origin-input');
        var destinationInput = document.getElementById('destination-input');
        var modeSelector = document.getElementById('mode-selector');
        
        
        
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setMap(map);

        var originAutocomplete = new google.maps.places.Autocomplete(
            originInput, {placeIdOnly: true});
        var destinationAutocomplete = new google.maps.places.Autocomplete(
            destinationInput, {placeIdOnly: true});

        this.setupClickListener('changemode-walking', 'WALKING');
        this.setupClickListener('changemode-transit', 'TRANSIT');
        this.setupClickListener('changemode-driving', 'DRIVING');
          

        this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
        this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

    
      }

      // Sets a listener on a radio button to change the filter type on Places
      // Autocomplete.
      AutocompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
        var radioButton = document.getElementById(id);
        var me = this;
        radioButton.addEventListener('click', function() {
          me.travelMode = mode;
          me.route();
        });
      };

      AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
        var me = this;
        autocomplete.bindTo('bounds', this.map);
        autocomplete.addListener('place_changed', function() {
          var place = autocomplete.getPlace();
          if (!place.place_id) {
            window.alert("Please select an option from the dropdown list.");
            return;
          }
          if(originPlaceId2!==undefined){
          	place.place_id=originPlaceId2;
          }
          if (mode === 'ORIG') {
            me.originPlaceId = place.place_id;
          } else {
            me.destinationPlaceId = place.place_id;
          }
          me.route();
        });

      };

      AutocompleteDirectionsHandler.prototype.route = function() {
        if (!this.originPlaceId || !this.destinationPlaceId) {
          return;
        }
        var me = this;
        //checking for the current location supplied by the button at home page
        if(originPlaceId2!==undefined){
        	this.originPlaceId=originPlaceId2;
        }
        
        //setting the origin destination location in local storage so as to center
        //the maps in cards
      var  ps = new google.maps.places.PlacesService(map);
        ps.getDetails({
            placeId: this.originPlaceId,
        }, callback);
        function callback(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
            	console.log(place.geometry.location);
                localStorage.setItem("originPlaceLocation", JSON.stringify(place.geometry.location));
            }
          }

        
        //ROUTING	
        this.directionsService.route({
          origin: {'placeId': this.originPlaceId},
          destination: {'placeId': this.destinationPlaceId},
          travelMode: this.travelMode,
          provideRouteAlternatives: true
        }, function(response, status) {
          if (status === 'OK') {
            
        	  //setting the response    
        	  console.log(response);
              localStorage.setItem("response",JSON.stringify(response));  
        	  
        	  
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      };

      
      //for the home current location button
      function currentLocationForInputBoxAtIndexPage() {
     	 document.getElementById("origin-input").placeholder="My current Location";
     	 
           // Try HTML5 geolocation.
           if (navigator.geolocation) {
             navigator.geolocation.getCurrentPosition(function(position) {
               var pos = {
                 lat: position.coords.latitude,
                 lng: position.coords.longitude
               };
               
             //setting the current location value to the local storage
               localStorage.setItem("position",JSON.stringify(pos));

               //reverse geocoding
               var geocoder = new google.maps.Geocoder;
               geocoder.geocode({'location': pos}, function(results, status) {
                   if (status === 'OK') {
                     if (results[0]) {
                     	
                          
                         originPlaceId2=results[0].place_id;
                         
                         
                         //calling the auto-complete ,direction routing function
                         new AutocompleteDirectionsHandler(map);
      
                                
                     } else {
                       window.alert('No results found');
                     }
                   } else {
                     window.alert('Geocoder failed due to: ' + status);
                   }
                 });
               
               
               
             }, function() {
               handleLocationError(true, infoWindow,   maps[i].getCenter());
             });
           } else {
             // Browser doesn't support Geolocation
             handleLocationError(false, infoWindow,   maps[i].getCenter());
           }
         }

         function handleLocationError(browserHasGeolocation, infoWindow, pos) {
           infoWindow.setPosition(pos);
           infoWindow.setContent(browserHasGeolocation ?
                                 'Error: The Geolocation service failed.' :
                                 'Error: Your browser doesn\'t support geolocation.');
           infoWindow.open(  map[i]);
   }

         
         
