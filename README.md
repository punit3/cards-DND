Here’s how you can structure the content for the `README.md` file:

---

# Project Title

## Overview

This project showcases a set of cards displayed in a grid format on the homepage. Each card contains a **image** **name** and its **position**, fetched via a mocked API using **MSW (Mock Service Worker)**. The cards are draggable, allowing users to rearrange them. Upon dragging, the position numbers of the cards update, and the new arrangement is auto-saved to the API. On page refresh, the updated card positions are fetched from the API.

## Features
- **Card Grid Display**: Five cards are displayed in a grid format.
- **Mocked API**: Data is fetched using `msw` to simulate API calls.
- **Loading Spinner**: Displays while the card images are loading.
- **Drag-and-Drop Functionality**: Cards can be moved and rearranged by dragging, updating their positions dynamically.
- **Auto-save**: Changes to card positions are automatically saved to the API.
- **Persistent State**: On refresh, the card positions are fetched with the updated positions.

## Libraries and Frameworks
- **Vite React Template** from [Mantine.dev](https://mantine.dev/): The base framework for the project.
- **MSW (Mock Service Worker)**: Used for mocking API calls to fetch and update card data.

## Getting Started

### Prerequisites
Ensure that you have **Node.js** and **npm** installed on your machine.

### Installation and Running the App

1. **Clone the Repository**
   ```bash
   git clone [repository-link]
   ```
2. **Navigate to the Project Directory**
   ```bash
   cd [project-folder]
   ```
3. **Install Dependencies**
   ```bash
   npm install
   ```
4. **Start the Development Server**
   ```bash
   npm run dev
   ```

The app should now be running in development mode, and you can view it by visiting `http://localhost:3000` in your browser.

## Contributions
Feel free to open issues or submit pull requests to help improve this project.

---

This `README.md` file should provide clear and concise instructions for users looking to understand the project and run it locally.
