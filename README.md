# Movie Catalog

Веб-застосунок — каталог фільмів.  

## Технології

- **Backend:** Node.js, Nest.js, TypeScript
- **Frontend:** React (Vite), TypeScript 

## Структура репозиторію

```
movie-catalog/
├── backend/      # Nest.js REST API
├── frontend/     # React SPA 
└── README.md
```

## Сутності

### Movie (Фільм)

| Поле      | Тип    | Опис               |
|-----------|--------|--------------------|
| id        | number | ID                 |
| title     | string | Назва фільму       |
| director  | string | Режисер            |
| year      | number | Рік випуску        |
| rating    | number | Рейтинг (0–10)     |
| genreId   | number | ID жанру           |
| genreName | string | Назва жанру        |

### Genre (Жанр)

| Поле | Тип    | Опис          |
|------|--------|---------------|
| id   | number | ID            |
| name | string | Назва жанру   |

## API Ендпоінти

### Фільми

| Метод | URL                        | Опис                            |
|-------|----------------------------|---------------------------------|
| GET   | /api/movies                | Список всіх фільмів             |
| GET   | /api/movies?genreId=4      | Фільми відфільтровані за жанром |
| GET   | /api/movies/:id            | Отримати один фільм             |
| POST  | /api/movies                | Додати новий фільм              |
| PATCH | /api/movies/:id            | Оновити фільм                   |
| DELETE| /api/movies/:id            | Видалити фільм                  |

### Жанри

| Метод | URL             | Опис                  |
|-------|-----------------|-----------------------|
| GET   | /api/genres     | Список всіх жанрів    |
| GET   | /api/genres/:id | Отримати один жанр    |
| POST  | /api/genres     | Додати новий жанр     |
| PATCH | /api/movies/:id | Оновити жанр          |
| DELETE| /api/movies/:id | Видалити жанр         |

## Запуск Backend

```bash
cd backend
npm install
npm run start:dev
```

API доступне на `http://localhost:3000/api`

## Приклади запитів (cURL)

```bash
# Всі фільми
Invoke-RestMethod -Uri http://localhost:3000/api/movies

# Один фільм
Invoke-RestMethod -Uri http://localhost:3000/api/movies/1

# Додати фільм
Invoke-RestMethod -Method Post -Uri http://localhost:3000/api/movies -ContentType "application/json" -Body '{"title":"Interstellar","director":"Christopher Nolan","year":2014,"rating":8.6,"genreId":4}'

# Оновити рейтинг
Invoke-RestMethod -Method Patch -Uri http://localhost:3000/api/movies/1 -ContentType "application/json" -Body '{"rating":9.5}'

# Видалити фільм
Invoke-RestMethod -Method Delete -Uri http://localhost:3000/api/movies/3

# Всі жанри
Invoke-RestMethod -Uri http://localhost:3000/api/genres
```
