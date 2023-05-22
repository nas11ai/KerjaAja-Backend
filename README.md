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

- **URL**: `/users/register`
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

- **POST** `{{base_url}}/users/register`
- **Content-Type:** `application/x-www-form-urlencoded`

| Field    | Input Example  |
| -------- | -------------- |
| username | root           |
| fullname | Capstone Admin |
| role     | superadmin     |
| password | root           |
| gender   | male           |

---

## User Login

Authenticate a user and generate access token.

- **URL**: `/users/login`
- **Method**: `POST`
- **Content-type**: `application/x-www-form-urlencoded`

### Request Body

| Field    | Type   | Description     |
| -------- | ------ | --------------- |
| username | string | User's username |
| password | string | User's password |

### Response

- **Success Response**

  - **Code**: `200 OK`
  - **Content-type**: `application/json`
  - **Content**:
    ```json
    {
      "message": "OK",
      "data": {
        "bearer_token": {
          "user_role": "user",
          "access_token": "generated_access_token"
        }
      }
    }
    ```

- **Error Responses**
  - **Code**: `400 BAD_REQUEST`
  - **Content-type**: `application/json`
    - **Content**:
      - When `username` is wrong:
        ```json
        {
          "error": {
            "attribute": "username",
            "message": "username is wrong"
          }
        }
        ```
      - When `password` is wrong:
        ```json
        {
          "error": {
            "attribute": "password",
            "message": "password is wrong"
          }
        }
        ```

### Request Example

- **POST** `{{base_url}}/users/login`
- **Content-Type:** `application/x-www-form-urlencoded`

| Field    | Input Example |
| -------- | ------------- |
| username | root          |
| password | root          |

---

### Get Existing Users

Retrieve existing users based on the provided query parameters.

- **URL**: `{{base_url}}}/users/read`
- **Method**: `GET`

#### Query Parameters for Filtering

| Parameter  | Type   | Description                                          |
| ---------- | ------ | ---------------------------------------------------- |
| page       | number | Current page number                                  |
| size       | number | Number of records per page                           |
| username   | string | Filter users by username (case-sensitive)            |
| fullname   | string | Filter users by full name (case-insensitive)         |
| role       | string | Filter users by role (`superadmin`, `admin`, `user`) |
| gender     | string | Filter users by gender (`male`, `female`)            |
| created_at | string | Sort users by creation date (`ASC`, `DESC`)          |
| updated_at | string | Sort users by update date (`ASC`, `DESC`)            |

#### Response

- **Success Response**

  - **Code**: `200 OK`
  - **Content-type**: `application/json`
  - **Content**:
    ```json
    {
      "message": "OK",
      "data": {
        "users": {
          "current_page": 1,
          "data_count_on_current_page": 5,
          "total_data_count": 10,
          "total_pages": 2,
          "records": [
            {
              "username": "john_doe",
              "fullname": "John Doe",
              "gender": "male",
              "photo_url": "https://example.com/photo.jpg",
              "created_at": "2023-05-21T10:00:00Z",
              "updated_at": "2023-05-21T10:30:00Z"
            },
            ...
          ]
        }
      }
    }
    ```

- **Error Response**
  - **Code**: `400 BAD_REQUEST`
  - **Content-type**: `application/json`
    - **Content**:
      - When `page` is not an integer:
        ```json
        {
          "error": {
            "attribute": "pagination",
            "message": "page must be an integer"
          }
        }
        ```
      - When `size` is not an integer:
        ```json
        {
          "error": {
            "attribute": "pagination",
            "message": "size must be an integer"
          }
        }
        ```

### Request Example

- **GET** `{{base_url}}/users?page=1&size=5&username=john&role=user&created_at=DESC`

---

### Update User Photo

Update the photo of a user.

- **URL**: `/users/profile_photo/:username`
- **Method**: `PUT`
- **Content Type**: `multipart/form-data`

#### Request Parameters

| Parameter | Type   | Description                                          |
| --------- | ------ | ---------------------------------------------------- |
| username  | string | The username of the user to update the photo for.    |
| image     | file   | The image file to be uploaded as the new user photo. |

- note:
- `image` can only contains 1 file in `.jpg/.jpeg/.png` format
- `image` file must be less than `10 MB`

#### Query Parameters

| Parameter | Type    | Description                                                       |
| --------- | ------- | ----------------------------------------------------------------- |
| delete    | boolean | (Optional) If set to `true`, deletes the user photo if it exists. |

#### Response

- **Success Response**

  - **Code**: `204 NO_CONTENT`
  - **Content-type**: `application/json`
  - **Content**:
    ```json
    {
      "message": "NO_CONTENT",
      "data": {
        "user_photos": null
      }
    }
    ```

- **Error Response**
  - **Code**: `400 BAD_REQUEST`
  - **Content-type**: `application/json`
    - **Content**:
      - When the photo already exists:
        ```json
        {
          "error": {
            "attribute": "photo",
            "message": "photo already exists"
          }
        }
        ```
  - **Code**: `404 NOT_FOUND`
  - **Content-type**: `application/json`
    - **Content**:
      - When the user is not found:
        ```json
        {
          "error": {
            "attribute": "user",
            "message": "user not found"
          }
        }
        ```
      - When there is no photo to delete:
        ```json
        {
          "error": {
            "attribute": "photo",
            "message": "no photo to be deleted"
          }
        }
        ```

### Request Example

- **PUT** `/users/john_doe?delete=true`
- **Content-Type:** `multipart/form-data`

---
