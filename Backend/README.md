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

## Captain Registration

### Endpoint
`POST /captains/register`

Note: `/captains/regsiter` is not currently defined in the routes. The implemented route is `/captains/register`.

### Overview
This endpoint creates a new captain account with vehicle details.

### Request Format
Submit a JSON payload with the following structure:

```json
{
  "fullName": {
    "firstName": "Jane",
    "lastName": "Driver"
  },
  "email": "captain@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Black",
    "plate": "KA01AB1234",
    "capacity": 4,
    "vehicleType": "car",
    "location": {
      "latitude": 12.9716,
      "longitude": 77.5946
    }
  }
}
```

### Request Parameters
| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `fullName.firstName` | string | Yes | Captain's first name. |
| `fullName.lastName` | string | Yes | Captain's last name. |
| `email` | string | Yes | Must be a valid and unique email address. |
| `password` | string | Yes | Must be at least 6 characters long. |
| `vehicle.color` | string | Yes | Vehicle color. |
| `vehicle.plate` | string | Yes | Vehicle registration plate. |
| `vehicle.capacity` | number | Yes | Must be at least 1. |
| `vehicle.vehicleType` | string | Yes | Must be one of `car`, `motorcycle`, or `truck`. |
| `vehicle.location.latitude` | number | Yes | Vehicle latitude. |
| `vehicle.location.longitude` | number | Yes | Vehicle longitude. |

### Validation Rules
- `fullName.firstName` and `fullName.lastName` are required.
- `email` must be in a valid email format.
- `password` must contain at least 6 characters.
- Vehicle `color`, `plate`, `capacity`, `vehicleType`, `location.latitude`, and `location.longitude` are required.
- `vehicle.capacity` must be an integer of at least 1.
- `vehicle.vehicleType` must be `car`, `motorcycle`, or `truck`.
- `vehicle.location.latitude` and `vehicle.location.longitude` must be valid numbers.

### Success Response
- Status: `201 Created`

Example success response:

```json
{
  "_id": "64b8f4b2d8c2a12e8e4d1f2b",
  "fullName": {
    "firstName": "Jane",
    "lastName": "Driver"
  },
  "email": "captain@example.com",
  "socketId": null,
  "status": "unavailable",
  "vehicle": {
    "color": "Black",
    "plate": "KA01AB1234",
    "capacity": 4,
    "vehicleType": "car",
    "location": {
      "latitude": 12.9716,
      "longitude": 77.5946
    }
  },
  "createdAt": "2026-08-04T10:00:00.000Z",
  "updatedAt": "2026-08-04T10:00:00.000Z"
}
```

### Error Responses
- `400 Bad Request`: Returned when the request body is missing required data or fails validation.
- `409 Conflict`: Returned when a captain with the same email already exists.
- `500 Internal Server Error`: Returned when an unexpected server-side error occurs during captain registration.

Example validation error response:

