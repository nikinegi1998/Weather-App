const input = document.querySelector('#form input[type="text"]');
const btn = document.querySelector('button');

btn.addEventListener('click', (e)=>{
    
    const val = input.value;
    // console.log(val);
    if(val){
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${val}&appid=02b6a6c0f09a6ad4061f28f3423a4cf9`;
        
        fetch(url)
            .then(data => {
                // console.log(data);
                return data.json();
            })
            .then(parsing =>{
                // console.log(parsing);
                
                const obj={
                    city: parsing.name,
                    country: parsing.sys.country,
                    temp: parsing.main.temp,
                    min: parsing.main.temp_min,
                    max: parsing.main.temp_max,
                    desc: parsing.weather[0].main,
                    humidity: parsing.main.humidity,
                    wind: parsing.wind.speed                    
                };
                
                showInfo(obj);
                
            })
            .catch(error =>{                
                console.log("An error occurred");
                alert("Enter valid city name");
            })
        
    }
    else{
        alert("Please! Enter the city")
    }
    e.preventDefault();
    input.value ="";
})

function showInfo(obj){
    // console.log(obj);

    let date =new Date()

    let days =[
        "Sunday","Monday","Tuesday","Wednesday", "Thursday","Friday","Saturday"
    ]

    let months =[
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
        
    const finaldate = {
        day: days[date.getDay()],
        dd: date.getDate(),
        mm: months[date.getMonth()],
        yy: date.getUTCFullYear()
    }
        
    document.querySelector('.location').innerText = obj.city +", " +obj.country;
    document.querySelector('.date').innerText = finaldate.day +", "+finaldate.dd +" " +finaldate.mm+" "+ finaldate.yy;
    document.querySelector('.temp').innerText = Math.floor(obj.temp-273.15)+"°C";
    document.querySelector('.min-max').innerText = Math.floor(obj.min-273.15)+"°C/ "+Math.floor(obj.max-273.15)+"°C";
    document.querySelector('.desc').innerText = obj.desc;
    document.querySelector('.humidity').innerText = "Humidity: "+obj.humidity+"%";
    document.querySelector('.wind').innerText = "Wind Speed: "+obj.wind+"km/h";
}


// URL: http://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=02b6a6c0f09a6ad4061f28f3423a4cf9
// API key: 02b6a6c0f09a6ad4061f28f3423a4cf9
// Made By: Nikita Negi
// Date: 4th April, 2021
