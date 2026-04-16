# Movie Catalog

Веб-застосунок — каталог фільмів.  

## Технології

- **Backend:** Node.js, Nest.js, TypeScript
- **Frontend:** React 18, Vite, TypeScript, React Router, React Hook Form, Zod

## Структура репозиторію

```
movie-catalog/
├── backend/      # Nest.js REST API
        └── src/
            ├── movies/
            │   ├── dto/
            │   │   ├── create-movie.dto.ts
            │   │   └── update-movie.dto.ts
            │   ├── movies.controller.ts
            │   ├── movies.service.ts
            │   └── movies.module.ts
            ├── genres/
            │   ├── dto/
            │   │   ├── create-genre.dto.ts
            │   │   └── update-genre.dto.ts
            │   ├── genres.controller.ts
            │   ├── genres.service.ts
            │   └── genres.module.ts
            ├── app.module.ts
            └── main.ts
├── frontend/     # React SPA 
        └── src/
            ├── api/
            │   └── index.ts        # всі HTTP-запити до API
            ├── components/
            │   ├── Navbar.tsx      # навігаційна панель
            │   ├── MovieForm.tsx   # форма створення/редагування фільму
            │   └── Toast.tsx       # сповіщення
            ├── pages/
            │   ├── MoviesPage.tsx      # головна сторінка
            │   ├── MovieDetailPage.tsx # деталі фільму
            │   └── GenresPage.tsx      # сторінка жанрів
            ├── types/
            │   └── index.ts        # TypeScript інтерфейси
            ├── App.tsx             # маршрутизація
            └── main.tsx            # точка входу
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

## Сторінки Frontend

| Маршрут       | Опис                                       |
|---------------|--------------------------------------------|
| `/`           | Список фільмів з фільтрацією за жанром     |
| `/movies/:id` | Детальна сторінка фільму                   |
| `/genres`     | Список жанрів з формою додавання           |

## Запуск Backend

```bash
cd backend
npm install
npm run start:dev
```

## Запуск Frontend

```bash
cd frontend
npm install
npm run dev
```

API доступне на `http://localhost:3000/api`

Застосунок доступний на `http://localhost:5173`

! Backend має бути запущений перед стартом frontend.

## Приклади запитів (PowerShell)

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
