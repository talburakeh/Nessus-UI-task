
function getQueryStringVal(queryString) {
	//I referenced the regex part of this code from StackOverflow.
    url = window.location.href;
    queryString = queryString.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + queryString + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var hostAmount = getQueryStringVal('host');
var hostCounter = 1;

function glow(element) {
	var selector = $("."+element);
	selector.animate({opacity: 1}, 1000);
	selector.animate({opacity: 0.5}, 1000);
	selector.animate({opacity: 1}, 1000);
}

function getHosts() {
	$.ajax({
	  url: "http://localhost/myserver/controllers/hosts.php",
	  type: "post",
	  datatype: 'json',
	  data : {
		host : hostAmount,
		counter : hostCounter 
	  }
	})
	  .done(function( data ) {
		  var obj = JSON.parse(data);
		  $.each(obj, function(key,value) {
			  $.each(value, function(key,value) {
				var newrow = "<tr class="+value.name+" style='display:none'><td>" + value.name + "</td><td>" + value.hostname + "</td><td>" + value.port + "</td><td>" + value.username + "</td></tr>";
				$("#hosts").append(newrow);
				$("."+value.name).fadeIn('1000');
				glow(value.name);
			  });
		  });
	
		  if (hostCounter != 1)
			  scrollDown(300);
		  
		  hostCounter += 20;
	
		  if (hostCounter >= hostAmount) {
			  $("#loadMore").hide();
		  } else {
			  $("#loadMore").show();
		  }
		  $('.newresults').delay(2000).fadeOut(1000)
	});
}	

function scrollDown(amount) {
	$(window).scrollTop($(window).scrollTop() + amount);
}

$(".load").click(function(){
	  $("#hosts").append('<tr class="newresults" style="display:none;"><th style="background-color:#32CD32;" align="center" colspan="4">&darr; New Results &darr;</th></tr>');  
	  $(".newresults").fadeIn(1000);
	  glow('newresults')
})
$( document ).ready(function() {
	  getHosts(hostAmount, hostCounter);
});
