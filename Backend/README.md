# Backend API Documentation

## User Registration

### Endpoint
`POST /users/register`

### Overview
This endpoint creates a new user account and returns a JSON Web Token (JWT) that can be used for subsequent authenticated requests.

### Request Format
Submit a JSON payload with the following structure:

```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### Request Parameters
| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string | Yes | Must be a valid email address. |
| `password` | string | Yes | Must be at least 6 characters long. |
| `fullName.firstName` | string | Yes | User's first name. |
| `fullName.lastName` | string | No | User's last name. If omitted, it defaults to an empty string. |

### Validation Rules
- The `email` field must be in a valid email format.
- The `password` field must contain at least 6 characters.
- The `fullName.firstName` field must be present.

### Success Response
- Status: `201 Created`

Example success response:

```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "64b8f4b2d8c2a12e8e4d1f2a",
    "email": "user@example.com",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "createdAt": "2026-08-04T10:00:00.000Z",
    "updatedAt": "2026-08-04T10:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Responses
- `400 Bad Request`: Returned when the request body is malformed, missing required data, or fails validation.
- `500 Internal Server Error`: Returned when an unexpected server-side error occurs during user creation.

Example error response:

```json
{
  "message": "Invalid input data",
  "errors": [
    {
      "msg": "Please enter a valid email address",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---



