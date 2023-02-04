
import displayLocalWeather from "./modules/displayLocalWeather.js";
import Tasks from './modules/Tasks.js';
import showTasks from './modules/showTasks.js';

const crypto = document.getElementById("crypto")
const weather = document.getElementById("weather-card");
const coinsname = [ 'bitcoin' , 'dogecoin', 'ethereum' , 'litecoin']
const task = new Tasks();
const form = document.getElementById('add-new-to-do');

const quotesApi = async () => {
    const option =  {
    
    headers : {'X-Api-Key': 'EeBg7skoI0CQGrAEc2NLCg==Z2JZmGDsvUqZCihv'}
}
    fetch("https://api.api-ninjas.com/v1/quotes?category=inspirational", option)
    .then(response => response.json())
    .then(data => {
        console.log(data[0])
        document.getElementById("quotes").innerHTML = `${data[0].quote} <br> ${data[0].author}`
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (document.getElementById('input-item').value === '') {
      document.getElementById('error').innerHTML = 'please add task first';
    } else {
      task.addTasks();
    }
  });

  window.deleteTask = (i) => {
    task.tasklist.splice(i, 1);
    task.tasklist.forEach((item) => {
      if (item.index <= 0) {
        item.index = 1;
      } else {
        item.index -= 1;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(task.tasklist));
    window.location.reload();
  };

  window.changed = (i, item) => {
    const change = JSON.parse(localStorage.getItem('tasks'));
    for (let j = 0; j < change.length; j += 1) {
      if (task.tasklist[j].description === item) {
        task.tasklist[j].completed = true;
        localStorage.setItem('tasks', JSON.stringify(task.tasklist));
      }
    }
    window.location.reload();
  };

  window.clearAllCompletedTasks = () => {
    const completedList = JSON.parse(localStorage.getItem('tasks'));
    const len = completedList.length;
    for (let j = 0; j < len; j += 1) {
      if (task.tasklist[j].completed === true) {
        task.tasklist.splice(j, 1);
        j -= 1;
        localStorage.setItem('tasks', JSON.stringify(task.tasklist));
        location.reload();
      }
    }
  };

window.addEventListener('load', async () => {
    displayLocalWeather();
    showTasks(task);

await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=Textures & Patterns")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
		document.getElementById("author").textContent = `By: ${data.user.name}`
    })
let count = 0, interval = 10000
setInterval( async () => {
        if(count >= coinsname.length){
        count = 0
        interval = 60000
        }
        
         await fetch(`https://api.coingecko.com/api/v3/coins/${coinsname[count]}`)
        .then(response => response.json())
        .then(data => {
            crypto.innerHTML = `  <div id="coin">
                                    <img class="image" src=${data.image.thumb} />
                                    <span class="coin-name">${data.name}</span>
                                    
                                  </div>
                                <ul class="market-list">
                                    <li><span class="coin-name">24 Hour data</span><hr></li>
                                    <li class="market-price">$&nbsp;${data.market_data.current_price.usd} 
                                    </li>
                                    <li class="market_price">$
                                      ${data.market_data.high_24h.usd}<img class="like" src="images/like.png"></li>
                                    <li class="market_price">$
                                     ${data.market_data.low_24h.usd}<img class="like" src="images/dislike.png">
                                    </li>
                                 </ul>`
        })
        .catch(err => console.log(err.message))
    
    count += 1
} , interval)

/* document.addEventListener("visibilitychange", () => {
    crypto.style.display = "none"
    console.log("crypto box disabled")
  });
  */

  setInterval(() => {
const date = new Date();
document.getElementById("time-block").firstElementChild.innerHTML = `${date.toLocaleTimeString("en-us", {timeStyle: "short"})}`
}, 1000)

})

quotesApi();

