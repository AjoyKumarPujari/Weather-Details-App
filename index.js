
// const APIKEY = "d1845658f92b31c64bd94f06f7188c9c";
// function renderWeatherInfo(data){
//     let newPara = document.createElement('p');
//     newPara.textContent = `${data?.main?.temp.toFixed(2)}C`

//     document.body.appendChild(newPara);
// }

// async function fetchWeatherdetails(){

//     try{
//     let city= "Goa"
//     const response =await fetch( `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`);
//     const data = await response.json();
//     console.log("Weather data:->" , data);
//     renderWeatherInfo(data);
//     }
//     catch(err){
//         //handle the error
//         console.log("Error Found", err);
//     }
    
// }

// function getLocation(){
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     else{
//         console.log("No Geo Locatin Support")
//     }
// }

// function showPosition(position){
//     let lat = position.coords.latitude;
//     let longi = position.coords.longitude; 
//     console.log(lat);
//     console.log(longi);

// }


//-----------------------------------------------------------------------------------
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContaine = document.querySelector(".weather-container");


const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

//Initailly variable needs

let oldTab = userTab;
const API_KEY ="d1845658f92b31c64bd94f06f7188c9c";
oldTab.classList.add("current-tab"); 

function switchTab(newTab){
    if(newTab != oldTab){
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else{
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click", ()=>{
    //passed clicked tab as inputparameter
    switchTab(userTab);
});

searchTab.addEventListener("click", ()=>{
    //passed clicked tab as inputparameter
    switchTab(searchTab);
});
//check if coordinates are already prsent in session storage
function getfromSessionStorage(){
    const localCoordinats = sessionStorage.getItem("user-coordinates");
    if(!localCoordinats){
        grantAccessContainer.classList.add("active");
    }
    else{
        const coordinates = JSON.parse(localCoordinats);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){
    const {lat, lon} = coordinates;
    //make grantAccessContainer.classList.add("active"); invisible
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");

    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data =await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderweatherInfo(data);  

    }
    catch(err){
        loadingScreen.classList.remove("active");
    }
}

function renderweatherInfo(weatherInfo){
    const cityName = document.querySelector("[data-cityName]");
    const cityIcon = documment.
}