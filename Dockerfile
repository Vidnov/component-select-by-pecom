# Используем официальный Node.js образ как базовый для сборки
FROM node:16 as build-stage

# Указываем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Собираем приложение для production
RUN npm run build

# Используем минимальный веб-сервер nginx для запуска собранного приложения
FROM nginx:1.23 as production-stage

# Копируем собранные файлы из предыдущего этапа
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Копируем файл конфигурации nginx (опционально)
# COPY nginx.conf /etc/nginx/nginx.conf

# Указываем порт, на котором будет доступно приложение
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
