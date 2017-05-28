$(document).ready(function(){
  //var geoloc = navigator.geolocation;
  var curTemp = 0;
  var curTempF = 0;
  
  getTemp();

// get data from weather API
  function getTemp(){
     
    $.ajax({
			type: 'GET',
			url: "http://api.wunderground.com/api/b1119d20cd37893d/conditions/q/autoip.json",
      dataType : "json",
      success: function(data) {
        console.log("success", data);
        var curPlace = data['current_observation']['display_location']['full'];
        curTemp = data['current_observation']['temp_c'];
        curTempF = data['current_observation']['temp_f'];
        var windSpeed = data['current_observation']['wind_kph'];
        var skyState = data['current_observation']['weather'];
        var humid = data['current_observation']['relative_humidity'];
        var precip = data['current_observation']['precip_today_metric'];
        var curIcon = data['current_observation']['icon'];
        var newSrc = 'https://icons.wxug.com/i/c/i/'+ curIcon +'.gif';
                
        //top row data
        $('#w-place').html('<h3>' + curPlace + '</h3>');
        //middle row data
				$('#w-temp').html('<h4>' + curTemp + '&#176; C</h4>');
        $('#img-icon').attr('src', newSrc);
        //bottom row data
        $('#w-humid').html('<h4>Relative humidity:<br>' + humid + '</h4>');
        $('#w-sky').html('<h4>Sky: <br>'+ skyState +'</h4>');
        $('#w-wind').html('<h4>Wind: <br>' + windSpeed + ' km/h</h4>');
        $('#w-precip').html('<h4>Precipitation: <br>' + precip + ' mm</h4>');
        
        // call for change-background function
        changeBG(curTemp, precip, skyState);
			},
			error: function(){
				console.log("Error getting temp");
			}
    });
  };

  // change-background image function
  function changeBG(temp, precip, clouds) {
		var pat1 = /cloud/gi;
    var pat2 = /fog/gi;

		if (precip > 0){
			if (temp < 4) {
				$('body').css('background-image', 'url("https://res.cloudinary.com/ddfbifcav/image/upload/v1491316892/snow-sm_unti48.jpg")');
				$('h2').css('color', 'black');
			}
			else {
				$('body').css('background-image', 'url("https://res.cloudinary.com/ddfbifcav/image/upload/v1491316894/rain-sm_jsc4at.jpg")');
			}
		}
		else {
			if ((pat1.test(clouds) || pat2.test(clouds)) && temp > 5) {
				$('body').css('background-image', 'url("https://res.cloudinary.com/ddfbifcav/image/upload/v1491316891/clouds-sm_tklzn1.jpg")');
			}
			else if (temp < 0){
				$('body').css('background-image', 'url("https://res.cloudinary.com/ddfbifcav/image/upload/v1491316892/snow-sm_unti48.jpg")');
				$('h2').css('color', 'black');
			}
			else if (temp >= 0 && temp <= 20) {
				$('body').css('background-image', 'url("https://res.cloudinary.com/ddfbifcav/image/upload/v1491316895/warm-sm_oflkc4.jpg")');
				$('h2').css('color', 'black');
        $('p:last').css('color', 'white');
			}
			else if (temp > 20 && temp < 40) {
				$('body').css('background-image', 'url("https://res.cloudinary.com/ddfbifcav/image/upload/v1491316895/sunny-sm_molfkv.jpg")');
			}
			else {
				$('body').css('background-image', 'url("https://res.cloudinary.com/ddfbifcav/image/upload/v1491316894/hot-sm_bidimk.jpg")');
        $('h2').css('color', 'black');
        $('p:last').css('color', 'white');
			}
		}
	};
      
  //toggle units (C -> F) and (F -> C)
  $('#tempC').click(function(){
    $('#w-temp').html('<h4>' + curTemp + '&#176; C</h4>');
  });
  $('#tempF').click(function(){
    $('#w-temp').html('<h4>' + curTempF + '&#176; F</h4>');
  });

});