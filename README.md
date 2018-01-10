# TODO application
Allows the to create and manage a simple todo application using NodeJS.

## Adding users
**Request**

- Set method type to POST /users
- Add to the header `content-type: application/json`
- Add the example JSON code below.
```
{
  "email": "user@example.com",
  "password": "mypassword"
}
```

**Expected response**
```
{
    "id": 1,
    "email": "user@example.com",
    "updatedAt": "2018-01-10T18:46:00.655Z",
    "createAt": "2018-01-10T18:46:00.655Z"
}
```

## Login in
**Request**

- Set method type POST /user/login
- Add to the header `content-type: application/json`
- Add the example JSON code below.
```
{
  "email": "user@example.com",
  "password": "mypassword"
}
```

**Expected response**
```
{
    "id": 1,
    "email": "user@example.com",
    "updatedAt": "2018-01-10T18:46:00.655Z",
    "createdAt": "2018-01-10T18:46:00.655Z"
}
```

## Login out
**Request**

- Set method type DELETE /user/login
- Add to the header `content-type:

**Expected response**
- header response status code 204

# CRUD for todos
This section allows the users to add, delete, update, and get their todos.


## Adding a todo
- use method POST /todos

## Getting all todo
- GET /todos

## Getting a specific todo by ID
- GET /todo/{id}

## Deleting a todo
- DELETE /todo/{id}

## Updating a todo item
- PUT /todo/{id}
