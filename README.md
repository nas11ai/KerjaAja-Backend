# KerjaAja API Documentation

This API is made with:

1. Express.js
2. MySQL
3. Sequelize

## API Version

- 1.0

## Base URL

- Development: https://kerjaaja-backend-production.up.railway.app

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
            "message": "username must not be blank"
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
            "message": "username has been taken"
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
            "message": "fullname must not be blank"
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
            "message": "role must not be blank"
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
            "message": "password must not be blank"
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
            "message": "gender must not be blank"
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
            "message": "username is wrong"
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
            "message": "password is wrong"
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
            "message": "page must be integer"
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
            "message": "size must be integer"
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
            "message": "photo already exists"
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
            "message": "user is not found"
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
            "message": "no photo to be deleted"
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
            "message": "new_password must not be blank"
          },
          "meta": {
            "version": "<API_VERSION>",
            "message": "<Current Timestamp>"
          }
        }
        ```
      - When the `new_password` field is not a string:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "new_password must be string"
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
            "message": "user is not found"
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
            "message": "new_username must not be blank"
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
            "message": "new_username must be string"
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
            "message": "user is not found"
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
            "message": "checked_password must not be blank"
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
            "message": "checked_password must be string"
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
            "message": "checked_password is wrong"
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
            "message": "user is not found"
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
            "message": "sender_username must not be blank"
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
            "message": "sender_username is not found"
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
            "message": "receiver_username must not be blank"
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
            "message": "receiver_username is not found"
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
            "message": "receiver_username must not be the same as sender_username"
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
            "message": "rating must not be blank"
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
            "message": "rating must be number"
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
            "message": "rating must be between 1 to 5"
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
            "message": "rating between { sender_username: <sender_username> } to { receiver_username: <receiver_username> } already exists"
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
            "message": "sender_username is not found"
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
            "messsage": "receiver_username is not found"
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
              "message": 4,
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
            "message": "page must be number"
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
            "message": "size must be number"
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
            "message": "receiver_username is not found"
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
            "message": "sender_username is not found"
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
            "message": "receiver_username must not be blank"
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
            "message": "rating and description must be available"
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
            "message": "rating must be number"
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
            "message": "rating must be between 1 to 5"
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
            "message": "receiver_username is not found"
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
            "message": "sender_username is not found"
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
            "message": "user_recommendation is not found"
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
            "message": "sender_username is not found"
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
            "message": "receiver_username is not found"
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
            "message": "user_recommendation is not found"
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
- **Content-Type**: `multipart/form-data`

### Request Body

| Parameter | Type   | Description                                       |
| --------- | ------ | ------------------------------------------------- |
| name      | string | The name of the category.                         |
| image     | file   | The image file representing the project category. |

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

      - When the image field is blank:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "photo must not be blank"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the category name is blank:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "project_categories name must not be blank"
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
            "message": "project_categories name must be a string, project_categories name must not be null"
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
            "message": "project_categories name already exist"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```

### Request Example

- **Content-Type**: `multipart/form-data`
- **URL**: `{{base_url}}/project_categories/create`

