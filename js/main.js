var parseContactForm = function(data){
	console.log(data);
};

$(document).ready(function(){
//geolocation
	if (geo_position_js.init()) {
		geo_position_js.getCurrentPosition(geo_success, geo_error);
	}
	
	function geo_success(p) {
		console.log("Found you at latitude " + p.coords.latitude +
	        ", longitude " + p.coords.longitude);
	//calculate distance using haversine formula    
	    //my location in degrees according to geocoder.us
	    var lat1 = 39.901971;
	    var lon1 = -75.225007;
	    
	    //location of user address in degrees obtained by geolocation script
	    var lat2 = p.coords.latitude;
	    var lon2 = p.coords.longitude;
	        
		var R = 6371; //radius of earth in km
		var dLat = (lat2-lat1) * (Math.PI/180); //difference in latitude (in radians)
		var dLon = (lon2-lon1) * (Math.PI/180); //difference in longitude (in radians)
		
		//calculate variables to use in haversine formula
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
        
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        
        //calculate distance in km
        var dk = R * c;
        var dm = dk * 0.6214; 
        
        //display distance to user
        $('#homecontent').append('<p>You are '+Math.round(dm)+' miles from my hometown of Philadelphia, PA, but I am only a message away.<p>');
        
         
	}
	
	function geo_error() {
 		$('#homecontent').append('<p>You chose not to share your geolocation, but you can still track me down by clicking Contact Me.<p>');
	}

	
//contact form validation
	var contactform = $('#contactform'),
		errorslink = $('#errorslink')
	;
	
	contactform.validate({
		invalidHandler: function(form, validator){
			errorslink.click();
			var html = "";
			for(var key in validator.submitted){
				var label = $('label[for^="' + key + '"]').not('[generated]');	
				var legend = label.closest('fieldset').find('ui-controlgroup-label');
				var fieldName = legend.length ? legend.text() : label.text();
				html += '<li>' + fieldName + '</li>';
			}
			
			$('#recorderrors ul').html(html);
		},
		
		submitHandler: function(){
			var data = contactform.serializeArray();
			parseContactForm(data);
		}
	});
	
});