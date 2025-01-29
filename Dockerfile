# Используем официальный образ Node.js
FROM node:14

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь исходный код
COPY . .

# Открываем порт для приложения
EXPOSE 443

# Переменная окружения для порта
ENV PORT=443

# Команда для запуска вашего приложения
CMD ["node", "server.js"]
