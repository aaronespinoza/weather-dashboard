var searchLocation=document.getElementById("search");
var key="88297b00647b4e5314bdcabb6ec68ee7";

searchLocation.addEventListener("click",function(){
    returnWeather()
});
//searchLocation.on("submit", returnWeather)
//SEARCH RESULTS
function returnWeather() {
    //event.preventDefault()
    console.log("Doja")
    //var date= document.querySelector("#dateInput").value;
   var cityInput= document.querySelector("#search").value;
   //converts cities with spaces in the name to have a plus instead for url
   //var date= "2021-12-05";
   //var city= "new+york"
   console.log(cityInput);
   var city= cityInput.split(' ').join('+');
   
   
     var requestUrl = "api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+key;
     //var requestUrl = "api.openweathermap.org/data/2.5/weather?q=atlanta&appid=88297b00647b4e5314bdcabb6ec68ee7"
   
     fetch(requestUrl)
       .then(function (response) {
         return response.json()
       })
       .then(function (data) {
         //var random = Math.floor(Math.random()*data.events.length);
         //var link = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=minutely,hourly&units=imperial&appid=" + key
         console.log(data)
         
         //printResults(data.name,link);
           
           
         
       });
   }

//todays weather containers
var todayCity=document.getElementById("todayCity");
var todayTemp=document.getElementById("todayTemp");
var todayWind=document.getElementById("todayWind");
var todayHumidity=document.getElementById("todayHumidity");
var todayUv=document.getElementById("todayUv");


//PRINT Results function
function printResults(data){
//erase previous results
todayCity.innerHTML="";
todayTemp.innerHTML="";
todayWind.innerHTML="";
todayHumidity.innerHTML="";
todayUv.innerHTML="";
//Add text content
todayCity.textContent= data.name+moment(data.dt.value).format("MMM D, YYYY");
todayTemp.textContent = data.main.temp + " °F";
todayWind.textContent = data.wind.speed + " MPH";
todayHumidity.textContent= data.main.humidity + "%";
todayUv.textContent= data
}
// todayTemp
// todayWind
// todayHumidity
// todayUv


