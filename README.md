# 🍽️ RecipeHub — Share Your Favorite Recipes

<p align="center">
  <strong>A full-stack recipe sharing application built with Next.js, React, Node.js, Express, and MongoDB.</strong>
</p>

<p align="center">
  Discover recipes, share your own creations, save your favorites, and manage your recipes through a simple and modern interface.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-App%20Router-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-API-000000?logo=express" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
</p>

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Authentication and Security](#-authentication-and-security)
- [Image Uploads](#-image-uploads)
- [Future Improvements](#-future-improvements)

---

## 🚀 About the Project

RecipeHub is a full-stack web application designed for people who enjoy cooking and sharing recipes.

Users can explore recipes shared by others, search for recipes by title, create an account, publish their own recipes, edit or delete their creations, and maintain a personal favorites list.

The application uses **Next.js** for the frontend and **Node.js with Express.js** for the backend. MongoDB stores application data, while JWT provides token-based authentication for protected API endpoints.

The project is organized into separate frontend and backend applications to keep the user interface, business logic, and data management independent.

---

## ✨ Features

### 👨‍🍳 Recipe Management

- Browse all available recipes.
- Create and publish recipes.
- Edit your own recipes.
- Delete your own recipes.
- Upload recipe cover images.
- View recipe details, ingredients, and instructions.

### 🔎 Search and Pagination

- Search recipes by title.
- Navigate through recipes using pagination.
- Sort results using API query parameters.
- Select returned fields using the API's field-selection functionality.

### ❤️ Favorites

- Add recipes to your favorites.
- Remove recipes from your favorites.
- View your saved recipes.
- Check whether a recipe is already in your favorites.

### 🔐 User Authentication

- Register a new account.
- Log in with email and password.
- Securely hash passwords using bcrypt.
- Authenticate protected API requests with JWT.
- Log out by removing the stored token.
- Request a password-reset email.
- Reset a password using a time-limited token.

### 💬 User Experience

- Responsive recipe-card layout.
- Login and registration modal.
- Toast notifications for success and error messages.
- Navigation between application pages.
- Dedicated pages for adding and editing recipes.

---

## 🛠️ Tech Stack

### Frontend

| Technology             | Purpose                                              |
| ---------------------- | ---------------------------------------------------- |
| Next.js                | React framework and application routing              |
| React                  | Building reusable UI components                      |
| JavaScript / JSX       | Frontend logic and components                        |
| TypeScript             | TypeScript used in selected application files        |
| Axios                  | Sending HTTP requests to the backend                 |
| Material UI (MUI)      | Form controls, buttons, modal, and layout components |
| React Icons            | Icons throughout the interface                       |
| Tailwind CSS utilities | Utility classes used in the interface                |
| React Context API      | Managing authentication and toast-notification state |
| CSS                    | Component and page styling                           |

### Backend

| Technology           | Purpose                                       |
| -------------------- | --------------------------------------------- |
| Node.js              | JavaScript runtime                            |
| Express.js           | REST API and HTTP routing                     |
| MongoDB              | NoSQL database                                |
| Mongoose             | Database models, schemas, and queries         |
| JSON Web Token (JWT) | Token-based authentication                    |
| bcryptjs             | Password hashing and password verification    |
| express-validator    | Validating request parameters and body fields |
| Multer               | Handling multipart image uploads              |
| Nodemailer           | Sending password-reset emails                 |
| Crypto               | Generating and hashing password-reset tokens  |
| dotenv               | Loading environment variables                 |
| CORS                 | Configuring cross-origin requests             |

---

## 📁 Project Structure

The following structure represents the main folders and files used in the application. Some filenames may differ depending on your final project organization.

```text
RecipeHub/
│
├── Backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── Controller/
│   │   ├── UserController.js
│   │   ├── RecipeController.js
│   │   └── handlersFactory.js
│   │
│   ├── Middleware/
│   │   ├── asyncHandler.js
│   │   ├── Error.js
│   │   ├── uploadMiddleware.js
│   │   ├── validationMiddleware.js
│   │   └── verifyToken.js
│   │
│   ├── models/
│   │   ├── UserSchema.js
│   │   └── RecipeSchema.js
│   │
│   ├── Routes/
│   │   ├── user.js
│   │   └── recipe.js
│   │
│   ├── utils/
│   │   ├── apiFeatures.js
│   │   └── validator/
│   │       ├── userValidator.js
│   │       └── recipeValidator.js
│   │
│   ├── public/
│   │   └── images/
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   │
│   ├── app/
│   │   ├── (page)/
│   │   ├── AddRecipes/
│   │   ├── Contact/
│   │   ├── EditRecpies/
│   │   ├── MyFavourites/
│   │   ├── MyRecipes/
│   │   ├── reset-password/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── HeaderAndFooter/
│   │   ├── LoginAndRegister/
│   │   ├── EditAllRecipes/
│   │   ├── homeComponents/
│   │   └── MyRecipesClient.js
│   │
│   ├── context/
│   │   ├── isLoginContext.js
│   │   └── ToastContext.js
│   │
│   ├── public/
│   ├── package.json
│   └── .env.local
│
└── README.md
```

> **Note:** The example uses `frontend` as the frontend folder name and `server.js` as the backend entry point. Keep the actual names and paths used in your project if they differ.

### Backend Responsibilities

- **Routes:** Define API endpoints and attach authentication and validation middleware.
- **Controllers:** Handle user authentication, recipe operations, favorites, and password resets.
- **Models:** Define MongoDB document structures using Mongoose.
- **Middleware:** Handle authentication, validation, image uploads, asynchronous errors, and HTTP errors.
- **Utils:** Provide reusable query features and request validators.
- **Config:** Establish the MongoDB connection.
- **Public/images:** Store uploaded recipe images during local development.

### Frontend Responsibilities

- **app:** Defines application pages and layouts through the Next.js App Router.
- **components:** Contains reusable interface components for recipes, forms, navigation, and authentication.
- **context:** Shares authentication state and toast notifications across components.
- **public:** Contains static assets used by the frontend.

---

## ⚙️ Getting Started

### Prerequisites

Install the following before running the project:

- Node.js and npm
- MongoDB running locally, or a MongoDB Atlas database
- A Gmail account configured for application-password access if you want to test password-reset emails

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd RecipeHub
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Install Backend Dependencies

```bash
cd Backend
npm install
```

Create a `.env` file in the backend directory and configure the required variables.

### 3. Configure the Backend Environment

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/Restaurant
SECRET_KEY=REPLACE_WITH_A_STRONG_RANDOM_SECRET
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-gmail-app-password
```

Replace the example values with your own configuration. Never commit real credentials or API secrets to GitHub.

### 4. Start the Backend

Use the script available in your backend `package.json`.

For example, if the project has a `dev` script:

```bash
npm run dev
```

If the project has a `start` script instead:

```bash
npm start
```

The API uses port `5000` by default unless the `PORT` environment variable specifies another value.

### 5. Install Frontend Dependencies

Open a second terminal:

```bash
cd frontend
npm install
```

### 6. Start the Frontend

For a standard Next.js project with a configured development script:

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

The frontend currently uses `http://localhost:5000` in its API requests. When deploying the application, update these URLs to point to the deployed backend, or centralize them in a public frontend environment variable such as `NEXT_PUBLIC_API_URL`.

---

## 🔑 Environment Variables

### Backend

| Variable     | Description                                                |
| ------------ | ---------------------------------------------------------- |
| `PORT`       | Port used by the Express server                            |
| `MONGO_URI`  | MongoDB connection string                                  |
| `SECRET_KEY` | Secret used to sign and verify JWTs                        |
| `EMAIL_USER` | Email account used to send password-reset messages         |
| `EMAIL_PASS` | Gmail app password or appropriate mail-provider credential |

Before deploying, configure each variable through your hosting provider's environment-variable settings.

The current password-reset controller contains a development URL pointing to `localhost:3000`. Update it to use your deployed frontend URL before using password reset in production.

### Frontend

The current frontend contains hard-coded API URLs. If you centralize them, you can configure a `.env.local` file in the frontend root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

This variable is only effective after the frontend code has been updated to read it. Variables prefixed with `NEXT_PUBLIC_` are exposed to browser code, so they must never contain secrets.

---

## 🌐 API Documentation

The backend API base URL during local development is:

```text
http://localhost:5000
```

### 🍲 Recipe Endpoints

Base path: `/api/recipe`

| Method | Endpoint                 | Authentication | Description                                                      |
| ------ | ------------------------ | -------------- | ---------------------------------------------------------------- |
| GET    | `/api/recipe`            | Public         | Retrieve recipes with search, filtering, sorting, and pagination |
| POST   | `/api/recipe`            | Required       | Create a recipe and upload its cover image                       |
| GET    | `/api/recipe/my-recipes` | Required       | Retrieve recipes belonging to the authenticated user             |
| GET    | `/api/recipe/:Id`        | Public         | Retrieve a recipe by its MongoDB ID                              |
| PUT    | `/api/recipe/:Id`        | Required       | Update a recipe owned by the authenticated user                  |
| DELETE | `/api/recipe/:Id`        | Required       | Delete a recipe owned by the authenticated user                  |

For recipe creation, send a `multipart/form-data` request containing:

```text
title
ingredients
instructions
coverImage
```

For authenticated requests, provide the token in the request header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### 👤 User Endpoints

Base path: `/api/user`

| Method | Endpoint                          | Authentication               | Description                                        |
| ------ | --------------------------------- | ---------------------------- | -------------------------------------------------- |
| POST   | `/api/user/register`              | Public                       | Register a new account                             |
| POST   | `/api/user/login`                 | Public                       | Authenticate a user                                |
| POST   | `/api/user/forgot-password`       | Public                       | Request a password-reset email                     |
| POST   | `/api/user/reset-password/:token` | Public, reset token required | Reset a password                                   |
| GET    | `/api/user/favourites`            | Required                     | Retrieve the authenticated user's favorite recipes |
| POST   | `/api/user/favourites/:id`        | Required                     | Add or remove a recipe from favorites              |
| GET    | `/api/user`                       | Currently public             | Retrieve the user list                             |

**Production security note:** The current `GET /api/user` endpoint is not protected by authentication. Remove it if unnecessary, or restrict it to appropriately authorized administrators before deployment.

### 🔎 Search and Pagination

The recipe listing endpoint supports query parameters such as:

```text
GET /api/recipe?keyword=pasta&page=1&limit=4
```

Other supported query features include sorting and field selection:

```text
GET /api/recipe?sort=-createdAt
GET /api/recipe?fields=title,ingredients,coverImage
```

The available filtering behavior depends on the query fields supported by the backend implementation.

---

## 🔐 Authentication and Security

The current authentication flow works as follows:

1. Users register or log in using their email and password.
2. Passwords are hashed with `bcryptjs` before they are stored.
3. The backend issues a JWT after successful authentication.
4. The frontend stores the token in `localStorage`.
5. Protected API requests send the token using the `Authorization: Bearer` header.
6. The backend verifies the token through authentication middleware.
7. Recipe updates and deletions check whether the authenticated user owns the recipe.

### Password Reset

The password-reset workflow uses a randomly generated token. The backend stores a hash of the token and an expiration time, sends a reset link by email, and validates the token when the user submits a new password. The reset token expires after ten minutes and is cleared after a successful reset.

### Before Production

- Replace exposed or weak secrets and keep them out of version control.
- Restrict the public user-list endpoint or remove it.
- Allow updates only to explicitly permitted recipe fields.
- Configure CORS to allow your deployed frontend origin.
- Validate the new password before saving it.
- Use HTTPS in production.
- Consider short-lived access tokens and a more deliberate token-storage strategy.
- Configure reliable persistent image storage if the hosting platform does not preserve local uploads.
- Add rate limiting and suitable controls for authentication and password-reset endpoints.

---

## 🖼️ Image Uploads

Recipe images are uploaded through Multer and stored locally in:

```text
Backend/public/images/
```

The backend exposes this directory through the following URL pattern:

```text
http://localhost:5000/images/IMAGE_FILENAME
```

The configured upload middleware accepts image MIME types and limits individual files to 5 MB.

For production, validate file contents and file types more thoroughly, and consider using persistent object storage or an image-hosting service.

---

## 🧪 Suggested Testing Checklist

- [ ] Register a new account.
- [ ] Log in and log out.
- [ ] Create a recipe with an image.
- [ ] View the recipes list.
- [ ] Search for a recipe by title.
- [ ] Move between pagination pages.
- [ ] Edit and delete a recipe you own.
- [ ] Confirm that another user cannot edit or delete your recipe.
- [ ] Add and remove a recipe from favorites.
- [ ] Open the favorites page.
- [ ] Request a password-reset email.
- [ ] Reset a password using a valid reset token.
- [ ] Verify that expired or invalid reset tokens are rejected.

---

## 🚀 Future Improvements

Potential improvements for future versions include:

- A centralized API client for all frontend requests.
- Improved loading, empty, and error states.
- Stronger server-side authorization and request validation.
- Persistent image storage for production deployments.
- Automated backend and frontend tests.
- Improved accessibility and responsive layouts.
- Deployment configuration and a live demonstration.

---

## 👨‍💻 Author

**RecipeHub — Full-Stack Web Development Project**

Built to practice full-stack development, REST API design, database modeling, authentication, file uploads, and reusable frontend components.

---

## 📄 License

No license has been specified yet. Add a license file if you intend to distribute the project under a particular open-source license.
