/**
 * 
 */
//for geometry api
var completeRouteResponse,hotspots,pos1;

//for the cards
var map,infowindow1,pos,infoWindow;

//to display multiple cards
var resp=JSON.parse(localStorage.getItem("response"));
r();
function r(){
for (var i = resp.routes.length-1; i >=0 ; i--) {

  document.getElementById('cd'+i).innerHTML=`<div  class=\"row cdr\"  style=\"margin:1%; \">
            
            <div class=\"col-md-12\">
             <div class=\"card\">
               <div class=\"card-body\">
                <div class=\"row\">
                  <div class=\"col-md-8 col-xs-12\" id=\"route-div1\">
                   <h4 style=\"color:#31b89d;font-size:25px;\"  class=\"card-title\">Route No.`+(i+1)+`</h4>
                   <p style=\"font-size:19px;\" class=\"card-text\">Distance :<span id=\"distance\">`+resp.routes[i].legs[0].distance.text+`</span>
                   </p> 
                    <p style=\"font-size:18px;\" class=\"card-text\">Duration :<span id=\"duration\">`+resp.routes[i].legs[0].duration.text+`</span>

                   </p>
                   <div id=\"rd`+i+`\"></div>
                  <div id=\"tft`+i+`\"></div>
                  

                 </div>
                 <div class=\"col-md-4 col-xs-12\" id=\"route-div2\">
                  <p style=\"font-weight: bold;color:#31b89d;font-size:20px;\">No. of Hotspots : <span id=\"hotspotDisplay`+i+`\" style=\"color: red;font-weight: bold;\"></span></p>
                  <button type=\"button\" id=\"toggle-button`+i+`\">
                   <i class=\"fa fa-angle-down\" style=\"font-size:40px;color:#fff\"></i>
                </button>
               </div>
             </div>
           </div>
         </div>
       </div>
       
     </div>
            <div id=\"cardDetails`+i+`\" class=\"row\" style=\"margin:1%; \" >
            <div class=\"col-md-12\">
             <div class=\"card\" >
               <div class=\"card-body\" >
               
                  
                <div  id=\"maps`+i+`\">
                <div id=\"map`+i+`\" style=\"width: 100%;margin: 0px;\" >
                
                
                <button class=\"clbutton\" id=\"currentLocation`+i+`\" style=\"width:28px;height:29px;box-shadow:rgba(0,0,0,0.3) 0px 1px 4px -1px ;border-radius:2px;\"  onclick=\"currentLocation(`+i+`)\"><i class="fas fa-crosshairs" ></i></button>
                <button class=\"clbutton\" id=\"path`+i+`\" style=\"width:28px;height:29px;box-shadow:rgba(0,0,0,0.3) 0px 1px 4px -1px ;border-radius:2px;\"  onclick=\"path(`+i+`)\"><i class="fas fa-road" ></i></button>
          
          </div>
          </div>
          
          
         
       
       
       <div id=\"right-panel`+i+`\" style=\"width: 100%;height:350px;overflow: auto; \"></div>
       
           </div>
           
          

             
             </div>
         </div>
       </div>
</div>`;
  
  
  
  
  
    //checking for fares if any

                   if(resp.routes[0].fare){
                     var txt=`
                    <p class=\"card-text\">Fare :<span id=\"fare\">`+resp.routes[i].fare.text+`</span>
                   </p>`;
                    
                    $('#tft'+i).append(txt);
                   }
    //check for summary
                   if(resp.routes[0].summary){
                       var txt=`
                      <p class=\"card-text\">Description :<span id=\"fare\">`+resp.routes[i].summary+`</span>
                     </p>`;
                      
                      $('#rd'+i).append(txt);
                     }
    
    
} /* first for loop ends here */

  

  
 } 		/* r() function ends here */
 
