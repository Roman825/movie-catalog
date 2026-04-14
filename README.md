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

### Жанри

| Метод | URL             | Опис                  |
|-------|-----------------|-----------------------|
| GET   | /api/genres     | Список всіх жанрів    |
| GET   | /api/genres/:id | Отримати один жанр    |
| POST  | /api/genres     | Додати новий жанр     |

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
curl http://localhost:3000/api/movies

# Один фільм
curl http://localhost:3000/api/movies/1

# Фільми жанру Sci-Fi (id=4)
curl http://localhost:3000/api/movies?genreId=4

# Додати фільм
curl -X POST http://localhost:3000/api/movies \
  -H "Content-Type: application/json" \
  -d '{"title":"Interstellar","director":"Christopher Nolan","year":2014,"rating":8.6,"genreId":4}'

# Всі жанри
curl http://localhost:3000/api/genres

# Додати жанр
curl -X POST http://localhost:3000/api/genres \
  -H "Content-Type: application/json" \
  -d '{"name":"Thriller"}'
```
