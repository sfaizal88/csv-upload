# CSV Upload Application

## Project Overview

This project is a web application that allows users to upload CSV files, view the data with pagination, and search through the uploaded data. The application is built with React and TypeScript for the frontend, and NodeJS with TypeScript for the backend.

## Technologies Used

### Frontend
- **ReactJS**
- **TypeScript**
- **CSS**
- **React Testing Library**

### Backend
- **NodeJS**
- **Express**
- **Multer**
- **csv-parser**
- **Cors**

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sfaizal88/csv-upload.git

### Backend

1. **Navigate to the backend directory:**

   ```bash
   cd csv-upload-backend
2. **Install dependencies:**

   ```bash
   npm install
3. **Start the server:**

   ```bash
   npm run start
4. **Note down the port which will be used in the frontend code api:**


### Frontend

1. **Navigate to the frontend directory:**

   ```bash
   cd csv-upload-frontend

2. **Install dependencies:**

   ```bash
   npm install
3. **Update the port in the below file:**

    ```bash
    /csv-upload-frontend/src/utils/constants.ts
3. **Start the server:**

   ```bash
   npm run start
4. **Upload the csv file which available at the root of the project data.csv**

## Usage

### Upload a CSV file, View and Search data:

- Go to http://localhost:3000 in your browser.
- Click the "Upload you file, Only .csv allowed" containeer and select a CSV file to upload.
- Click 'Upload CSV' button:
- The uploaded data will be displayed with pagination.
- Use the search functionality to filter through the uploaded data.
