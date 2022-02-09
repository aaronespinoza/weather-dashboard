var key="88297b00647b4e5314bdcabb6ec68ee7";
var cityInput= document.querySelector("#cityInput")
//set empty array for saved cities to go
const cities =[];
const citySubmitEl=document.querySelector("#city-submit");
const weatherContainerEl=document.querySelector("#current-weather-container");
const forecastContainerEl = document.querySelector("#fiveday-container");
const pastSearchButtonEl = document.querySelector("#past-search-buttons");
const citySearchInputEl = document.querySelector("#searched-city");
const forecastTitle = document.querySelector("#forecast");



searchLocation.addEventListener("click",function(){
    returnWeather()
    fetch5()
});

//Taking in user input and saving search
const formSumbitHandler = function(event){
  event.preventDefault();
  let city = cityInputEl.value.trim();
  if(city){
      getWeather(city);
      get5Day(city);
      cities.unshift({city});
      cityInputEl.value = "";
  } else{
      alert("Please enter a City");
  }
  saveSearch();
  pastSearch(city);
}

const saveSearch = function(){
  localStorage.setItem("cities", JSON.stringify(cities));
};

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

const pastSearch = function(pastSearch){

  pastSearchEl = document.createElement("button");
  pastSearchEl.textContent = pastSearch;
  pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
  pastSearchEl.setAttribute("data-city",pastSearch);
  pastSearchEl.setAttribute("type", "submit");

  pastSearchButtonEl.prepend(pastSearchEl);
}

const pastSearchHandler = function(event){
    let city = event.target.getAttribute("data-city")
    if(city){
        getCityWeather(city);
        get5Day(city);
    }
}

const saveSearch = function(){
  localStorage.setItem("cities", JSON.stringify(cities));
};

//

//Display for the UV and attaching the classes of color for weather conditions
const displayUvIndex = function(index){
  let uvIndexEl = document.createElement("div");
  uvIndexEl.textContent = "UV Index: "
  uvIndexEl.classList = "list-group-item"

  uvIndexValue = document.createElement("span")
  uvIndexValue.textContent = index.value

  if(index.value <=2){
      uvIndexValue.classList = "favorable"
  }else if(index.value >2 && index.value<=8){
      uvIndexValue.classList = "moderate "
  }
  else if(index.value >8){
      uvIndexValue.classList = "severe"
  };

  uvIndexEl.appendChild(uvIndexValue);
  weatherContainerEl.appendChild(uvIndexEl);
}

//fetching the UV
const getUvIndex = function(lat,lon){
  let apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`

  fetch(apiURL)
  .then(function(response){
      response.json()
  .then(function(data){
          displayUvIndex(data)
      });
  });
}