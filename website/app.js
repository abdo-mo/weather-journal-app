/* Global Variables */
const api_key = '537cfefd7c27740538249cfb4f9b810d';
const base_url = 'http://api.openweathermap.org/data/2.5/forecast?id='
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    id = document.getElementById('zip').value;
    user_res = document.getElementById('feelings').value;
    getTemp(base_url,id, api_key)
    .then(function(allData){
        const temperature = allData.list[0].main.temp;
        postData('http://localhost:5000/add', {temp: temperature, date: d, content: user_res});
      })
      .then(
        updateUI()
      )
}

const getTemp = async (base_url, id, api_key) =>{ 
    const url = `${base_url}${id}&appid=${api_key}`
    const request = await fetch(url);
    try {
    const allData = await request.json()
    return allData;
    }
    catch(error) {
      console.log("error", error);
    }
  };

  const postData = async ( url = '', data = {})=>{
    
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

    try {
      const newData = await response.json();
        return newData
    } catch(error) {
        console.log("error", error);
    }
}

const updateUI = async () => {
  const request = await fetch('http://localhost:5000/all');
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData.data.date;
    document.getElementById('temp').innerHTML = Math.round(allData.data.temp) + ' degrees';
    document.getElementById('content').innerHTML = allData.data.content;

  }catch(error){
    console.log("error", error);
  }
}