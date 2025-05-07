# Используем официальный образ Node.js как базовый
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальной код приложения
COPY . .

# Устанавливаем переменную окружения для API
ENV VITE_API_URL=http://back:5044/api/Task

# Собираем приложение
RUN npm run build

# Устанавливаем serve для обслуживания статических файлов
RUN npm install -g serve

# Открываем порт 3000
EXPOSE 3000

# Запускаем приложение
CMD ["serve", "-s", "dist", "-l", "3000"]