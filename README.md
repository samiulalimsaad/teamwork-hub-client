# [Teamwork Hub Client](https://teamwork-hub-client.vercel.app/)

Certainly! Here's an updated README section that mentions each package used in your frontend project:

## Project Overview

TeamWork Hub Frontend is the client-side application for managing projects, collaborating on documents in real-time, and providing feedback through discussions. This repository contains the frontend code for the application.

## Technologies Used

- `React.js`: A JavaScript library for building user interfaces.
- `Vite`: A next-generation frontend tool that focuses on speed and modern JavaScript features.
- `Tailwind` CSS: A utility-first CSS framework for designing custom styles quickly.
- `TypeScript`: A superset of JavaScript that adds static types to the language.
- `Axios`: A promise-based HTTP client for making requests to the backend API.
- `Socket`.io-client: A library that enables real-time, bidirectional, and event-based communication between the browser and the server.

## Requirements

Before starting, ensure you have Node.js and npm or yarn installed on your machine.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/samiulalimsaad/teamwork-hub-client
cd teamwork-hub-frontend
```

### 2. Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following variables:

```bash
VITE_API_URL=your_backend_api_url
```

Adjust `REACT_APP_API_URL` to match your backend API endpoint.

### 4. Start the Development Server

```bash
npm run dev
```

or

```bash
yarn dev
```

The frontend server will be running at `http://localhost:5173`.

## Folder Structure

The project structure is organized as follows:

- `src/`: Contains all source code
  - `assets/`: Static assets like images and icons
  - `components/`: React components grouped by feature or UI element
  - `config/`: Configuration files
  - `hooks/`: Custom hooks used across the application
  - `interfaces/`: TypeScript interfaces
  - `layouts/`: Layout components like `MainLayout`
  - `pages/`: React components representing different pages
  - `providers/`: Context providers like `AuthProvider`
  - `routes/`: Route configuration
  - `services/`: API services and custom hooks for data fetching
  - `store/`: Redux or similar state management stores
  - `tests/`: Unit tests
  - `utils/`: Utility functions and components
- Other files: Configuration files (`vite.config.ts`, `tailwind.config.js`, etc.)

## Testing

Unit tests are provided using Jest and React Testing Library (`vitest`).

### Running Tests

To run the unit tests, use the following command:

```bash
npm run test
```

or

```bash
yarn test
```

### Test Coverage

Test coverage reports can be generated using:

```bash
npm run coverage
```

or

```bash
yarn coverage
```

## Package Details

### Main Dependencies

- **React.js**: A JavaScript library for building user interfaces.

- **Vite**: A next-generation frontend tool that focuses on speed and modern JavaScript features.

- **Tailwind CSS**: A utility-first CSS framework for designing custom styles quickly.

- **TypeScript**: A superset of JavaScript that adds static types to the language, improving developer productivity and code quality.

- **Axios**: A promise-based HTTP client for making requests to the backend API, simplifying data fetching and state management.

- **Socket.io-client**: A library that enables real-time, bidirectional, and event-based communication between the browser and the server, facilitating features like real-time document editing and chat.

### Additional Dependencies

- **@headlessui/react**: A set of completely unstyled accessible UI components for React applications.
- **@monaco-editor/react**: A Monaco editor wrapper for React applications, providing a powerful code editor experience.
- **@tanstack/react-query**: A powerful data-fetching library for React that provides caching, synchronization, and error handling.
- **axios**: A popular HTTP client for the browser and Node.js, making it easy to send asynchronous HTTP requests.
- **moment**: A library for parsing, validating, manipulating, and formatting dates in JavaScript.
- **react-quill**: A Quill component for React, providing a rich text editor.
- **react-router-dom**: DOM bindings for React Router, enabling navigation and routing in React applications.
- **react-toastify**: A React library for toast notifications, providing customizable and easy-to-use notifications.

### Development Dependencies

- **@testing-library/jest-dom** and **@testing-library/react**: Testing utilities for React applications that provide a set of helpers to test DOM elements and React components.
- **@vitest/ui**: A UI component library for testing with `vitest`, providing visual feedback and interactions during testing.
- **daisyui**: A lightweight CSS framework for Tailwind CSS, providing additional UI components and utilities.
- **tailwindcss**: A utility-first CSS framework for rapidly building custom designs, enhancing frontend styling capabilities.
- **typescript**: A typed superset of JavaScript that compiles to plain JavaScript, improving code reliability and scalability.
- **vite**: A next-generation frontend tool that focuses on speed and modern JavaScript features, providing fast development and production builds.
- **vitest**: A testing library for React applications that simplifies unit testing with a focus on integration with Vite, ensuring reliable and efficient testing workflows.
