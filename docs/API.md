# ImpactClick API Documentation

## Overview

The ImpactClick API provides endpoints for tracking user interactions and processing donations for CSR gamified advertising campaigns.

## Base URL

- Development: `http://localhost:3000/api`
- Production: `https://your-domain.com/api`

## Authentication

Most endpoints require authentication using Firebase JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <firebase-jwt-token>
```

## Endpoints

### POST /click

Register a user click interaction.

**Request Body:**
```json
{
  "campaignId": "string",
  "ngoId": "string", 
  "sessionId": "string",
  "recaptchaToken": "string",
  "userAgent": "string (optional)",
  "ipAddress": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "donationId": "string",
  "amount": "DKK 20",
  "ngo": "Example NGO",
  "message": "Thank you for your donation!",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request` - Invalid request data
- `429 Too Many Requests` - Rate limit exceeded

### POST /donation

Process donation to NGO (requires authentication).

**Request Body:**
```json
{
  "donationId": "string",
  "ngoId": "string",
  "amount": 20,
  "currency": "DKK (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "transactionId": "string",
  "amount": 20,
  "currency": "DKK",
  "message": "Donation processed successfully",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### GET /analytics

Get campaign analytics (requires authentication).

**Query Parameters:**
- `startDate` (optional) - Start date in YYYY-MM-DD format
- `endDate` (optional) - End date in YYYY-MM-DD format
- `campaignId` (optional) - Filter by specific campaign

**Response:**
```json
{
  "totalClicks": 1500,
  "totalDonations": 1200,
  "totalAmount": 24000,
  "campaigns": [
    {
      "id": "string",
      "name": "string",
      "clicks": 500,
      "donations": 450,
      "amount": 9000,
      "conversionRate": 90
    }
  ],
  "ngos": [
    {
      "id": "string",
      "name": "string",
      "donations": 600,
      "amount": 12000,
      "averageDonation": 20
    }
  ],
  "timeRange": {
    "start": "2024-01-01T00:00:00.000Z",
    "end": "2024-01-31T23:59:59.999Z"
  }
}
```

### GET /analytics/time-series

Get time series analytics data (requires authentication).

**Query Parameters:**
- `days` (optional) - Number of days (default: 30)

**Response:**
```json
[
  {
    "date": "2024-01-01",
    "clicks": 50,
    "donations": 45,
    "amount": 900
  }
]
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request (invalid data)
- `401` - Unauthorized (missing/invalid token)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

## Rate Limiting

The API implements rate limiting to prevent abuse:
- 10 requests per minute per IP address
- Rate limit headers included in responses

## Security

- All sensitive data is encrypted using AES-256
- reCAPTCHA v3 integration for bot protection
- JWT-based authentication
- CORS enabled for widget integration
- Input validation and sanitization

## Mock Data

For development, the API includes mock data:
- Campaigns: Summer Campaign, Holiday Drive, Year-End Appeal
- NGOs: Example NGO, Wildlife Foundation, Education First
- Donation amounts: DKK 10, DKK 20, DKK 50
