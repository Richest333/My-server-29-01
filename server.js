const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors'); // Подключаем CORS

const app = express();

// Разрешаем запросы со всех доменов
app.use(cors()); 

// Проверяем наличие сертификатов (если они загружаются из файлов)
const httpsOptions = process.env.NODE_ENV === 'production' ? {
    key: fs.readFileSync('localhost-key.pem'),  // Путь к ключу
    cert: fs.readFileSync('localhost.pem')      // Путь к сертификату
} : {};  // В production мы будем использовать HTTPS, а в другом случае - только HTTP

// Пример маршрута
app.get('/', (req, res) => {
    res.send('HTTPS сервер работает!');
});

// Запуск сервера
const HOST = '0.0.0.0'; // Слушаем все IP
const PORT = process.env.PORT || 443; // Используем PORT, предоставленный Render или 443 по умолчанию

if (httpsOptions.key && httpsOptions.cert) {
    https.createServer(httpsOptions, app).listen(PORT, HOST, () => {
        console.log(`Сервер запущен: https://localhost:${PORT}`);
    });
} else {
    app.listen(PORT, HOST, () => {
        console.log(`Сервер работает без HTTPS на http://localhost:${PORT}`);
    });
}
