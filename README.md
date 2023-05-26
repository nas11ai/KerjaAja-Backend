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
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "username": "username must not be blank"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `username` has been taken:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "username": "username has been taken"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `fullname` is blank:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "fullname": "fullname must not be blank"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `role` is blank:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "role": "role must not be blank"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `password` is blank:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "password": "password must not be blank"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `gender` is blank:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "gender": "gender must not be blank"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
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
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "username": "username is wrong"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `password` is wrong:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "password": "password is wrong"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
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

## Get Existing Users

Retrieve existing users based on the provided query parameters.

- **URL**: `{{base_url}}}/users/read`
- **Method**: `GET`

### Query Parameters for Filtering

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
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "page": "page must be integer"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `size` is not an integer:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "size": "size must be integer"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```

### Request Example

- **GET** `{{base_url}}/users/read?page=1&size=5&username=john&role=user&created_at=DESC`

---

## Update User Photo

Update the photo of a user.

- **URL**: `/users/profile_photo/:username`
- **Method**: `PUT`
- **Content Type**: `multipart/form-data`

### Request Parameters

| Parameter | Type   | Description                                          |
| --------- | ------ | ---------------------------------------------------- |
| username  | string | The username of the user to update the photo for.    |
| image     | file   | The image file to be uploaded as the new user photo. |

- note:
- `image` can only contains 1 file in `.jpg/.jpeg/.png` format
- `image` file must be less than `10 MB`

### Query Parameters

| Parameter | Type    | Description                                                       |
| --------- | ------- | ----------------------------------------------------------------- |
| delete    | boolean | (Optional) If set to `true`, deletes the user photo if it exists. |

### Response

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
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "photo": "photo already exists"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
  - **Code**: `404 NOT_FOUND`
  - **Content-type**: `application/json`
    - **Content**:
      - When the user is not found:
        ```json
        {
          "code": 404,
          "status": "NOT_FOUND",
          "errors": {
            "user": "user is not found"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When there is no photo to delete:
        ```json
        {
          "code": 404,
          "status": "NOT_FOUND",
          "errors": {
            "photo": "no photo to be deleted"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```

### Request Example

- **PUT** `/users/profile_photo/john_doe?delete=true`
- **Content-Type:** `multipart/form-data`

---

## Change User Password

Change the password of a user.

- **URL**: `/users/change_password/:username`
- **Method**: `PUT`
- **Content-type**: `application/x-www-form-urlencoded`

### Request Parameters

| Parameter | Type   | Description                                          |
| --------- | ------ | ---------------------------------------------------- |
| username  | string | The username of the user to change the password for. |

### Request Body

| Field        | Type   | Description                    |
| ------------ | ------ | ------------------------------ |
| new_password | string | The new password for the user. |

### Response

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
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "new_password": "new_password must not be blank"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the `new_password` field is not a string:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "new_password": "new_password must be string"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
  - **Code**: `404 NOT_FOUND`
    - **Content**:
      - When the user is not found:
        ```json
        {
          "code": 404,
          "status": "NOT_FOUND",
          "errors": {
            "user": "user is not found"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
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

## Change User Username

Change the username of a user.

- **URL**: `/users/change_username/:username`
- **Method**: `PUT`
- **Content-type**: `application/x-www-form-urlencoded`

### Request Parameters

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| username  | string | The username of the user to change. |

### Request Body

| Field        | Type   | Description                    |
| ------------ | ------ | ------------------------------ |
| new_username | string | The new username for the user. |

### Response

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
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "new_username": "new_username must not be blank"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the `new_username` field is not a string:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "new_username": "new_username must be string"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
  - **Code**: `404 NOT_FOUND`
  - **Content-type**: `application/json`
    - **Content**:
      - When the user is not found:
        ```json
        {
          "code": 404,
          "status": "NOT_FOUND",
          "errors": {
            "user": "user is not found"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
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

## Verify User Password

Verify if the provided password matches the user's password.

- **URL**: `/users/verify_password/:username`
- **Method**: `POST`
- **Content-type**: `application/x-www-form-urlencoded`

### Request Parameters

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| username  | string | The username of the user to verify. |

### Request Body

| Field            | Type   | Description                                             |
| ---------------- | ------ | ------------------------------------------------------- |
| checked_password | string | The password to be checked against the user's password. |

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
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "checked_password": "checked_password must not be blank"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the `checked_password` field is not a string:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "checked_password": "checked_password must be string"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the provided password does not match the user's password:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "checked_password": "checked_password is wrong"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
  - **Code**: `404 NOT_FOUND`
  - **Content-type**: `application/json`
    - **Content**:
      - When the user is not found:
        ```json
        {
          "code": 404,
          "status": "NOT_FOUND",
          "errors": {
            "user": "user is not found"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
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
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "sender_username": "sender_username must not be blank"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the `sender_username` is not found:
        ```json
        {
          "code": 404,
          "status": "NOT_FOUND",
          "errors": {
            "sender_username": "sender_username is not found"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the `receiver_username` field is blank:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "receiver_username": "receiver_username must not be blank"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the `receiver_username` is not found:
        ```json
        {
          "code": 404,
          "status": "NOT_FOUND",
          "errors": {
            "receiver_username": "receiver_username is not found"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the `receiver_username` is the same as the `sender_username`:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "user_recommendations": "receiver_username must not be the same as sender_username"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the `rating` field is blank:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "rating": "rating must not be blank"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the `rating` is not a number:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "rating": "rating must be number"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the `rating` is not between 1 and 5:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "rating": "rating must be between 1 to 5"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When a recommendation between the same sender and receiver already exists:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "rating": "rating between { sender_username: <sender_username> } to { receiver_username: <receiver_username> } already exists"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
  - **Code**: `404 NOT_FOUND`
  - **Content-type**: `application/json`
    - **Content**:
      - When the sender username is not found:
        ```json
        {
          "code": 404,
          "status": "NOT_FOUND",
          "errors": {
            "sender_username": "sender_username is not found"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the receiver username is not found:
        ```json
        {
          "code": 404,
          "status": "NOT_FOUND",
          "errors": {
            "receiver_username": "receiver_username is not found"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
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

## Get Existing User Recommendations

Retrieve existing user recommendations with optional filtering and pagination.

- **URL**: `/user_recommendations/read`
- **Method**: `GET`

### Request Parameters

None.

### Request Query Parameters

| Parameter         | Type   | Description                                         |
| ----------------- | ------ | --------------------------------------------------- |
| page              | number | The page number for pagination (default: 1).        |
| size              | number | The number of records per page (default: 25).       |
| rating            | string | The sorting order for rating (`ASC` or `DESC`).     |
| rating_from       | number | The minimum rating value to filter by.              |
| rating_to         | number | The maximum rating value to filter by.              |
| receiver_username | string | The username of the receiver to filter by.          |
| sender_username   | string | The username of the sender to filter by.            |
| created_at        | string | The sorting order for created_at (`ASC` or `DESC`). |
| updated_at        | string | The sorting order for updated_at (`ASC` or `DESC`). |

### Response

- **Success Response**

  - **Code**: `200 OK`
  - **Content-type**: `application/json`
  - **Content**:
    ```json
    {
      "message": "OK",
      "data": {
        "type": "user_recommendations",
        "attributes": {
          "current_page": 1,
          "data_count_on_current_page": 10,
          "total_data_count": 100,
          "total_pages": 10,
          "records": [
            {
              "rating": 4,
              "description": "Great user recommendation",
              "created_at": "2023-05-22T10:30:00.000Z",
              "updated_at": "2023-05-22T10:30:00.000Z",
              "sender": {
                "username": "john_doe"
              },
              "receiver": {
                "username": "jane_smith"
              }
            }
            // ...
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
      - When the `page` parameter is not a number:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "page": "page must be number"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the `size` parameter is not a number:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "size": "size must be number"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
  - **Code**: `404 NOT_FOUND`
    - **Content**:
      - When the receiver username is not found:
        ```json
        {
          "code": 404,
          "status": "NOT_FOUND",
          "errors": {
            "receiver_username": "receiver_username is not found"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the sender username is not found:
        ```json
        {
          "code": 404,
          "status": "NOT_FOUND",
          "errors": {
            "sender_username": "sender_username is not found"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```

### Request Example

- **GET** `{{base_url}}/user_recommendations?rating=DESC&receiver_username=jane_smith&page=1&size=10`

---

## Update Existing User Recommendation

Update an existing user recommendation.

- **URL**: `/user_recommendations/update/:sender_username?receiver_username=<insert receiver here>`
- **Method**: `PUT`
- **Content-type**: `application/x-www-form-urlencoded`

### Query Parameters

| Parameter         | Type   | Description                                                   |
| ----------------- | ------ | ------------------------------------------------------------- |
| receiver_username | string | (Required) The receiver's username who get the recommendation |

### Request Parameters

| Parameter       | Type   | Description                 |
| --------------- | ------ | --------------------------- |
| sender_username | string | The username of the sender. |

### Request Body

The request body should be a JSON object with the following properties:

| Property    | Type   | Description                                       |
| ----------- | ------ | ------------------------------------------------- |
| rating      | number | The new rating value for the user recommendation. |
| description | string | The new description for the user recommendation.  |

### Response

- **Success Response**

  - **Code**: `204 No Content`
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
  - **Code**: `400 Bad Request`
  - **Content-type**: `application/json`
    - **Content**:
      - When the `receiver_username` is missing or blank:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "receiver_username": "receiver_username must not be blank"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the `rating` and `description` is missing:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "user_recommendation": "rating and description must be available"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the `rating` is not a number:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "rating": "rating must be number"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the `rating` is not between 1 and 5:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "rating": "rating must be between 1 to 5"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
  - **Code**: `404 Not Found`
  - **Content-type**: `application/json`
    - **Content**:
      - When the receiver username is not found:
        ```json
        {
          "code": 404,
          "status": "NOT_FOUND",
          "errors": {
            "receiver_username": "receiver_username is not found"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the sender username is not found:
        ```json
        {
          "code": 404,
          "status": "NOT_FOUND",
          "errors": {
            "sender_username": "sender_username is not found"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the user recommendation is not found:
        ```json
        {
          "code": 404,
          "status": "NOT_FOUND",
          "errors": {
            "user_recommendation": "user_recommendation is not found"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```

### Request Example

- **Content-type**: `application/x-www-form-urlencoded`
- **URL**: `{{base_url}}/user_recommendations/update/john_doe?receiver_username=jane_smith`

| Field       | Input Example |
| ----------- | ------------- |
| rating      | 5             |
| description | hot           |

---

## Delete Existing User Recommendation

Delete an existing user recommendation.

- **URL**: `/user_recommendations/delete/:sender_username`
- **Method**: `DELETE`

### Request Parameters

| Parameter                    | Type   | Description                  |
| ---------------------------- | ------ | ---------------------------- |
| sender_username              | string | The username of the sender.  |
| receiver_username (optional) | string | The username of the receiver |

### Response

- **Success Response**

  - **Code**: `204 No Content`
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
  - **Code**: `404 Not Found`
  - **Content-type**: `application/json`
    - **Content**:
      - When the sender username is not found:
        ```json
        {
          "code": 404,
          "status": "NOT_FOUND",
          "errors": {
            "sender_username": "sender_username is not found"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the receiver username is not found:
        ```json
        {
          "code": 404,
          "status": "NOT_FOUND",
          "errors": {
            "receiver_username": "receiver_username is not found"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the user recommendation is not found:
        ```json
        {
          "code": 404,
          "status": "NOT_FOUND",
          "errors": {
            "user_recommendation": "user_recommendation is not found"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```

### Request Example

- **DELETE** `{{base_url}}/user_recommendations/delete/john_doe?receiver_username=jane_smith`

---

# Project Category

## Create New Project Category

Create a new project category.

- **URL**: `/project_categories/create`
- **Method**: `POST`
- **Content-type**: `application/x-www-form-urlencoded`

### Request Body

| Parameter | Type   | Description               |
| --------- | ------ | ------------------------- |
| name      | string | The name of the category. |

### Response

- **Success Response**

  - **Code**: `201 Created`
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

  - **Code**: `400 Bad Request`
  - **Content-type**: `application/json`

    - **Content**:

      - When the category name is blank:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "name": "project_categories name must not be blank"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the category name is not a string or null:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "name": "project_categories name must be a string, project_categories name must not be null"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the category name already exists:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "name": "project_categories name already exist"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```

### Request Example

- **Content-type**: `application/x-www-form-urlencoded`
- **URL**: `{{base_url}}/project_categories/create`

| Field | Input Example   |
| ----- | --------------- |
| name  | Web Development |

---

## Get Existing Project Categories

Retrieve existing project categories with optional pagination and sorting.

- **URL**: `/project_categories/read`
- **Method**: `GET`

### Query Parameters

| Parameter  | Type   | Description                                             |
| ---------- | ------ | ------------------------------------------------------- |
| page       | number | The page number for pagination.                         |
| size       | number | The number of items per page.                           |
| name       | string | Sort by name in ascending or descending order.          |
| created_at | string | Sort by creation date in ascending or descending order. |
| updated_at | string | Sort by update date in ascending or descending order.   |

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
        "type": "project_categories",
        "attributes": {
          "current_page": 1,
          "data_count_on_current_page": 5,
          "total_data_count": 5,
          "total_pages": 1,
          "records": [
            {
              "name": "Web Development",
              "created_at": "2023-05-23T22:30:30.000Z",
              "updated_at": "2023-05-23T22:30:30.000Z"
            },
            {
              "name": "Programming",
              "created_at": "2023-05-24T05:42:09.000Z",
              "updated_at": "2023-05-24T05:42:09.000Z"
            },
            {
              "name": "IOS Development",
              "created_at": "2023-05-24T05:35:20.000Z",
              "updated_at": "2023-05-24T05:35:20.000Z"
            },
            {
              "name": "Android Development",
              "created_at": "2023-05-24T05:35:13.000Z",
              "updated_at": "2023-05-24T05:35:13.000Z"
            },
            {
              "name": "Mobile Development",
              "created_at": "2023-05-24T22:23:56.000Z",
              "updated_at": "2023-05-24T22:23:56.000Z"
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

  - **Code**: `400 Bad Request`
  - **Content-type**: `application/json`

    - **Content**:

      - When the page parameter is not an integer:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "attribute": "pagination",
            "message": "page must be an integer"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the size parameter is not an integer:

        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "attribute": "pagination",
            "message": "size must be an integer"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```

### Request Example

- **GET** `{{base_url}}/project_categories/read?name=Programming`

---

### Update Existing Project Category

Update an existing project category.

- **URL**: `/project_categories/update/:category_name`
- **Method**: `PUT`
- **Content-type**: `application/x-www-form-urlencoded`

#### Path Parameters

| Parameter     | Type   | Description                                 |
| ------------- | ------ | ------------------------------------------- |
| category_name | string | The name of the project category to update. |

#### Request Body

| Field    | Type   | Description                            |
| -------- | ------ | -------------------------------------- |
| new_name | string | The new name for the project category. |

#### Response

- **Success Response**

  - **Code**: `204 No Content`
  - **Content-type**: `application/json`
  - **Content**:
    ```json
    {
      "code": 204,
      "status": "NO_CONTENT",
      "data": {
        "type": "project_categories",
        "attribute": null
      },
      "meta": {
        "version": "<API_VERSION>",
        "timestamp": "<Current Timestamp>"
      }
    }
    ```

- **Error Response**

  - **Code**: `400 Bad Request`
  - **Content-type**: `application/json`

    - **Content**:

      - When the `new_name` field is blank:

        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "attribute": "new_name",
            "message": "project_categories new_name must not be blank"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```

      - When the `new_name` field is not a string:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "attribute": "new_name",
            "message": [
              "project_categories new_name must be a string",
              "project_categories new_name must not be null"
            ]
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the project category with the specified name does not exist:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "attribute": "category_name",
            "message": "project_categories name not found"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the `new_name` is already taken by another project category:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "attribute": "new_name",
            "message": "project_categories new_name has been taken"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```

### Request Example

- **PUT**: `{{base_url}}/project_categories/update/Mobile%20Development`
- **Content-type**: `application/x-www-form-urlencoded`

| Field    | Input Example   |
| -------- | --------------- |
| new_name | IOS Development |

---
