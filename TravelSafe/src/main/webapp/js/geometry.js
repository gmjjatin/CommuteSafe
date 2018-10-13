/**
 * 
 */
//geometry lib for showing hotspots which are on path

  function geo(i){
  		
  		var polyline = completeRouteResponse.routes[i].overview_path;
  		 var polylinePath = new google.maps.Polyline({
           path: polyline,
           geodesic: true,
           strokeColor: '#FF0000',
           strokeOpacity: 1.0,
           strokeWeight: 2
         });
  		var count=0;
  		for(var j=0 ; j< hotspots.rows.length; j++){
    	  var c=hotspots.rows[j][0].split(",");
          var point=new google.maps.LatLng(parseFloat(c[0]), parseFloat(c[1]));
          var resultColor;
          var resultPath;
          
              if(google.maps.geometry.poly.isLocationOnEdge(point, polylinePath, 0.001)){
              	resultColor ='red';
              	// A triangle.
          		resultPath ="m 0 -1 l 1 2 -2 0 z";
          	++count;
          	
              // A triangle.
              //"m 0 -1 l 1 2 -2 0 z" :
              //google.maps.SymbolPath.CIRCLE;

    var marker=  new google.maps.Marker({
            position: point,
            map: maps[i],
            icon: {
              path: resultPath,
              fillColor: resultColor,
              fillOpacity: .5,
              strokeColor: 'white',
              strokeWeight: .5,
              scale: 10
            }
          });
          //content for info window
          var content="<p>Number of hotspots:</p>"+hotspots.rows[j][1]+"<p>Red Triangle means the accident spot is on your route ,otherwise not.</p>";
          //infowindow
        infowindow = new google.maps.InfoWindow();
          
          
  		//add click event on marker
  		google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){
      return function() {
          infowindow.setContent(content);
          infowindow.open(maps[i],marker);
        //removing already existing infowindow
          setTimeout(function () { infowindow.close(); }, 3000);
      };
      
  })(marker,content,infowindow));  
              }
              
      } ;
      
    //putting the value of hotspots:
	  document.getElementById("hotspotDisplay"+i).innerHTML=count;
          
  }/*    geo function ends */

