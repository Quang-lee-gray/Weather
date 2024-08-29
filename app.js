var $ = document.querySelector.bind(document);
const body = $('body');
const weather = $('.weather');
const weatherSearch = $('.weather__search'); //Tìm kiếm
const city = $('.city'); //Thành phố
const country = $('.country'); //Quốc gia
const timeCountry = $('.weather__content-time' ); //Thời gian thực
const temp = $('.temp'); //Nhiệt độ
const shortDesc = $('.weather__content-shortdesc'); //Tình hình thời tiết(mưa ,nắng ,...)
const visibility = $('.visibility span'); //Tầm nhìn
const wind = $('.wind span'); //Tốc độ gió
const humidity = $('.humidity span'); //Độ ẩm

async function renderWeather(searchStr){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchStr}&appid=4d6b3c80f839621dc0ed2a00181f07fc`;
    await fetch(url)

    .then( (res) => {
        return res.json();
    })

    .then( (res) => {
        city.innerText = res.name + " ,";
        country.innerText = res.sys.country;
        if((new Date().getHours()) < 12){
            timeCountry.innerText = (new Date().getMonth() + 1) + '/' + (new Date().getDate()) + '/' + (new Date().getFullYear()) + ' , ' + (new Date().getHours()) + ':' + (new Date().getMinutes()) + ':' + (new Date().getSeconds())  + ' ' + "AM";
        }else{
            timeCountry.innerText = (new Date().getMonth() + 1) + '/' + (new Date().getDate()) + '/' + (new Date().getFullYear()) + ' , ' + (new Date().getHours()) + ':' + (new Date().getMinutes()) + ':' + (new Date().getSeconds())  + ' ' + "PM";
        }
        temp.innerHTML = Math.floor(res.main.temp - 273.15) + ' ' + '<sup>o</sup>' + 'C';
        shortDesc.innerText = res.weather[0].main;
        visibility.innerText = res.visibility + ' (m)';
        wind.innerText= res.wind.speed + ' (m/s)';
        humidity.innerText = res.main.humidity + ' (%)';
        
        if(Math.floor(res.main.temp - 273.15) <= 100){
            body.classList.add('summer');
            weather.classList.add('summer2');
        }

        if(Math.floor(res.main.temp - 273.15) <= 28){
            body.classList.add('autumn');
            weather.classList.add('autumn2');
            body.classList.remove('summer');
            weather.classList.remove('summer2');
        }

        if(Math.floor(res.main.temp - 273.15) <= 20){
            body.classList.add('winter');
            weather.classList.add('winter2');
            body.classList.remove('autumn');
            weather.classList.remove('autumn2');
            body.classList.remove('summer');
            weather.classList.remove('summer2');
        }
        

    })
}

weatherSearch.addEventListener('keypress',function(e){
    if(e.key === 'Enter'){
        const search = weatherSearch.value.trim();
        renderWeather(search);
    }
})

renderWeather('Thanh Hoa');
