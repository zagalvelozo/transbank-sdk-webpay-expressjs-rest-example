# TBK API — Transbank Webpay Express

A Node.js/Express API for integrating with [Transbank Webpay](https://transbank.cl/) payment gateway, using the Webpay Plus flow.

## Overview

This application provides a REST API for processing payments through Transbank's Webpay Plus integration. It handles transaction creation, redirect to the payment page, and return URL processing for payment confirmation.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js 5.x
- **Database:** MongoDB (via Mongoose)
- **Payment Gateway:** Transbank Webpay Plus (`transbank-sdk`)

## Project Structure

```
├── app.js                 # Express application setup
├── server.js              # HTTP server entry point
├── config/
│   └── Webpay.js          # Transbank Webpay configuration
├── controllers/
│   ├── request.js
│   ├── validate.js
│   └── payment.js
├── models/
│   ├── Payment.js         # Payment schema (Mongoose)
│   └── User.js
├── routes/
│   ├── api.js             # Webpay Plus API routes
│   ├── index.js           # Home page
│   └── users.js           # Users routes
├── public/                # Static frontend assets
│   ├── index.html
│   ├── stylesheets/
│   └── javascripts/
└── package.json
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/webpayplus/create` | Initialize a Webpay Plus transaction |
| POST | `/api/webpayplus/returnUrl` | Handle Webpay return (payment result) |

### Create Transaction

```
POST /api/webpayplus/create?amount=1000&sessionId=s123&buyOrder=order1&returnUrl=https://example.com/callback
```

**Query Parameters:**
- `amount` — Transaction amount (CLP)
- `sessionId` — Unique session identifier
- `buyOrder` — Unique order identifier
- `returnUrl` — URL to redirect after payment
- `finalURL` — Optional final redirect URL (defaults to `returnUrl`)

**Response:** Redirects (302) to Webpay payment page with token.

### Return URL

```
POST /api/webpayplus/returnUrl
Content-Type: application/x-www-form-urlencoded

token_ws=<token>
```

**Response:** JSON with transaction result including `responseCode` (0 = accepted).

## Configuration

The Webpay configuration is in `config/Webpay.js`. For production, update:

- `commerceCode` — Your Transbank commerce code
- `commerceEmail` — Your registered email
- `privateCert` — Your private certificate
- `publicCert` — Your public certificate

For testing, the API uses Transbank's built-in test configuration (`Configuration.forTestingWebpayPlusNormal()`).

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB instance

### Install

```bash
npm install
```

### Run

```bash
npm start
```

The server starts on port `3000` by default. Set the `PORT` environment variable to change it.

```bash
PORT=8080 npm start
```

## License

MIT