| Field | Input Example   |
| ----- | --------------- |
| name  | Web Development |
| image | file            |

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
              "name": "Android Development",
              "photo_url": "static/project_category_photo/Android Development/Android Development_2023-05-26-10-30-57_Android-App-Development-2.jpg",
              "created_at": "2023-05-26T02:30:59.000Z",
              "updated_at": "2023-05-26T02:30:59.000Z"
            },
            {
              "name": "IOS Development",
              "photo_url": "static/project_category_photo/IOS Development/IOS Development_2023-05-26-10-22-00_ios-training.png",
              "created_at": "2023-05-26T02:22:00.000Z",
              "updated_at": "2023-05-26T02:22:00.000Z"
            },
            {
              "name": "Web Development",
              "photo_url": "static/project_category_photo/Web Development/Web Development_2023-05-26-10-24-04_web-development.jpeg",
              "created_at": "2023-05-26T02:24:06.000Z",
              "updated_at": "2023-05-26T02:24:06.000Z"
            },
            {
              "name": "Programming",
              "photo_url": "static/project_category_photo/Programming/Programming_2023-05-26-10-32-36_main-image.png",
              "created_at": "2023-05-26T02:32:38.000Z",
              "updated_at": "2023-05-26T02:32:38.000Z"
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
- **Content-Type**: `multipart/form-data`

#### Path Parameters

| Parameter     | Type   | Description                                 |
| ------------- | ------ | ------------------------------------------- |
| category_name | string | The name of the project category to update. |

#### Request Body

| Field    | Type   | Description                                                             |
| -------- | ------ | ----------------------------------------------------------------------- |
| new_name | string | The new name for the project category.                                  |
| image    | file   | (Optional) The new image file representing the updated project category |

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

      - When the `request_body` field is blank:

        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "project_categories request_body must not be blank"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```

      - When the image file is missing:

        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "photo must not be blank"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```

      - When the `new_name` field is blank:

        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
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
- **Content-Type**: `multipart/form-data`

| Field    | Input Example   |
| -------- | --------------- |
| new_name | IOS Development |
| image    | file            |

---

## Delete Existing Project Category

Delete an existing project category.

- **URL**: `/project_categories/delete/:category_name`
- **Method**: `DELETE`

### Request Parameters

| Parameter     | Type   | Description                                |
| ------------- | ------ | ------------------------------------------ |
| category_name | string | The name of the project category to delete |

### Response

- **Success Response**

  - **Code**: `204 No Content`
  - **Content-Type**: `application/json`
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
  - **Code**: `404 Not Found`
  - **Content-Type**: `application/json`
    - **Content**:
      ```json
      {
        "code": 404,
        "status": "NOT_FOUND",
        "errors": {
          "message": "category_name not found"
        },
        "meta": {
          "version": "<API_VERSION>",
          "timestamp": "<Current Timestamp>"
        }
      }
      ```

### Request Example

- **DELETE**: `{{base_url}}/project_categories/delete/Mobile%20Development`

---

# Project

### Create New Project

Create a new project.

- **URL**: `/projects/create`
- **Method**: `POST`
- **Content-type**: `application/x-www-form-urlencoded`

#### Request Body

| Parameter        | Type   | Description                                           |
| ---------------- | ------ | ----------------------------------------------------- |
| title            | string | The title of the project                              |
| status           | string | The status of the project (Open, In Progress, Closed) |
| project_fee      | number | The fee for the project (optional)                    |
| deadline         | string | The deadline of the project in 'YYYY-MM-DD' format    |
| owner_username   | string | The username of the owner of the project              |
| region_latitude  | number | The latitude of the project region                    |
| region_longitude | number | The longitude of the project region                   |
| category_list    | string | A stringified JSON array of project categories        |

#### Response

- **Success Response**

  - **Code**: `201 Created`
  - **Content-type**: `application/json`
  - **Content**:
    ```json
    {
      "code": 201,
      "status": "CREATED",
      "data": {
        "type": "projects",
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

      - When `title` is empty:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "title must not be empty"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `status` is empty:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "status must not be empty"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `status` is not between "Open", "In Progress", or "Closed":
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "status value must be between 'Open' or 'In Progress' or 'Closed'"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `project_fee` is not number:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "project_fee must be a number"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `project_fee` is less than 0:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "project_fee must not be less than 0"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `deadline` is empty:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "deadline must not be empty"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `deadline` is not in "YYYY-MM-DD" format:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "deadline must be within 'YYYY-MM-DD' format"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `category_list` is not an array:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "category_list must be a string of array"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `category_list` is empty:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "category_list must not be empty"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `region_latitude` is empty:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "region_latitude must not be empty"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `region_latitude` is not a number:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "region_latitude must be a number"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `region_longitude` is empty:

        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "region_longitude must not be empty"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```

      - When `region_longitude` is not a number:

        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "region_longitude must be a number"
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
    - When the specified `owner_username` is not found:
      ```json
      {
        "code": 404,
        "status": "NOT_FOUND",
        "errors": {
          "message": "owner_username not found"
        },
        "meta": {
          "version": "<API_VERSION>",
          "timestamp": "<Current Timestamp>"
        }
      }
      ```
      - When a project category in the `category_list` is not found:
        ```json
        {
          "code": 404,
          "status": "NOT_FOUND",
          "errors": {
            "message": "category_list item: <category_name> not found"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```

### Request Example

- **POST** `{{base_url}}/projects/create`
- **Content-Type:** `application/x-www-form-urlencoded`

| Field            | Input Example                                                                             |
| ---------------- | ----------------------------------------------------------------------------------------- |
| title            | Tolong buatkan saya Moodle versi mobile untuk sekolah A yang bisa diakses android dan ios |
| status           | Open                                                                                      |
| project_fee      | 100000000                                                                                 |
| deadline         | 2023-10-01                                                                                |
| owner_username   | root                                                                                      |
| region_latitude  | -1.1404097541004128                                                                       |
| region_longitude | 116.86331762187554                                                                        |
| category_list    | ["Android Development", "IOS Development"]                                                |

---

## Get Existing Project

Retrieve existing projects based on specific query parameters.

- **URL**: `/projects/read`
- **Method**: `POST`

### Query Parameters for Filtering

| Parameter      | Type   | Description                                                                                     |
| -------------- | ------ | ----------------------------------------------------------------------------------------------- |
| page           | number | Current page number                                                                             |
| size           | number | Number of records per page                                                                      |
| id             | uuid   | The ID of the project to retrieve                                                               |
| status         | string | Filter projects by status. Allowed values: `Open`, `In Progress`, `Closed`                      |
| fee            | string | Sort projects by fee. Allowed values: `ASC` (ascending), `DESC` (descending)                    |
| fee_from       | number | Filter projects with a fee greater than or equal to the specified value                         |
| fee_to         | number | Filter projects with a fee less than or equal to the specified value                            |
| category_names | string | Filter projects by category names. Accepts a single category name or an array of category names |
| created_at     | string | Sort users by creation date (`ASC`, `DESC`)                                                     |
| updated_at     | string | Sort users by update date (`ASC`, `DESC`)                                                       |

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
        "type": "projects",
        "attributes": {
          "current_page": 1,
          "data_count_on_current_page": 1,
          "total_data_count": 2,
          "total_pages": 1,
          "records": [
            {
              "fee": "Rp100000000",
              "id": "e5f8db8b-8969-4abf-b48d-3c099ed28a73",
              "title": "Tolong buatkan saya Moodle versi mobile untuk sekolah A yang bisa diakses android dan ios",
              "status": "Open",
              "deadline": "2023-10-01",
              "latitude": -1.140409754100413,
              "longitude": 116.86331762187554,
              "created_at": "2023-05-26T02:44:36.000Z",
              "updated_at": "2023-05-26T02:44:36.000Z",
              "owner": {
                "username": "root"
              },
              "categories": [
                {
                  "created_at": "2023-05-26T02:44:38.000Z",
                  "updated_at": "2023-05-26T02:44:38.000Z",
                  "project_category": {
                    "name": "Android Development"
                  }
                },
                {
                  "created_at": "2023-05-26T02:44:39.000Z",
                  "updated_at": "2023-05-26T02:44:39.000Z",
                  "project_category": {
                    "name": "IOS Development"
                  }
                }
              ]
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

      - When the `page` is not number:

        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "page must be an integer"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```

      - When the `size` is not number:

        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "messasge": "size must be an integer"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```

      - When the `status` field is invalid:

        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "status value must be either 'Open', 'In Progress', or 'Closed'"
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

    - When the `category_names` field is not a string:
      ```json
      {
        "code": 404,
        "status": "NOT_FOUND",
        "errors": {
          "message": "category_names not found"
        },
        "meta": {
          "version": "<API_VERSION>",
          "timestamp": "<Current Timestamp>"
        }
      }
      ```

### Request Example

- **GET** `{{base_url}}/projects/read?page=1&size=5&status=Open&category_names=Programming&category_names=Web%20Development`

---

## Update Existing Project

Update an existing project.

- **URL**: `/projects/update/:id`
- **Method**: `PUT`
- **Content-type**: `application/x-www-form-urlencoded`

### Request Parameters

| Parameter | Type   | Description                     |
| --------- | ------ | ------------------------------- |
| id        | string | The ID of the project to update |

### Request Body

| Parameter        | Type   | Description                                               |
| ---------------- | ------ | --------------------------------------------------------- |
| title            | string | The new title of the project (optional)                   |
| status           | string | The new status of the project (optional)                  |
| project_fee      | number | The new project fee (optional)                            |
| deadline         | string | The new deadline of the project (optional)                |
| region_latitude  | number | The new latitude of the project region (optional)         |
| region_longitude | number | The new longitude of the project region (optional)        |
| category_list    | string | The new list of project categories (optional, JSON array) |

### Response

- **Success Response**

  - **Code**: `204 No Content`
  - **Content-Type**: `application/json`
  - **Content**:
    ```json
    {
      "code": 204,
      "status": "NO_CONTENT",
      "data": {
        "type": "projects",
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

      - When `title` is empty:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "title must not be empty"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `status` is empty:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "status must not be empty"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `status` is not between "Open", "In Progress", or "Closed":
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "status value must be between 'Open' or 'In Progress' or 'Closed'"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `project_fee` is not number:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "project_fee must be a number"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `project_fee` is less than 0:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "project_fee must not be less than 0"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `deadline` is empty:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "deadline must not be empty"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `deadline` is not in "YYYY-MM-DD" format:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "deadline must be within 'YYYY-MM-DD' format"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `category_list` is not an array:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "category_list must be a string of array"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `category_list` is empty:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "category_list must not be empty"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `region_latitude` is empty:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "region_latitude must not be empty"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `region_latitude` is not a number:
        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "region_latitude must be a number"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When `region_longitude` is empty:

        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "region_longitude must not be empty"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```

      - When `region_longitude` is not a number:

        ```json
        {
          "code": 400,
          "status": "BAD_REQUEST",
          "errors": {
            "message": "region_longitude must be a number"
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
      - When `project` is not found:
        ```json
        {
          "code": 404,
          "status": "NOT_FOUND",
          "errors": {
            "message": "project not found"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When the specified `owner_username` is not found:
        ```json
        {
          "code": 404,
          "status": "NOT_FOUND",
          "errors": {
            "message": "owner_username not found"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```
      - When a project category in the `category_list` is not found:
        ```json
        {
          "code": 404,
          "status": "NOT_FOUND",
          "errors": {
            "message": "category_list item: <category_name> not found"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```

### Request Example

- **PUT** `{{base_url}}/projects/update/cc9f43b1-cbfb-4631-9bf2-1ffc19010bd7`
- **Content-Type:** `application/x-www-form-urlencoded`

| Field            | Input Example                                                                             |
| ---------------- | ----------------------------------------------------------------------------------------- |
| title            | Tolong buatkan saya Moodle versi mobile untuk sekolah A yang bisa diakses android dan ios |
| status           | Open                                                                                      |
| project_fee      | 100000000                                                                                 |
| deadline         | 2023-10-01                                                                                |
| owner_username   | root                                                                                      |
| region_latitude  | -1.1404097541004128                                                                       |
| region_longitude | 116.86331762187554                                                                        |
| category_list    | ["Android Development", "IOS Development"]                                                |

---

## Delete Existing Project

Delete an existing project.

- **URL**: `/projects/delete/:id`
- **Method**: `DELETE`

### Request Parameters

| Parameter | Type   | Description                     |
| --------- | ------ | ------------------------------- |
| id        | string | The ID of the project to delete |

### Response

- **Success Response**

  - **Code**: `204 No Content`
  - **Content-Type**: `application/json`
  - **Content**:
    ```json
    {
      "code": 204,
      "status": "NO_CONTENT",
      "data": {
        "type": "projects",
        "attribute": null
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
      - When `project` is not found:
        ```json
        {
          "code": 404,
          "status": "NOT_FOUND",
          "errors": {
            "message": "project not found"
          },
          "meta": {
            "version": "<API_VERSION>",
            "timestamp": "<Current Timestamp>"
          }
        }
        ```

### Request Example

- **DELETE** `{{base_url}}/projects/delete/c9f43b1-cbfb-4631-9bf2-1ffc19010bd7`
