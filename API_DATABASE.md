# API Database Structure

## Endpoints

### GET /user
Получить всех пользователей или найти по email

**Query params:**
- `email=test@example.com` - искать пользователя по email (опционально)

**Response:**
```json
// Если есть query параметр email
[]  // пусто, если пользователь не найден
// или
[{
  "id": 1,
  "name": "John Doe",
  "email": "test@example.com",
  "password": "password123",
  "avatar": "data:image/svg+xml;base64,...",
  "saved": 0
}]

// Если нет параметров - вернуть всех пользователей
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "avatar": "data:image/svg+xml;base64,...",
    "saved": 0
  },
  {
    "id": 2,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "password456",
    "avatar": "data:image/svg+xml;base64,...",
    "saved": 0
  }
]
```

### POST /user
Создать нового пользователя

**Request body:**
```json
{
  "name": "John Doe",
  "email": "test@example.com",
  "password": "password123",
  "avatar": "data:image/svg+xml;base64,...",
  "saved": 0
}
```

**Response (201 Created):**
```json
{
  "id": 3,
  "name": "John Doe",
  "email": "test@example.com",
  "password": "password123",
  "avatar": "data:image/svg+xml;base64,...",
  "saved": 0
}
```

**Response (409 Conflict - если email уже существует):**
```json
{
  "error": "Email already exists"
}
```

## Примеры запросов в консоли браузера

```javascript
// Получить всех пользователей
fetch('http://localhost:1487/user')
  .then(r => r.json())
  .then(d => console.log(d))

// Проверить если email существует
fetch('http://localhost:1487/user?email=test@example.com')
  .then(r => r.json())
  .then(d => console.log('Email exists:', d.length > 0))

// Создать пользователя
fetch('http://localhost:1487/user', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    avatar: 'https://avatar-url.com/image.jpg',
    saved: 0
  })
})
  .then(r => r.json())
  .then(d => console.log(d))
```

## Проверка логов

Откройте **F12 → Console** при регистрации/логине. Вы увидите:

1. `Checking if email exists: email@example.com` - запрос на проверку
2. `Email check response: [...]` - ответ от сервера
3. `Email exists (array): true/false` - результат
4. `Registering user with data: {...}` - данные регистрации
5. `User registered successfully: {...}` - успешно или ошибка

Если вы не видите эти логи - значит бекенд не отвечает.
