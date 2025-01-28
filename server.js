const express = require('express');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

// Путь к сертификатам
const privateKey = fs.readFileSync('E:/my-server/localhost+2-key.pem', 'utf8');
const certificate = fs.readFileSync('E:/my-server/localhost+2.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

// Настройки безопасности с помощью Helmet
app.use(helmet());

// Разрешаем CORS
app.use(cors());

// Логирование запросов
app.use(morgan('combined'));

// Парсинг JSON данных
app.use(express.json());

// Стандартный маршрут для проверки
app.get('/', (req, res) => {
  res.send('Hello World over HTTPS!');
});

// Запуск сервера с HTTPS
https.createServer(credentials, app).listen(3001, () => {
  console.log('Server is running securely on port 3001');
});