```json
{
  "errors": [
    {
      "msg": "Please provide a valid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

Example duplicate email response:

```json
{
  "success": false,
  "message": "A captain with this email already exists."
}
```

---

## Captain Login

### Endpoint
`POST /captains/login`

### Overview
This endpoint authenticates an existing captain and returns a JSON Web Token (JWT). It also sets the token in a `token` cookie.

### Request Format
Submit a JSON payload with the following structure:

```json
{
  "email": "captain@example.com",
  "password": "password123"
}
```

### Request Parameters
| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string | Yes | Must be the email address for an existing captain account. |
| `password` | string | Yes | Must be at least 6 characters long. |

### Validation Rules
- `email` must be in a valid email format.
- `password` must contain at least 6 characters.

### Success Response
- Status: `200 OK`

Example success response:

```json
{
  "success": true,
  "message": "Login successful.",
  "captain": {
    "_id": "64b8f4b2d8c2a12e8e4d1f2b",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Driver"
    },
    "email": "captain@example.com",
    "socketId": null,
    "status": "unavailable",
    "vehicle": {
      "color": "Black",
      "plate": "KA01AB1234",
      "capacity": 4,
      "vehicleType": "car",
      "location": {
        "latitude": 12.9716,
        "longitude": 77.5946
      }
    },
    "createdAt": "2026-08-04T10:00:00.000Z",
    "updatedAt": "2026-08-04T10:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Responses
- `400 Bad Request`: Returned when the request body fails validation.
- `404 Not Found`: Returned when no captain exists with the provided email.
- `401 Unauthorized`: Returned when the password is incorrect.
- `500 Internal Server Error`: Returned when an unexpected server-side error occurs during login.

Example validation error response:

```json
{
  "errors": [
    {
      "msg": "Please enter a valid email address",
      "param": "email",
      "location": "body"
    }
  ]
}
```

Example captain not found response:

```json
{
  "success": false,
  "message": "Captain not found."
}
```

Example invalid password response:

```json
{
  "success": false,
  "message": "Invalid password."
}
```

---

## Captain Profile

### Endpoint
`GET /captains/profile`

### Overview
This endpoint returns the authenticated captain's profile.

### Authentication
This endpoint requires a valid captain JWT. Send the token using either:

- Cookie: `token=<jwt>`
- Header: `Authorization: Bearer <jwt>`

### Success Response
- Status: `200 OK`

Example success response:

```json
{
  "success": true,
  "captain": {
    "_id": "64b8f4b2d8c2a12e8e4d1f2b",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Driver"
    },
    "email": "captain@example.com",
    "socketId": null,
    "status": "unavailable",
    "vehicle": {
      "color": "Black",
      "plate": "KA01AB1234",
      "capacity": 4,
      "vehicleType": "car",
      "location": {
        "latitude": 12.9716,
        "longitude": 77.5946
      }
    },
    "createdAt": "2026-08-04T10:00:00.000Z",
    "updatedAt": "2026-08-04T10:00:00.000Z"
  }
}
```

### Error Responses
- `401 Unauthorized`: Returned when the token is missing, invalid, expired, invalidated, or belongs to a captain that no longer exists.
- `404 Not Found`: Returned when the authenticated captain profile is unavailable.
- `500 Internal Server Error`: Returned when an unexpected server-side error occurs while fetching the profile.

Example missing token response:

```json
{
  "message": "Authorization token missing or malformed"
}
```

Example expired token response:

```json
{
  "message": "Unauthorized: Token expired"
}
```

Example captain not found response:

```json
{
  "message": "Unauthorized: Captain not found"
}
```

---

## Captain Logout

### Endpoint
`GET /captains/logout`

### Overview
This endpoint logs out the authenticated captain by clearing the `token` cookie and blacklisting the current JWT.

### Authentication
This endpoint requires a valid captain JWT. Send the token using either:

- Cookie: `token=<jwt>`
- Header: `Authorization: Bearer <jwt>`

### Success Response
- Status: `200 OK`

Example success response:

```json
{
  "message": "Logout successful"
}
```

### Error Responses
- `401 Unauthorized`: Returned when the token is missing, invalid, expired, invalidated, or belongs to a captain that no longer exists.
- `500 Internal Server Error`: Returned when an unexpected server-side error occurs during logout.

Example invalid token response:

```json
{
  "message": "Unauthorized: Invalid token"
}
```

Example invalidated token response:

```json
{
  "message": "Unauthorized: Token has been invalidated"
}
```

---

## User Login

### Endpoint
`POST /users/login`

### Overview
This endpoint authenticates an existing user and returns a JSON Web Token (JWT) that can be used for subsequent authenticated requests.

### Request Format
Submit a JSON payload with the following structure:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Request Parameters
| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string | Yes | Must be the email address for an existing user account. |
| `password` | string | Yes | Must be at least 6 characters long. |

### Validation Rules
- The `email` field must be in a valid email format.
- The `password` field must contain at least 6 characters.
- Both `email` and `password` must be present.

### Success Response
- Status: `200 OK`

Example success response:

```json
{
  "message": "Login successful",
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
- `401 Unauthorized`: Returned when `email` or `password` is missing, or when the credentials do not match an existing user.
- `500 Internal Server Error`: Returned when an unexpected server-side error occurs during login.

Example missing credentials response:

```json
{
  "message": "Email and password are required"
}
```

Example invalid credentials response:

```json
{
  "message": "Invalid email or password"
}
```

---

## User Profile

### Endpoint
`GET /users/profile`

### Overview
This endpoint returns the authenticated user's profile.

### Authentication
This endpoint requires a valid JWT. Send the token using either:

- Cookie: `token=<jwt>`
- Header: `Authorization: Bearer <jwt>`

### Success Response
- Status: `200 OK`

Example success response:

```json
{
  "message": "User profile retrieved successfully",
  "user": {
    "_id": "64b8f4b2d8c2a12e8e4d1f2a",
    "email": "user@example.com",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "socketId": null,
    "createdAt": "2026-08-04T10:00:00.000Z",
    "updatedAt": "2026-08-04T10:00:00.000Z"
  }
}
```

### Error Responses
- `401 Unauthorized`: Returned when the token is missing, malformed, invalidated, or belongs to a user that no longer exists.
- `500 Internal Server Error`: Returned when an unexpected server-side error occurs while retrieving the profile.

Example missing token response:

```json
{
  "message": "Authorization token missing or malformed"
}
```

Example invalidated token response:

```json
{
  "message": "Unauthorized: Token has been invalidated"
}
```

---

## User Logout

### Endpoint
`GET /users/logout`

### Overview
This endpoint logs out the authenticated user by clearing the `token` cookie and blacklisting the current JWT.

### Authentication
This endpoint requires a valid JWT. Send the token using either:

- Cookie: `token=<jwt>`
- Header: `Authorization: Bearer <jwt>`

### Success Response
- Status: `200 OK`

Example success response:

```json
{
  "message": "Logout successful"
}
```

### Error Responses
- `401 Unauthorized`: Returned when the token is missing, malformed, invalidated, or belongs to a user that no longer exists.
- `500 Internal Server Error`: Returned when an unexpected server-side error occurs during logout.

Example missing token response:

```json
{
  "message": "Authorization token missing or malformed"
}
```

Example user not found response:

```json
{
  "message": "Unauthorized: User not found"
}
```

---
