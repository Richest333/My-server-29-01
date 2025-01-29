const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors'); // Подключаем CORS

const app = express();

// Разрешаем запросы со всех доменов
app.use(cors()); 

// Загружаем файлы сертификата
const httpsOptions = {
    key: fs.readFileSync('localhost-key.pem'), // Было localhost+2-key.pem
    cert: fs.readFileSync('localhost.pem')    // Было localhost+2.pem
};

// Пример маршрута
app.get('/', (req, res) => {
    res.send('HTTPS сервер работает!');
});

// Запуск HTTPS-сервера
const HOST = '0.0.0.0'; // Слушаем все IP
const PORT = 443; // Можно поменять на другой порт, если 443 занят
https.createServer(httpsOptions, app).listen(PORT, HOST, () => {
    console.log(`Сервер запущен: https://localhost:${PORT}`);
});
