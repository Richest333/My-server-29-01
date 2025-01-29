const sqlite3 = require('sqlite3').verbose();

// Создаем базу данных в файле
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error("Ошибка при открытии базы данных:", err.message);
    } else {
        console.log('База данных подключена.');
    }
});

// Создаем таблицу пользователей (если ее нет)
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)`);

module.exports = db;
