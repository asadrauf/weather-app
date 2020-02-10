 


  $("#submitCity").click(function(){
    
    
     city = $("#createHistory").val().trim();
    var cityNameToUse = city;
    console.log(city);
  
    return getWeather(cityNameToUse);
    
     
    
  });
  var cities = JSON.parse(localStorage.getItem("cities"));
  if(cities != null) {
    cities.forEach(function(city) {
      $("#createHistory").append('<button (\'' + city + '\')" >' + city + '</button>');
          
      });
  }
  
  function createHistory(city) {
    var cities = [];
    
    if (localStorage.getItem("cities") === null) {
        cities.push(city);
        localStorage.setItem("cities", JSON.stringify(cities).toUpperCase());
        
    } else {
// checking to make sure no repeat names on list while adding to list
        cities = JSON.parse(localStorage.getItem("cities").toUpperCase() );
        if (cities.indexOf(city) === -1) {
            cities.push(city);
        }

        localStorage.setItem("cities", JSON.stringify(cities).toUpperCase());
    }
}

  
$("button").on("click", function(event) {
  if($(this).attr("type") === "city") {
      event.preventDefault();
      cityName = $(this).data("city");
      console.log(cityName);
      cityName = firstUpper(cityName);
      getCityInfo(cityName);
      display5Day(cityName);
  }
})



//var date = document.getElementById("error//");
var currentDate = new Date();
date = currentDate;
var dd = String(date.getDate()).padStart(2, '0');
var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = date.getFullYear();

date = mm + '/' + dd + '/' + yyyy;
// document.write(date);

function getWeather(city){
     city = $("#city").val();
 
    if (city != ""){
        $.ajax({
           url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=dae04c88751e48b8b6979d97b4cd33f9",
           method: "GET",
           dataType: "jsonp",
           success: function(data){
               console.log(data);
               var result = showResults(data);
               
               $("#jumbo").html(result);
               $("#city").val("");
              
               

               var getLatitude = data.coord.lat;
               var getLongitude = data.coord.lon;
               $.ajax({
             
                 url:"https://api.openweathermap.org/data/2.5/uvi?lat="+getLatitude+"&lon="+getLongitude+"&appid=dae04c88751e48b8b6979d97b4cd33f9",
                 method: "GET",
                 
                 success: function(response){
                  $("#showResult").html("UV Index: " + response.value);      
                 }  
                 
              }); 
              createHistory(city);
             
             
           } 
           
        });
          
        var url = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=imperial&appid=dae04c88751e48b8b6979d97b4cd33f9";
        console.log(url);
        $.ajax({
            url: url,
            method: "GET",
            success: function (forecast) {
                var weatherData = forecast.list;
                var count = 1;
                var currentDateToUse = null;
                  //only displayng 5 days forecast 
                var currentDate = $("#dateToday").text().trim();
                for (var i = 0; i < weatherData.length; i++) {
                    var dateToUse = new Date(weatherData[i]["dt"] * 1000).toLocaleDateString("en-us");
                    if (dateToUse != currentDate && dateToUse != currentDateToUse) {
                        $("#future" + count.toString() +"Date").html(dateToUse);
                        $("#future" + count.toString() + "Icon").attr("src", "http://openweathermap.org/img/w/" + weatherData[i]["weather"][0]["icon"] + ".png");
                        $("#future" + count.toString() + "Temp").html("Temp: " + weatherData[i]["main"]["temp"] + String.fromCharCode(176) + "F" );
                        $("#future" + count.toString() + "Hum").html("Humidity: " + weatherData[i]["main"]["humidity"] + "%");
                        currentDateToUse = dateToUse;
                        count += 1;
                        
                    }
                    
                    
                }
               
                
                $("#showHide").css("display", "block");  
    }
    
    
    
});}

}


function showResults(data){
    return "<div><h2>"+data.name+""+"<img src='https://openweathermap.org/img/w/"+ data.weather[0].icon+".png'> "+"("+date+ ") </h2></div>"+"<p>Temperature: "+data.main.temp+" &deg;C</p>"+
     "<p>Humidity: "+data.main.humidity+"%</p>"+ "<p>Wind Speed: "+data.wind.speed+ " MPH</p>" ;
  
}


$("button").on("click", function(event) {
  if($(this).attr("type") === "city") {
      event.preventDefault();
     
      
      getWeather(cityName);
      
  }
})

