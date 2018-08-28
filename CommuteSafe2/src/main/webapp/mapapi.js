

function initMap() {

        //for current position 
        var pos;
       if (navigator.geolocation) {
             navigator.geolocation.getCurrentPosition(success, error);
        } else {
        alert('geolocation not supported');
        }
       function success(postion){
    	   //position:"{"lat":28.6217597,"lng":77.0916577}"
    	   pos = {
                   lat: position.coords.latitude,
                   lng: position.coords.longitude
                   };
    	   
       }
       if(pos==undefined){
    	  pos={lat:28.6217597,lng:77.0916577}; 
       }
       		success1();
          function success1() {
        

             /*pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
                };*/

          //setting curent position in local storage
                localStorage.setItem("position",JSON.stringify(pos));

          //map
        map = new google.maps.Map(document.getElementById('map'), {
          mapTypeControl: true,
          center:pos,
          zoom:13
        });

      AutocompleteDirectionsHandlerVar=new AutocompleteDirectionsHandler(map);
     
          
          
          }
    
    function error(msg) {
    //alert('error: ' + msg);
    	pos={lat:28.6217597,lng:77.0916577};
  }
}
       /**
        * @constructor
       */
      function AutocompleteDirectionsHandler(map) {
        this.map = map;
       
        
        this.originPlaceId = null;
        this.destinationPlaceId = null;
        this.travelMode = 'DRIVING';
        this.provideRouteAlternatives=true;
        var originInput = document.getElementById('origin-input');
        var destinationInput = document.getElementById('destination-input');
        var modeSelector = document.getElementById('mode-selector');
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.preserveViewport=true;	 
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
        var N=60000;
        this.directionsService.route({
          origin: {'placeId': this.originPlaceId},
          destination: {'placeId': this.destinationPlaceId},
          travelMode: this.travelMode,
          provideRouteAlternatives:true,
          /*drivingOptions: {
                              departureTime: new Date(Date.now()+N),  
                              trafficModel: 'bestguess'
                            },
          transitOptions: {
                                departureTime: new Date(Date.now()+N)
                          }
*/
  }, function(response, status) {

          if (status === 'OK') {
            
        
        
            //place services
           var service = new google.maps.places.PlacesService(map);

      service.getDetails({placeId:me.originPlaceId}, function(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
      
         localStorage.setItem("lat",JSON.stringify(place.geometry.viewport.f.b));
         localStorage.setItem("lng",JSON.stringify(place.geometry.viewport.b.b));
     
      
    }
  });

            //setting the response    
            localStorage.setItem("response",JSON.stringify(response));
            
          
          } else {
            window.alert('Directions request failed due to ' + status);
            console.log(status);
          }
        });
      };
