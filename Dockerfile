# Используем базовый образ Node.js
FROM node:14

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем файлы сервера
COPY . .

# Определяем порт
EXPOSE 3000

# Запуск сервера
CMD ["node", "server.js"]
