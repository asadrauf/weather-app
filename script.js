$(document).ready(function(){
  $("#submitCity").click(function(){
    return getWeather();
    
  });
});

//var date = document.getElementById("error//");
var currentDate = new Date();
date = currentDate;
var dd = String(date.getDate()).padStart(2, '0');
var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = date.getFullYear();

date = mm + '/' + dd + '/' + yyyy;
// document.write(date);



function getWeather(){
    var city = $("#city").val();
 
    if (city != ""){
        $.ajax({
           url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=dae04c88751e48b8b6979d97b4cd33f9",
           type: "GET",
           dataType: "jsonp",
           success: function(data){
               console.log(data);
               var result = showResults(data);
               $("#jumbo").html(result);
               $("#city").val("");
               
           }
           
        });
        getforeCast();
    }
    else{
        $("#error").html("<div>City filed cannot be empty</div>");
    }
}

function showResults(data){
    return "<div><h2>"+data.name+""+"<img src='https://openweathermap.org/img/w/"+ data.weather[0].icon+".png'> "+"("+date+ ") </h2></div>"+"<p>Temperature: "+data.main.temp+" &deg;C</p>"+
     "<p>Humidity: "+data.main.humidity+"%</p>"+ "<p>Wind Speed: "+data.wind.speed+ " MPH</p>" ;
  
}

function getforeCast(){

  var key = "dae04c88751e48b8b6979d97b4cd33f9";
  var city = $("#city").val(); // My test case was "London"
  var url = "https://api.openweathermap.org/data/2.5/forecast";
  
  $.ajax({
    url: url, //API Call
    dataType: "json",
    type: "GET",
    data: {
      q: city,
      appid: key,
      units: "metric",
      cnt: "10"
    },
    success: function(data) {
      console.log('Received data:', data) // For testing
      var wf = "";
      var index=new Date();
      wf += "<h2>" + data.city.name + "</h2>"; // City (displays once)
      $.each(data.list, function(index, val) {
        wf += "<p>" // Opening paragraph tag
        wf += "<b> " + index + "</b>: " // Day
        wf += "<b>DateTime " + new Date(val.dt*1000).toISOString() + "</b>: " // DateTime
        wf += val.main.temp + "&degC" // Temperature
        wf += "<span> | " + val.weather[0].description + "</span>"; // Description
        wf += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" // Icon
        wf += "</p>" // Closing paragraph tag
      });
      $("#weatherForecast").html(wf);
    }
  });
  
}

