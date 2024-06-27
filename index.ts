
"use strict";


interface JokeResponse {
   id: string;
   joke: string;
}


const output = document.getElementById('joke-container') as HTMLDivElement;
const nextJoke = document.getElementById('getJoke') as HTMLButtonElement;
const blobMain = document.querySelector('.blob-main') as HTMLDivElement;


const api: string = 'https://icanhazdadjoke.com/';
const api2: string = 'https://api.chucknorris.io/jokes/random'



const divertidoBtn = document.getElementById("button_good") as HTMLButtonElement;
const neutralBtn = document.getElementById("button_normal") as HTMLButtonElement;
const tristeBtn = document.getElementById("button_bad") as HTMLButtonElement;
let now = new Date();
let score: number = 0;

interface ReportAcudits {
   joke: string;
   score: number;
   date: string;
}

let reportAcudits: ReportAcudits = { joke: "", score: 0, date: now.toISOString() };
let reportJokes: ReportAcudits[] = [];


async function getJoke(): Promise<void> {

   
   try {
      const response: Response = await fetch(api, {
         headers: {
               'Accept': 'application/json'
         }
      });

      if (response.ok) {
         const data: JokeResponse = await response.json();
         output.innerHTML = `<p>${data.joke}</p>`;
         replaceBlob(); 
         reportAcudits.joke = data.joke; 
         reportAcudits.score = 0;
         reportAcudits.date = new Date().toISOString(); 
      } else {
         output.innerHTML = 'Failed to fetch joke';
      }
   } catch (error) {
      console.error('Error executing request:', error);
      output.innerHTML = 'Error fetching joke';
   }
console.log(reportJokes)
}



document.addEventListener('DOMContentLoaded', () => {
   nextJoke.addEventListener('click', getJoke);
});


getJoke()

async function getChuckNorrisJoke(): Promise<void> {
   try {
      const response: Response = await fetch(api2);
      if (!response.ok) {
         throw new Error(`No hay chistes de Chuck Norris: ${response.statusText}`);
      }
      const data = await response.json();
      const jokeData: JokeResponse = {
         id: data.id,
         joke: data.value,
      };
      output.innerHTML = `<p>${jokeData.joke}</p>`;
      replaceBlob();
      reportAcudits.joke = jokeData.joke;
      reportAcudits.score = 0;
      reportAcudits.date = new Date().toISOString();
   } catch (error) {
      console.error('There are no jokes !', error);
      output.innerHTML = 'Error getting Chuck Norris joke';
   }
}

async function fetchJoke(): Promise<void> {
const randomNumber = Math.random();
if (randomNumber < 0.5) { 
      return getJoke();
} else {
      return getChuckNorrisJoke();
}
}



function aprecionarJoke(score: number): void {
   reportAcudits.score = score;
   reportAcudits.date = new Date().toISOString();
   

   const existingJokeIndex = reportJokes.findIndex(j => j.joke === reportAcudits.joke);
   if (existingJokeIndex !== -1) {

      reportJokes[existingJokeIndex].score = score;
      reportJokes[existingJokeIndex].date = reportAcudits.date;
   } else {

      reportJokes.push({ ...reportAcudits });
   }
}

divertidoBtn.addEventListener('click', () => aprecionarJoke(3));
neutralBtn.addEventListener('click', () => aprecionarJoke(2));
tristeBtn.addEventListener('click', () => aprecionarJoke(1));

nextJoke.addEventListener('click', () => {
   if (reportAcudits.joke) {
      reportAcudits = { joke: "", score: 0, date: new Date().toISOString() };
   }
});

function replaceBlob(): void {
   
   const randomIndex: number = Math.floor(Math.random() * svgs.length);
   blobMain.innerHTML = svgs[randomIndex];
}


const meteo = document.getElementById('meteo') as HTMLDivElement;

