# Book Collection Management App Documentation

## Introduction

This Book Collection Management App is a React application that allows users to manage their personal book collection. Users can register, log in, add books, edit books, and view their book list. This app features protected routes, rate-limiting, and efficient state management.

## Key Features

- User Registration and Login System.
- Protected Routes for authenticated users using `RouteGuard` component.
- RouteGuard ensures:
  - Only logged-in users can access Add Book, Edit Book, and Book List pages.
  - Logged-in users cannot access Login and Signup pages (they are redirected to Home).
- Rate Limiting for Login and Signup to prevent brute force attacks.
- Loading Spinner for better user experience during API calls.
- Error Handling with clear messages.
- Clean and responsive UI with Tailwind CSS.
- Smooth UI without flickering when showing/hiding error messages.
- Text truncation using CSS (line-clamp, ellipsis) with title attribute for accessibility.
- Two views in Book List: Column and Card view.
- Error boundry support for js errors

## Pages

1. **Login Page:**

   - Users can log in using email and password.
   - Rate-limited to prevent multiple login attempts.
   - Redirects logged-in users to the Home page.

2. **Signup Page:**

   - Users can register with name, email, and password.
   - Includes rate-limiting to prevent spam.
   - Redirects logged-in users to the Home page.

3. **Home Page:**

   - Welcome page for logged-in users.
   - Provides navigation to the Book List, Add Book, and Edit Book pages.

4. **Book List Page:**

   - Displays the list of books added by the user.
   - Supports two views: Column and Card.
   - Only accessible by logged-in users.

5. **Add Book Page:**

   - Allows users to add new books to their collection.
   - Checks if the book already exists.
   - Books are temporarily stored in Local Storage.
   - Only accessible by logged-in users.

6. **Edit Book Page:**

   - Allows users to update existing book details.
   - Only accessible by logged-in users.

7. **Error Page:**
   - Displays a user-friendly error message if the URL is incorrect.

## RouteGuard: Advanced Protected Route System

- The `RouteGuard` component is used for route protection.
- Takes `requireAuth` prop:
  - If `true`, only logged-in users can access the route (protected).
  - If `false`, only non-logged-in users can access the route (login and signup).

## Authentication System

- JWT-based authentication is used.
- Token is stored in Local Storage.
- Context API and Reducer manage the authentication state globally.
- The app automatically redirects users to the login page if they are not authenticated.

## Rate Limiting

- Login and Signup pages have a rate-limiting mechanism.
- If a user exceeds the maximum number of attempts, they are temporarily blocked.

## Book Storage

- Currently, books are stored in Local Storage.
- In a production environment, it is recommended to use a database (like MongoDB) to store user-specific books.
- Books can be linked to user accounts using a user ID.

## Code Structure

- Components: Reusable UI components (Button, Input, Spinner).
- Pages: Individual screens (Login, Signup, AddBook, EditBook, BookList, Home, Error).
- Context: AuthContext for global authentication state management.
- API: Axios instance for HTTP requests, including JWT handling.
- Hooks: Custom hooks (Rate Limiter) for clean, reusable logic.

## Future Improvements

- Implement a backend with Node.js and MongoDB for secure data storage, linking books with user IDs.
- Add user profile management.
- Optimize UI for better performance.
- Improve error handling with detailed messages.

## How to Start the App Locally

1. **Frontend:**

   - Go to the `Frontend` folder.
   - Run `npm install` to install dependencies.
   - Go to `src/api/axiosInstance` and update the baseurl with your local server backed url
   - Start the app with `npm run dev`.

2. **Backend:**
   - Go to the `Backend` folder.
   - Run `npm install` to install dependencies.
   - Add required environment variables in `.env` file.
   - Start the server with `npm run dev`.
