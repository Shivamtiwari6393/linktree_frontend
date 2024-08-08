# Linktree Frontend

Welcome to the Linktree project! This is the frontend repository for a Linktree-like application that allows users to create a personalized collection of links and share it with the world. The frontend is built using Vite + React and styled with CSS for an attractive and responsive design.

## Features

- **User Authentication**: Sign up and sign in functionality.
- **Personalized Link Collection**: Create and manage a collection of links.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Dynamic URL**: Fetch and display links based on the user's email.


## Getting Started

Follow these steps to get a local copy of the project up and running on your machine.

### Prerequisites

Make sure you have the following installed:

- Node.js (>=14.x)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Shivam6393/linktree_frontend.git
   cd linktree_frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173` to see the application in action.

## Folder Structure

```
linktree-clone-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── LandingPage.js
│   │   ├── SignIn.js
│   │   ├── SignUp.js
│   │   ├── YourLink.js
│   │   ├── Loading.js
│   ├── styles/
│   │   ├── LandingPage.css
│   │   ├── SignIn.css
│   │   ├── SignUp.css
│   │   ├── YourLink.css
│   │   ├── Loading.css
│   ├── App.js
│   ├── main.js
│   └── ...
├── .env
├── README.md
└── ...
```

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Vite**: Next Generation Frontend Tooling for fast development.
- **CSS**: Styling the application.
- **React Router**: Declarative routing for React.
- **Fetch API**: For making HTTP requests.

## Usage

### Landing Page

The landing page provides an overview of the application with a welcoming message and an input field to fetch user links.


### Sign In / Sign Up

Users can sign in or sign up to create and manage their link collection.


### Your Links

Users can view their personalized collection of links.