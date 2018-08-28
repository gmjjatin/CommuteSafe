/**
 * 
 */
var maps=new Array(resp.routes.length);
var originAutocomplete, destinationAutocomplete ; 
  function initMapForm() {



//current location
var cl1 =JSON.parse(localStorage.getItem("position"));
//lat lng of origin of route
var lat =JSON.parse(localStorage.getItem("lat"));
var lng =JSON.parse(localStorage.getItem("lng"));


// for geomtery
			pos1=JSON.parse(localStorage.getItem("position"));
        	
        	completeRouteResponse=JSON.parse(localStorage.getItem("response"));
        	hotspots=JSON.parse(localStorage.getItem("fusionTableResponse"));
			

var layer;

             //maps


for (var i = resp.routes.length-1; i >=0 ; i--) {
            var mapid="map"+i;

             maps[i] = new google.maps.Map(document.getElementById(mapid), {
              mapTypeControl: true,
              center:{lat:lat,lng:lng},
              zoom:13
            });

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
            r[i]={geocoded_waypoints:resp.geocoded_waypoints,
              routes:[resp.routes[i]],
              status:resp.status,
              request:resp.request,
              _proto_:resp._proto_};
            
            me.directionsDisplay.setDirections(r[i]);
            //calling the infowindow function
            geo(i);
          
}/* end of maps for loop */

  }/* initMap function end */
