/**
	 * modal function
	 */

window.onload=modal();
function modal() {
	
	// Get the modal
	var modal = document.getElementById('myModal');

	// Get the button that opens the modal
	var btn = document.getElementById("myBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	    modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}

		var resp=JSON.parse(localStorage.getItem("response"));
		var dMode=resp.request.travelMode;
		var d=dMode.localeCompare("DRIVING");
		var t=dMode.localeCompare("TRANSIT");
		//3rd condition means driving options is walking
		var mc=document.getElementById('modal-Content');
		
		if(d===0){
			mc.innerHTML="Please wear seatbelt or helmets.It will make your commute safer by 45%!";
		    modal.style.display = "block";
		}
		else if (t===0) {
			
			mc.innerHTML="Please be cautious while transiting.";
		}
		else {
			mc.innerHTML="Please be cautious while walking.";
		    modal.style.display = "block";
		}


}