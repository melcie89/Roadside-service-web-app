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

## Service Endpoints

### Request Service

```http
POST /api/services/request
```

**Authorization:** Bearer {token}

**Request Body:**

```json
{
  "type": "string",
  "location": {
    "latitude": "number",
    "longitude": "number",
    "address": "string"
  },
  "description": "string"
}
```

**Type Options:**

- "TOWING"
- "REPAIR"
- "FUEL_DELIVERY"
- "TIRE_CHANGE"
- "JUMP_START"

**Response:**

- **Status 201**

```json
{
  "message": "Service request created",
  "service": {
    "serviceID": "string",
    "requester": "string",
    "type": "string",
    "status": "PENDING",
    "location": {
      "latitude": "number",
      "longitude": "number",
      "address": "string"
    },
    "description": "string",
    "timestamp": "Date"
  }
}
```

### Accept Service

```http
POST /api/services/accept/:serviceId
```

**Authorization:** Bearer {token}

**Response:**

- **Status 200**

```json
{
  "message": "Service request accepted",
  "service": {
    "serviceID": "string",
    "requester": "string",
    "provider": "string",
    "status": "ACCEPTED",
    "timestampOfAcceptance": "Date"
  }
}
```

### Update Service Status

```http
PUT /api/services/:serviceId/status
```

**Authorization:** Bearer {token}

**Request Body:**

```json
{
  "status": "string"
}
```

**Status Options:**

- "PENDING"
- "ACCEPTED"
- "IN_PROGRESS"
- "COMPLETED"
- "CANCELLED"

**Response:**

- **Status 200**

```json
{
  "message": "Service status updated",
  "service": {
    "serviceID": "string",
    "status": "string",
    "completionTime": "Date" // Only when status is COMPLETED
  }
}
```

### Get Service History

```http
GET /api/services/history
```

**Authorization:** Bearer {token}

**Response:**

- **Status 200**

```json
[
  {
    "serviceID": "string",
    "requester": {
      "id": "string",
      "firstName": "string",
      "lastName": "string"
    },
    "provider": {
      "id": "string",
      "firstName": "string",
      "lastName": "string"
    },
    "type": "string",
    "status": "string",
    "location": {
      "latitude": "number",
      "longitude": "number",
      "address": "string"
    },
    "description": "string",
    "timestamp": "Date",
    "timestampOfAcceptance": "Date",
    "completionTime": "Date"
  }
]
```

### Service Socket Events

#### Listen for New Service Requests

```javascript
socket.on("new_service_request", (data) => {
  // data: {
  //   serviceID: string,
  //   location: { latitude: number, longitude: number },
  //   type: string
  // }
});
```

#### Listen for Service Acceptance

```javascript
socket.on("service_accepted", (data) => {
  // data: {
  //   serviceID: string,
  //   provider: string
  // }
});
```

#### Listen for Service Status Updates

```javascript
socket.on("service_status_update", (data) => {
  // data: {
  //   serviceID: string,
  //   status: string
  // }
});
```
