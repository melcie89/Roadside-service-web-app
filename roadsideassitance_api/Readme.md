# Roadside Assistance API Documentation

## Base URL

- **Production:** `https://roadside-assistance-api-27dbc3c52c31.herokuapp.com`
- **Development:** `http://localhost:5000`

## Authentication

### Register User

```http
POST /api/v1/auth/register
```

**Request Body:**

```json
{
  "email": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string",
  "role": "string" // Optional, defaults to "USER"
}
```

**Response:**

- **Status 201**

```json
{
  "message": "User registered successfully"
}
```

### Login

```http
POST /api/v1/auth/login
```

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**

- **Status 200**

```json
{
  "accessToken": "string",
  "refreshToken": "string"
}
```

## Location Endpoints

### Start Location Sharing

```http
POST /api/location/start
```

**Authorization:** Bearer {token}

**Request Body:**

```json
{
  "roomId": "string",
  "latitude": "number",
  "longitude": "number"
}
```

### Stop Location Sharing

```http
POST /api/location/stop
```

**Authorization:** Bearer {token}

**Request Body:**

```json
{
  "roomId": "string"
}
```

### Get Location History

```http
GET /api/location/history/:roomId
```

**Authorization:** Bearer {token}

## Chat Endpoints

### Get Chat History

```http
GET /api/chat/:roomId
```

**Authorization:** Bearer {token}

### Socket Events

#### Connection

```javascript
const socket = io("BASE_URL", {
  auth: { token: "your_jwt_token" },
});
```

#### Events to Emit

- **Join Room**

```javascript
socket.emit("join_room", { roomId: "string" });
```

- **Send Message**

```javascript
socket.emit("send_message", {
  roomId: "string",
  sender: "string",
  message: "string",
});
```

- **Share Location**

```javascript
socket.emit("share_location", {
  roomId: "string",
  latitude: number,
  longitude: number,
});
```

#### Events to Listen

- **Receive Message**

```javascript
socket.on("receive_message", (data) => {
  // data: { sender: string, message: string, timestamp: Date }
});
```

- **Location Update**

```javascript
socket.on("location_update", (data) => {
  // data: { userId: string, roomId: string, latitude: number, longitude: number, timestamp: Date }
});
```

## Error Response

```json
{
  "message": "Error description"
}
```

## Common Status Codes

- **200:** Success
- **201:** Created
- **400:** Bad Request
- **401:** Unauthorized
- **403:** Forbidden
- **500:** Server Error

## Models

### User

```json
{
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "role": "string"
}
```

### Location

```json
{
  "userId": "string",
  "roomId": "string",
  "latitude": "number",
  "longitude": "number",
  "timestamp": "Date",
  "isActive": "boolean"
}
```

### ChatMessage

```json
{
  "roomId": "string",
  "sender": "string",
  "message": "string",
  "timestamp": "Date"
}
```