const weatherIconMap: { [key: string]: string } = {
   "01d": "icons/sun.png",
   "01n": "icons/sun.png", 
   "02d": "icons/cloudy.png",
   "02n": "icons/cloudy.png",
   "03d": "icons/cloudy.png",
   "03n": "icons/cloudy.png",
   "04d": "icons/cloudy.png",
   "04n": "icons/cloudy.png",
   "09d": "icons/rain.png",
   "09n": "icons/rain.png",
   "10d": "icons/rain.png",
   "10n": "icons/rain.png",
   "11d": "icons/trueno.png",
   "11n": "icons/trueno.png",
   "13d": "icons/snow.png", 
   "13n": "icons/snow.png", 
   "50d": "icons/mist.png", 
   "50n": "icons/mist.png"  
};

async function meteoCurrent(): Promise<void> {
   try {
      const response: Response = await fetch(
         "https://api.openweathermap.org/data/2.5/weather?lat=41.3888&lon=2.159&appid=6ac23fcea84514231e680bd47fa91be3&units=metric"
      );

      if (response.ok) {
         const data: {
            main: {
               temp: number;
            };
            weather: [
               {
               
                  icon: string;
               }
            ];
         } = await response.json();
         console.log(data);
         const weather = data.weather[0];
         const iconUrl = weatherIconMap[weather.icon] || "icons/default.png";
         meteo.innerHTML = `
            <div class="weather-image d-inline-flex align-items-center">
               <img src="${iconUrl}" class = "p-1"  style="width: 50px; height: 50px;">
               <h2>|</h2>
               <h1 class="temp p-2">${Math.round(data.main.temp)} &#176;C</h1" style="font-size: 20px">
            </div>
            
         `;
      } else {
         meteo.innerHTML = 'Failed to fetch weather';
      }
   } catch (error) {
      console.error('Error executing request:', error);
      meteo.innerHTML = 'Error fetching weather';
   }
}

document.addEventListener('DOMContentLoaded', meteoCurrent);



const svgs: string[] = [
   `
   <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="position-absolute top-0 start-50 translate-middle-x z-n1">
      <path fill="#8A3FFC" d="M50.8,-79C65.6,-69.5,77.1,-55,84.1,-38.7C91,-22.4,93.3,-4.3,90.4,12.7C87.5,29.7,79.4,45.7,68.1,59.4C56.8,73.1,42.5,84.4,26.3,88.9C10.1,93.3,-7.9,90.8,-23.9,84.7C-39.9,78.5,-53.9,68.7,-66,56.3C-78.2,44,-88.4,29.1,-91.3,12.7C-94.3,-3.6,-89.9,-21.3,-81.7,-36.5C-73.6,-51.7,-61.5,-64.4,-47.3,-74.1C-33,-83.8,-16.5,-90.5,0.7,-91.6C18,-92.8,36,-88.4,50.8,-79Z" transform="translate(100 100)" />
   </svg>
   `,
   `
   <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="position-absolute top-0 start-50 translate-middle-x z-n1">
      <path fill="#8A3FFC" d="M75.9,-69.5C90.8,-61.8,101.3,-46.8,105.5,-30.2C109.7,-13.6,107.7,4.7,101.2,20.1C94.7,35.5,83.7,48.3,69.8,59.3C55.9,70.3,39.1,79.6,22.7,82.9C6.4,86.2,-9.6,83.5,-22.5,77.9C-35.4,72.3,-45.2,63.9,-55.4,52.8C-65.6,41.7,-76.2,27.8,-81.7,12.7C-87.1,-2.4,-87.3,-18.5,-81.8,-33.5C-76.3,-48.5,-65,-62.5,-51.7,-71.4C-38.5,-80.3,-23.3,-84.1,-7.4,-83.5C8.5,-82.9,17,-78,30.4,-74.5C43.8,-71,61.2,-68.9,75.9,-69.5Z" transform="translate(100 100)" />
   </svg>
   `
];