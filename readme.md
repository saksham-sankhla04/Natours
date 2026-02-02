# Natours

A full-stack tour booking application built with Node.js, Express, MongoDB, and Pug templates. Features include user authentication, tour management, Stripe payments, reviews, and geospatial queries.

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose ODM
- **Templating:** Pug
- **Payments:** Stripe
- **Authentication:** JWT with bcrypt
- **Image Processing:** Sharp, Multer
- **Email:** Nodemailer (Mailtrap / SendGrid)
- **Frontend Bundler:** Parcel

## Features

- User signup, login, and password reset via email
- Role-based access control (user, guide, lead-guide, admin)
- Tour CRUD with image uploads and geospatial location data
- Tour search by proximity and distance calculations
- Review system with automatic rating aggregation
- Stripe checkout for tour bookings
- Server-side rendered pages with Pug
- Security: rate limiting, data sanitization, XSS protection, HPP

## Getting Started

### Prerequisites

- Node.js >= 10.0.0
- MongoDB instance
- Stripe account (for payments)

### Installation

```bash
npm install
```

### Environment Variables

Create a `config.env` file in the project root with:

```
NODE_ENV=development
PORT=3000

DATABASE=<your-mongodb-connection-string>
DATABASE_PASSWORD=<your-db-password>

JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

EMAIL_HOST=<smtp-host>
EMAIL_PORT=<smtp-port>
EMAIL_USERNAME=<smtp-username>
EMAIL_PASSWORD=<smtp-password>

SENDGRID_USERNAME=<sendgrid-username>
SENDGRID_PASSWORD=<sendgrid-password>

STRIPE_SECRET_KEY=<your-stripe-secret-key>
```

### Running the App

```bash
# Development
npm run dev

# Production
npm run start:prod

# Build frontend assets
npm run build:js
```

The app runs on `http://localhost:3000` by default.

## API Endpoints

### Tours

| Method | Endpoint                                                         | Description                            |
| ------ | ---------------------------------------------------------------- | -------------------------------------- |
| GET    | `/api/v1/tours`                                                  | Get all tours (filter, sort, paginate) |
| GET    | `/api/v1/tours/:id`                                              | Get a single tour                      |
| POST   | `/api/v1/tours`                                                  | Create a tour (admin/lead-guide)       |
| PATCH  | `/api/v1/tours/:id`                                              | Update a tour                          |
| DELETE | `/api/v1/tours/:id`                                              | Delete a tour                          |
| GET    | `/api/v1/tours/top-5-cheap`                                      | Top 5 affordable tours                 |
| GET    | `/api/v1/tours/tours-within/:distance/center/:latlng/unit/:unit` | Tours near a location                  |
| GET    | `/api/v1/tours/distances/:latlng/unit/:unit`                     | Distances to tours                     |

### Users

| Method | Endpoint                             | Description            |
| ------ | ------------------------------------ | ---------------------- |
| POST   | `/api/v1/users/signup`               | Create account         |
| POST   | `/api/v1/users/login`                | Log in                 |
| GET    | `/api/v1/users/logout`               | Log out                |
| POST   | `/api/v1/users/forgotPassword`       | Request password reset |
| PATCH  | `/api/v1/users/resetPassword/:token` | Reset password         |
| GET    | `/api/v1/users/me`                   | Get current user       |
| PATCH  | `/api/v1/users/updateMe`             | Update profile / photo |
| PATCH  | `/api/v1/users/updateMyPassword`     | Change password        |
| DELETE | `/api/v1/users/deleteMe`             | Deactivate account     |

### Reviews

| Method | Endpoint                        | Description     |
| ------ | ------------------------------- | --------------- |
| GET    | `/api/v1/reviews`               | Get all reviews |
| POST   | `/api/v1/tours/:tourId/reviews` | Create a review |
| PATCH  | `/api/v1/reviews/:id`           | Update a review |
| DELETE | `/api/v1/reviews/:id`           | Delete a review |

### Bookings

| Method | Endpoint                                   | Description                 |
| ------ | ------------------------------------------ | --------------------------- |
| GET    | `/api/v1/booking/checkout-session/:tourId` | Get Stripe checkout session |

## Project Structure

```
├── server.js            # Entry point & DB connection
├── app.js               # Express app & middleware config
├── controllers/         # Route handlers & business logic
├── models/              # Mongoose schemas
├── routes/              # Express routers
├── utils/               # Helpers (error handling, email, API features)
├── views/               # Pug templates
├── public/              # Static assets (CSS, JS, images)
└── dev-data/            # Seed data & dev fixtures
```
