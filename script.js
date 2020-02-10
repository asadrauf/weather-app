 
//Starting of the weather app click event
        $("#submitCity").click(function(){
        var city = $("#createHistory").val().trim();
        

//Calling the function that has ajax api call that will return the current date weather
        return getWeather(city);
        });

//Getting all the cities from local storage using foreach function
        var historyCities = JSON.parse(localStorage.getItem("historyCities"));
        if(historyCities != null) {
        historyCities.forEach(function(takeCity) {
        $("#createHistory").append('<button (\'' + takeCity + '\')" >' + takeCity + '</button>');
                
            });
        }
//Creating our history based on the user search  
        function createHistory(city) {
        var historyCities = [];
        if (localStorage.getItem("historyCities") === null) {
        historyCities.push(city);
        localStorage.setItem("historyCities", JSON.stringify(historyCities));
          
        } else {
// checking to make sure no repeat names on list while adding to list
          historyCities = JSON.parse(localStorage.getItem("historyCities"));
          if (historyCities.indexOf(city) === -1) {
          historyCities.push(city);
          }

          localStorage.setItem("historyCities", JSON.stringify(historyCities));
      }
      }

//this fucntion will convert our input to uppercase before we save it to the local storage
      function upperInput(e) {
        var typingStart = e.target.selectionStart;
        var typingEnd = e.target.selectionEnd;
        e.target.value = e.target.value.toUpperCase();
        e.target.selectionStart = typingStart;
        e.target.selectionEnd = typingEnd;
     }

//Creating a date that we will use to diplay the current date 
          var currentDate = new Date();
          date = currentDate;
          var dd = String(date.getDate()).padStart(2, '0');
          var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = date.getFullYear();

//Will diplay date in in format (02/10/2020)
          date = mm + '/' + dd + '/' + yyyy;

//Ajax call that will use a city parameter to display the current city
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
 
//Will dump over current weather result here and will remove the text from input field
          $("#jumbo").html(result);
          $("#city").val("");

//Will dump our UV Index using this ajax call that are taking latitude and longitude parameter
          $.ajax({   
          url:"https://api.openweathermap.org/data/2.5/uvi?lat="+data.coord.lat+"&lon="+data.coord.lon+"&appid=dae04c88751e48b8b6979d97b4cd33f9",
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
          var start = 1;
          var date = null;
                  
 //Using the for loop that will only show the 5 days forcast              
          for (var i = 0; i < forecast.list.length; i++) {
          var thisDate = new Date(forecast.list[i].dt * 1000).toLocaleDateString("en-us");
          if (thisDate != currentDate && thisDate != date) {
            $(".forecast" + start.toString() +"-date").html(thisDate);
            $(".forecast" + start.toString() + "-icon").attr("src", "http://openweathermap.org/img/w/" + forecast.list[i].weather[0].icon + ".png");
            $(".forecast" + start.toString() + "-temp").html("Temp: " + forecast.list[i].main.temp + String.fromCharCode(176) + "F" );
            $(".forecast" + start.toString() + "-hum").html("Humidity: " + forecast.list[i].main.humidity + "%");
            date = thisDate;
            start += 1;
                        
            }
          }

//Will display the weather forecast 5 days once the forcast ajax call ran successfully that was set to display none before
          $("#showHide").css("display", "block");  
         }    
       });}}

          function showResults(data){
          return "<div><h2>"+data.name+""+"<img src='https://openweathermap.org/img/w/" + data.weather[0].icon+".png'> "+"("+date+ ") </h2></div>"+"<p>Temperature: "+data.main.temp+String.fromCharCode(176) + "F"+"</p>"+
          "<p>Humidity: "+data.main.humidity+"%</p>"+ "<p>Wind Speed: "+data.wind.speed+ " MPH</p>" ;
       }
          

