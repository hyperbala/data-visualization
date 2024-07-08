# Dashboard Application

## Overview

This project is a dashboard application built using Flask for the backend and React for the frontend. The application visualizes various data points through charts and allows users to filter the data based on different criteria.

## Features

- Data visualization using charts (Intensity, Likelihood, Region, Relevance, Year, Sector).
- Filter data based on end year, topic, sector, region, PEST, source, SWOT, country, and city.
- Upload JSON data to the MongoDB database.
- Hosted on a cloud provider with MongoDB Atlas for database management.

## Tech Stack

- **Backend:** Flask
- **Frontend:** React
- **Database:** MongoDB Atlas
- **Charting Libraries:** Chart.js

## Prerequisites

- Python 3.x
- Node.js
- npm or yarn
- MongoDB Atlas account

## Installation

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/dashboard-app.git
    cd dashboard-app
    ```

2. **Backend Setup:**
    - Create a virtual environment and activate it:
      ```bash
      python3 -m venv venv
      source venv/bin/activate  # On Windows use `venv\Scripts\activate`
      ```
    - Install the required Python packages:
      ```bash
      pip install -r requirements.txt
      ```
    - Update the MongoDB URI in `app.py`:
      ```python
      mongo_uri = 'your_mongodb_atlas_uri_here'
      ```
    - Run the Flask application:
      ```bash
      flask run
      ```

3. **Frontend Setup:**
    - Navigate to the `frontend` directory:
      ```bash
      cd client
      ```
    - Install the required Node packages:
      ```bash
      npm install  # or yarn install
      ```
    - Start the React application:
      ```bash
      npm start  # or yarn start
      ```

## Usage

- **Visualizing Data:**
  - The dashboard displays various charts visualizing the data. Charts update based on the applied filters.
  - 
- **Filtering Data:**
  - Use the filter options on the dashboard to filter data based on various criteria.

## API Endpoints

- **GET /data**
  - Fetches data from the database with optional filters.

- **POST /upload**
  - Uploads JSON data to the MongoDB database.

- **GET /filters**
  - Fetches distinct filter options for different fields.

## Deployment

- **MongoDB Atlas:**
  - Sign up for [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a new cluster.
  - Configure network access and get the connection URI.
  - Update the `mongo_uri` in `app.py` with your MongoDB Atlas connection URI
## Contact

For any inquiries or issues, please contact [balagopaloff@gmail.com](mailto:balagopaloff@gmail.com).

