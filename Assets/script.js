var searchLocation=document.getElementById("search");
var key="88297b00647b4e5314bdcabb6ec68ee7";
var cityInput= document.querySelector("#cityInput")
//set empty array for saved cities to go
const cities =[];

searchLocation.addEventListener("click",function(){
    returnWeather()
    fetch5()
});
//SEARCH RESULTS
function returnWeather() {
    console.log("Doja")
   
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityInput.value + "&appid=" +key
    console.log(requestUrl);
     fetch(requestUrl)
       .then(function (response) {
         return response.json()
       })
       .then(function (data) {
         console.log(data);
         
         printResults(data);
           
           
         
       });
}

//todays weather containers
var todayCity=document.getElementById("todayCity");
var todayTemp=document.getElementById("todayTemp");
var todayWind=document.getElementById("todayWind");
var todayHumidity=document.getElementById("todayHumidity");
var todayUv=document.getElementById("todayUv");


//PRINT Today's Results function
function printResults(data){
//erase previous results
todayCity.textContent="";
todayTemp.textContent="";
todayWind.textContent="";
todayHumidity.textContent="";
//todayUv.textContent="";
//Add text content
todayCity.textContent= data.name+moment(data.dt.value).format(" MMM D, YYYY");
todayTemp.textContent = "Temp:" +data.main.temp + " °F";
todayWind.textContent = "Wind:" +data.wind.speed + " MPH";
todayHumidity.textContent= "Humidity:" +data.main.humidity + "%";
//todayUv.textContent= data
}

//FETCH 5 DAY
var fetch5= function(){
  
  //var city= cityInput.split(' ').join('+');

  var api5 = "https://api.openweathermap.org/data/2.5/forecast?q="+cityInput.value+"&units=imperial&appid="+key;
  console.log(api5);
     fetch(api5)
       .then(function (response) {
         return response.json()
       })
       .then(function (data) {
         
         console.log(data)
         
         print5Day(data);
           
           
         
       });

}

//PRINT 5 Day Forecast function
function print5Day(data){
    //erase previous results
    todayCity.textContent="";
    todayTemp.textContent="";
    todayWind.textContent="";
    todayHumidity.textContent="";
    todayUv.textContent="";
    //Add text content
    todayCity.textContent= data.name+moment(data.dt.value).format("MMM D, YYYY");
    todayTemp.textContent = "Temp:" +data.main.temp + " °F";
    todayWind.textContent = "Wind" +data.wind.speed + " MPH";
    todayHumidity.textContent= "Humidity" +data.main.humidity + "%";
    todayUv.textContent= data
    }

//Save previous city searches
const formSumbitHandler = function(event){
  event.preventDefault();
  let citymod = cityInput.value.trim();
  if(citymod){
      getWeather(citymod);
      fetch5(citymod);
      cities.unshift({citymod});
      cityInput.value = "";
  } else{
      alert("Please enter a City");
  }
  saveSearch();
  pastSearch(citymod);
}

const saveSearch = function(){
  localStorage.setItem("cities", JSON.stringify(cities));
};