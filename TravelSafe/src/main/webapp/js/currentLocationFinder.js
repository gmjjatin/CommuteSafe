/**
 * 
 */

var  infoWindow;
      function currentLocation(i) {
       /* map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });*/
        infoWindow = new google.maps.InfoWindow({ maxWidth: 280 });
        


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
                	//remove already existing markers
                 	 if (marker && marker.setMap) {
                 		 
                 		    marker.setMap(null);
                 		}
                	  //setting the marker
                      var marker = new google.maps.Marker({
                          position: pos,
                          map: maps[i],
                          title: 'Your current location',
                          icon: {
                              path:google.maps.SymbolPath.CIRCLE,
                              fillColor: '#4285F4',
                              fillOpacity: 1,
                              strokeColor: 'white',
                              strokeWeight: 1,
                              scale: 10
                            }
                        });
                      
                      //infowindow
                      infoWindow.setPosition(pos);
                      infoWindow.setContent('Your current location:\n'+results[0].formatted_address);
                      infoWindow.open(maps[i],marker);
                      
                      //reset map center
                      maps[i].setCenter(pos);
                      
                      //set click listener on marker
                      marker.addListener('click', function() {
                    	  infoWindow.open(maps[i],marker);
                    	  setTimeout(function () { infoWindow.close(); }, 10000);

                    	  });

                      //timeout for infowindow
                      setTimeout(function () { infoWindow.close(); }, 10000);

                    
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
        infoWindow.open(  maps[i]);
}
      
      /*function overloading for current lcoation function  */
      function currentLocation2(i,j) {
        
           infoWindow = new google.maps.InfoWindow({ maxWidth: 280 });
           


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
                    	 
                    	 //remove already existing markers
                    	 if (marker && marker.setMap) {
                    		    marker.setMap(null);
                    		}
                   	  //setting the marker
                         var marker = new google.maps.Marker({
                             position: pos,
                             map: maps[i],
                             title: 'Your current location',
                             icon: {
                                 path:google.maps.SymbolPath.CIRCLE,
                                 fillColor: '#4285F4',
                                 fillOpacity: 1,
                                 strokeColor: 'white',
                                 strokeWeight: 1,
                                 scale: 10
                               }
                           });
                         
                         //infowindow
                         infoWindow.setPosition(pos);
                         infoWindow.setContent('Your current location:\n'+results[0].formatted_address);
                         infoWindow.open(maps[i],marker);
                         
                         
                         
                         //set click listener on marker
                         marker.addListener('click', function() {
                       	  infoWindow.open(maps[i],marker);
                       	 setTimeout(function () { infoWindow.close(); }, 10000);

                       	  });

                         //timeout for infowindow
                         setTimeout(function () { infoWindow.close(); }, 15000);

                       
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
           infoWindow.open(  maps[i]);
   }
      
         
         //path function for the path button on the navigation map
         function path(i) {
        	 //setting the current location value to the local storage
         var path1=	JSON.parse(localStorage.getItem("originPlaceLocation"));
         if(path1!==null){
         maps[i].setCenter(path);
         }
      }

            