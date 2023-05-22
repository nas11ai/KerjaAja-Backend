# KerjaAja API Documentation

This API is made with:

1. Express.js
2. MySQL
3. Sequelize

## API Version

- 1.0

## Base URL

- Development: http://localhost:3001

# User

## Register User

Register a new user.

- **URL**: `/register`
- **Method**: `POST`
- **Content-type**: `application/x-www-form-urlencoded`

### Request Body

| Field    | Type   | Description     |
| -------- | ------ | --------------- |
| username | string | User's username |
| fullname | string | User's fullname |
| role     | string | User's role     |
| password | string | User's password |
| gender   | string | User's gender   |

### Response

- **Success Response**

  - **Code**: `201 CREATED`
  - **Content-type**: `application/json`
  - **Content**:
    ```json
    {
      "message": "CREATED",
      "data": {
        "users": null
      }
    }
    ```

- **Error Responses**
  - **Code**: `400 BAD_REQUEST`
  - **Content-type**: `application/json`
    - **Content**:
      - When `username` is blank:
        ```json
        {
          "error": {
            "attribute": "username",
            "message": "username must not be blank"
          }
        }
        ```
      - When `username` has been taken:
        ```json
        {
          "error": {
            "attribute": "username",
            "message": "username has been taken"
          }
        }
        ```
      - When `fullname` is blank:
        ```json
        {
          "error": {
            "attribute": "fullname",
            "message": "fullname must not be blank"
          }
        }
        ```
      - When `role` is blank:
        ```json
        {
          "error": {
            "attribute": "role",
            "message": "role must not be blank"
          }
        }
        ```
      - When `password` is blank:
        ```json
        {
          "error": {
            "attribute": "password",
            "message": "password must not be blank"
          }
        }
        ```
      - When `gender` is blank:
        ```json
        {
          "error": {
            "attribute": "gender",
            "message": "gender must not be blank"
          }
        }
        ```

### Request Example

- **POST** `{{base_url}}/register`
- **Content-Type:** `application/x-www-form-urlencoded`

| Field    | Input Example  |
| -------- | -------------- |
| username | root           |
| fullname | Capstone Admin |
| role     | superadmin     |
| password | root           |
| gender   | male           |
