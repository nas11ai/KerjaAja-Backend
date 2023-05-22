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
      "code": 201,
      "status": "CREATED",
      "data": {
        "type": "users",
        "attribute": null
      },
      "meta": {
        "version": "<API_VERSION>",
        "timestamp": "<Current Timestamp>"
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
      "code": 200,
      "status": "OK",
      "data": {
        "type": "bearer_token",
        "attribute": {
          "user_role": "user",
          "access_token": "generated_access_token"
        }
      },
      "meta": {
        "version": "<API_VERSION>",
        "timestamp": "<Current Timestamp>"
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
      "code": 200,
      "status": "OK",
      "data": {
        "type": "users",
        "attributes": {
          "current_page": 1,
          "data_count_on_current_page": 2,
          "total_data_count": 2,
          "total_pages": 1,
          "records": [
            {
              "username": "root",
              "fullname": "Capstone Admin",
              "gender": "male",
              "photo_url": "static/user_profile_photo/root/root_2023-05-21-11-47-57_ayaya.jpg",
              "created_at": "2023-05-20T15:21:14.000Z",
              "updated_at": "2023-05-22T10:08:25.000Z"
            },
            {
              "username": "female_root",
              "fullname": "Female Capstone Admin",
              "gender": "female",
              "photo_url": null,
              "created_at": "2023-05-21T12:38:38.000Z",
              "updated_at": "2023-05-21T12:38:38.000Z"
            }
          ]
        }
      },
      "meta": {
        "version": "<API_VERSION>",
        "timestamp": "<Current Timestamp>"
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

- **GET** `{{base_url}}/users/read?page=1&size=5&username=john&role=user&created_at=DESC`

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
      "code": 204,
      "status": "NO_CONTENT",
      "data": {
        "type": "users",
        "attribute": null
      },
      "meta": {
        "version": "<API_VERSION>",
        "timestamp": "<Current Timestamp>"
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

- **PUT** `/users/profile_photo/john_doe?delete=true`
- **Content-Type:** `multipart/form-data`

---

### Change User Password

Change the password of a user.

- **URL**: `/users/change_password/:username`
- **Method**: `PUT`
- **Content-type**: `application/x-www-form-urlencoded`

#### Request Parameters

| Parameter | Type   | Description                                          |
| --------- | ------ | ---------------------------------------------------- |
| username  | string | The username of the user to change the password for. |

#### Request Body

| Field        | Type   | Description                    |
| ------------ | ------ | ------------------------------ |
| new_password | string | The new password for the user. |

#### Response

- **Success Response**

  - **Code**: `204 NO_CONTENT`
  - **Content-type**: `application/json`
  - **Content**:
    ```json
    {
      "code": 204,
      "status": "NO_CONTENT",
      "data": {
        "type": "users",
        "attribute": null
      },
      "meta": {
        "version": "<API_VERSION>",
        "timestamp": "<Current Timestamp>"
      }
    }
    ```

- **Error Response**
  - **Code**: `400 BAD_REQUEST`
  - **Content-type**: `application/json`
    - **Content**:
      - When the `new_password` field is blank:
        ```json
        {
          "error": {
            "attribute": "new_password",
            "message": "new_password must not be blank"
          }
        }
        ```
      - When the `new_password` field is not a string:
        ```json
        {
          "error": {
            "attribute": "new_password",
            "message": "new_password must be a string"
          }
        }
        ```
  - **Code**: `404 NOT_FOUND`
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

### Request Example

---

- **PUT** `{{base_url}}/users/change_password/john_doe`
- **Content-type**: `application/x-www-form-urlencoded`

| Field        | Input Example |
| ------------ | ------------- |
| new_password | tes1          |

---

### Change User Username

Change the username of a user.

- **URL**: `/users/change_username/:username`
- **Method**: `PUT`
- **Content-type**: `application/x-www-form-urlencoded`

#### Request Parameters

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| username  | string | The username of the user to change. |

#### Request Body

| Field        | Type   | Description                    |
| ------------ | ------ | ------------------------------ |
| new_username | string | The new username for the user. |

#### Response

- **Success Response**

  - **Code**: `204 NO_CONTENT`
  - **Content-type**: `application/json`
  - **Content**:
    ```json
    {
      "code": 204,
      "status": "NO_CONTENT",
      "data": {
        "type": "users",
        "attribute": null
      },
      "meta": {
        "version": "<API_VERSION>",
        "timestamp": "<Current Timestamp>"
      }
    }
    ```

- **Error Response**
  - **Code**: `400 BAD_REQUEST`
  - **Content-type**: `application/json`
    - **Content**:
      - When the `new_username` field is blank:
        ```json
        {
          "error": {
            "attribute": "new_username",
            "message": "new_username must not be blank"
          }
        }
        ```
      - When the `new_username` field is not a string:
        ```json
        {
          "error": {
            "attribute": "new_username",
            "message": "new_username must be a string"
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

### Request Example

- **PUT** `{{base_url}}/users/change_username/john_doe`
- **Content-type**: `application/x-www-form-urlencoded`

| Field        | Input Example |
| ------------ | ------------- |
| new_username | toor          |

---

## API Endpoints

### Verify User Password

Verify if the provided password matches the user's password.

- **URL**: `/users/verify_password/:username`
- **Method**: `POST`
- **Content-type**: `application/x-www-form-urlencoded`

#### Request Parameters

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| username  | string | The username of the user to verify. |

#### Request Body

| Field            | Type   | Description                                             |
| ---------------- | ------ | ------------------------------------------------------- |
| checked_password | string | The password to be checked against the user's password. |

#### Response

- **Success Response**

  - **Code**: `200 OK`
  - **Content-type**: `application/json`
  - **Content**:
    ```json
    {
      "code": 200,
      "status": "OK",
      "data": {
        "type": "users",
        "attribute": null
      },
      "meta": {
        "version": "<API_VERSION>",
        "timestamp": "<Current Timestamp>"
      }
    }
    ```

- **Error Response**
  - **Code**: `400 BAD_REQUEST`
    - **Content**:
      - When the `checked_password` field is blank:
        ```json
        {
          "error": {
            "attribute": "checked_password",
            "message": "checked_password must not be blank"
          }
        }
        ```
      - When the `checked_password` field is not a string:
        ```json
        {
          "error": {
            "attribute": "checked_password",
            "message": "checked_password must be a string"
          }
        }
        ```
      - When the provided password does not match the user's password:
        ```json
        {
          "error": {
            "attribute": "checked_password",
            "message": "checked_password is wrong"
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

### Request Example

- **PUT**: `{{base_url}}/users/verify_password/john_doe`
- **Content-type**: `application/x-www-form-urlencoded`

| Field            | Input Example |
| ---------------- | ------------- |
| checked_password | root          |

---

# User Recommendation

## Create New User Recommendation

Create a new user recommendation.

- **URL**: `/user_recommendations/create`
- **Method**: `POST`
- **Content-type**: `application/x-www-form-urlencoded`

### Request Body

| Field             | Type   | Description                                                          |
| ----------------- | ------ | -------------------------------------------------------------------- |
| sender_username   | string | The username of the user giving the recommendation.                  |
| receiver_username | string | The username of the user receiving the recommendation.               |
| rating            | number | The rating given by the sender (between 1 and 5).                    |
| description       | string | (Optional) Additional description or comment for the recommendation. |

### Response

- **Success Response**

  - **Code**: `201 CREATED`
  - **Content-type**: `application/json`
  - **Content**:
    ```json
    {
      "code": 201,
      "status": "CREATED",
      "data": {
        "type": "user_recommendations",
        "attribute": null
      },
      "meta": {
        "version": "<API_VERSION>",
        "timestamp": "<Current Timestamp>"
      }
    }
    ```

- **Error Response**
  - **Code**: `400 BAD_REQUEST`
  - **Content-type**: `application/json`
    - **Content**:
      - When the `sender_username` field is blank:
        ```json
        {
          "error": {
            "attribute": "sender_username",
            "message": "sender_username must not be blank"
          }
        }
        ```
      - When the `sender_username` is not found:
        ```json
        {
          "error": {
            "attribute": "sender_username",
            "message": "sender_username not found"
          }
        }
        ```
      - When the `receiver_username` field is blank:
        ```json
        {
          "error": {
            "attribute": "receiver_username",
            "message": "receiver_username must not be blank"
          }
        }
        ```
      - When the `receiver_username` is not found:
        ```json
        {
          "error": {
            "attribute": "receiver_username",
            "message": "receiver_username not found"
          }
        }
        ```
      - When the `receiver_username` is the same as the `sender_username`:
        ```json
        {
          "error": {
            "attribute": "user_recommendations",
            "message": "receiver_username must not be the same as sender_username"
          }
        }
        ```
      - When the `rating` field is blank:
        ```json
        {
          "error": {
            "attribute": "rating",
            "message": "rating must not be blank"
          }
        }
        ```
      - When the `rating` is not a number:
        ```json
        {
          "error": {
            "attribute": "rating",
            "message": "rating must be a number"
          }
        }
        ```
      - When the `rating` is not between 1 and 5:
        ```json
        {
          "error": {
            "attribute": "rating",
            "message": "rating must be between 1 to 5"
          }
        }
        ```
      - When a recommendation between the same sender and receiver already exists:
        ```json
        {
          "error": {
            "attribute": "rating",
            "message": "rating between { sender_username: <sender_username> } to { receiver_username: <receiver_username> } already exists"
          }
        }
        ```
  - **Code**: `404 NOT_FOUND`
  - **Content-type**: `application/json`
    - **Content**:
      - When the sender username is not found:
        ```json
        {
          "error": {
            "attribute": "sender_username",
            "message": "sender_username not found"
          }
        }
        ```
      - When the receiver username is not found:
        ```json
        {
          "error": {
            "attribute": "receiver_username",
            "message": "receiver_username not found"
          }
        }
        ```

### Request Example

- **PUT**: `{{base_url}}/user_recommendations/create`
- **Content-type**: `application/x-www-form-urlencoded`

| Field             | Input Example |
| ----------------- | ------------- |
| sender_username   | toor          |
| receiver_username | root          |
| rating            | 5             |
| description       | hot           |

---
