/**
 * 
 */

var originAutocomplete, destinationAutocomplete ; 
  function initializeMapsInCards() {



	  		//current location
	  		var cl =JSON.parse(localStorage.getItem("position"));
	  		if(cl===null){
	  			//setting the current location to that of India
	  			cl={lat:20.5937,lng:78.9629};
	  			
	  		}

	  		//lat lng of origin of route
	  		var originPlaceLocation =JSON.parse(localStorage.getItem("originPlaceLocation"));


			
        	
        	completeRouteResponse=JSON.parse(localStorage.getItem("response"));
        	hotspots=JSON.parse(localStorage.getItem("fusionTableResponse"));
			

var layer;

             //maps


for (var i = resp.routes.length-1; i >=0 ; i--) {
            var mapid="map"+i;
            
            /*getting the currentLocation,path button*/ 
            var buttonId=document.getElementById("currentLocation"+i);
            var buttonId2=document.getElementById("path"+i);
             
            maps[i] = new google.maps.Map(document.getElementById(mapid), {
              mapTypeControl: true,
              center:cl,
              zoom:13
            });
            
            //pushing the current location,path button in the corresponding  map
            
            
            maps[i].controls[google.maps.ControlPosition.LEFT_CENTER].push(buttonId);
            maps[i].controls[google.maps.ControlPosition.LEFT_CENTER].push(buttonId2);
            buttonId.style.background="white";
            buttonId2.style.background="white";
            buttonId.style.margin="0 0 0 6px";
            buttonId2.style.margin="5px 0 0 6px";
            
           
            
            

            //fusion table layer
     layer = new google.maps.FusionTablesLayer({
      map: maps[i],
      
      heatmap: { enabled: false },
      query: {
    	  select: "col2",
          from: "1a6K_SdjF05xjXiFF2mcBDGUTXJF56q641uIrVYJj",
          where: ""
      },
      options: {
        zoom:24,
        styleId: 2,
        templateId: 2
      }
    });
          //setting direction on map and panel
          this.directionsService = new google.maps.DirectionsService;
          this.directionsDisplay = new google.maps.DirectionsRenderer;
          //setting zoom o direction as before
          this.directionsDisplay.preserveViewport=true;
          this.directionsDisplay.setMap(maps[i]);
          this.directionsDisplay.setPanel(document.getElementById('right-panel'+i));
		


            var me=this;
            var r=new Array(10);
          //showing respective direction on respective panel and map
            r[i]={geocoded_waypoints:[resp.geocoded_waypoints],
              routes:[resp.routes[i]],
              status:resp.status,
              request:resp.request,
              _proto_:resp._proto_};
            
            me.directionsDisplay.setDirections(r[i]);
            //calling the infowindow function
            geo(i);
            
            //calling the current location spotter function
            var j=0;
            currentLocation2(i,j);
          
}/* end of maps for loop */

  }/* initMap function end */
