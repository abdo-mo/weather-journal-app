const apiKey = '537cfefd7c27740538249cfb4f9b810d';
const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?id='
let date = new Date();

function mainFunction(e) {
  user_res = document.getElementById('feelings').value;
  zipCode = document.getElementById('zip').value;
    getTemp(baseUrl,zipCode, apiKey)
    .then((returnedData) => {
      const temp = returnedData.list[0].main.temp;
      savingData('http://localhost:5000/add', {temp: temp, date: date, content: user_res})
    }).then(
        gettingUpdatedData()
      )
}

const getTemp = async (base_url, zipCode, api_key) =>{ 
    const url = `${base_url}${zipCode}&appid=${api_key}`
    const request = await fetch(url);
    try {
    const returnedData = await request.json()
    return returnedData;
    }
    catch(error) {
      console.log("error", error);
    }
  };

  const savingData = async ( url = '', obj = {})=>{
    
    const rawResponse = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(obj),
  });

    try {
      const content = await rawResponse.json();
      console.log(content);
      return content
    } catch(error) {
        console.log("error", error);
    }
}

const gettingUpdatedData = async () => {
  try{
    const request = await fetch('http://localhost:5000/all');
    const allReturnedData = await request.json();
    document.getElementById('date').innerHTML = allReturnedData.data.date;
    document.getElementById('temp').innerHTML = `${allReturnedData.data.temp} degrees`;
    document.getElementById('content').innerHTML = allReturnedData.data.content;

  }catch(error){
    console.log("error", error);
  }
}

document.getElementById('generate').addEventListener('click', mainFunction);