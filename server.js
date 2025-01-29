const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');

const app = express();

// Разрешаем запросы со всех доменов
app.use(cors());

// Путь к сертификатам
const httpsOptions = {
    key: fs.readFileSync('localhost-key.pem'),
    cert: fs.readFileSync('localhost.pem')
};

// Пример маршрута
app.get('/', (req, res) => {
    res.send('HTTPS сервер работает!');
});

// Запуск сервера
const HOST = '0.0.0.0'; // Слушаем все IP
const PORT = process.env.PORT || 443; // Используем PORT, предоставленный платформой или 443 по умолчанию

https.createServer(httpsOptions, app).listen(PORT, HOST, () => {
    console.log(`Сервер запущен: https://localhost:${PORT}`);
});
