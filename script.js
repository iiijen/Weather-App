document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.querySelector('.search-area input').value.trim();

    
    document.querySelector('.search-area input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('searchBtn').click();
        }
    });


    if (!city) {
        alert('請輸入城市名稱');
        return;
    }

    const apiKey = '510b2c4a55263f641db51f5e5f609bc6';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('成功回傳：', data);

            document.getElementById("temp").textContent = `${Math.round(data.main.temp)}°`;
            document.getElementById("city").textContent = data.name;
            document.getElementById("humidity-value").textContent = `${data.main.humidity}%`;
            document.getElementById("windspeed-value").textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;

            const weatherIcon = document.querySelector('.weather-icon img');
            console.log('weatherIcon 是：', weatherIcon);

            weatherIcon.onerror = () => {
                weatherIcon.src = './images/default.png';
            };

            const iconName = data.weather[0].main.toLowerCase();
            console.log('切換圖片為：', iconName);
            weatherIcon.src = `./images/${iconName}.png`;
        })
        .catch(error => {
            console.error('錯誤發生：', error);
        });
});
