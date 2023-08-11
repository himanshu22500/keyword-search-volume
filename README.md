# keyword-search-volume
An API to Calculate the search volume data for any given keyword


API testing link 
https://himanshu-keyword-search.onrender.com/getTotalViewCount?searchKeyword= {yoursearch keyword}

Send Keyword search value as query parameter.

Deployed frontend LINK
https://himanshu-keyword-volume.onrender.com/
#
Github of above static page 
https://github.com/himanshu22500/keyword-frontend
![ScreenShot of UI](https://github.com/himanshu22500/keyword-search-volume/assets/78587168/40c12bdf-87df-407e-a10d-a4740a467a3b)


## YouTube API Server Documentation

This documentation provides an overview of the Node.js server code that interacts with the YouTube API to retrieve video view statistics for a given search keyword.

### Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [API Endpoints](#api-endpoints)
5. [Functions](#functions)

---

### 1. Introduction <a name="introduction"></a>

The provided Node.js server code utilizes the **Google APIs** library to interact with the **YouTube API**. It establishes an **Express.js** server that listens on port 3000 and exposes an endpoint for fetching the total view count of videos related to a given search keyword.

### 2. Installation <a name="installation"></a>

To use this server code, follow these steps:

1. Install the required packages using npm:

   ```bash
   npm install express googleapis dotenv cors
   ```

2. Create a `.env` file in the project directory and provide your YouTube API key:

   ```
   YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY
   ```

3. Replace `YOUR_YOUTUBE_API_KEY` with your actual YouTube API key.

### 3. Configuration <a name="configuration"></a>

In the provided code, the server configuration and API key are loaded from environment variables using the `dotenv` package. Make sure to create a `.env` file and set the `YOUTUBE_API_KEY` variable.

### 4. API Endpoints <a name="api-endpoints"></a>

The server exposes the following API endpoint:

#### GET `/getTotalViewCount`

This endpoint retrieves the total view count for videos related to a given search keyword.

- Request Query Parameters:
  - `searchKeyword` (optional): The keyword to search for on YouTube. Default value is "dubai".

- Response:
  - If successful, responds with a JSON object containing the `totalViewCount` of the videos related to the search keyword.
  - In case of an error, responds with a JSON object containing an `error` message and a 500 status code.

### 5. Functions <a name="functions"></a>

The provided code includes several functions:

#### `getSearchVolume(searchKeyword)`

This function uses the YouTube API to search for videos related to the given search keyword and calculates the median view count of the retrieved videos.

- Parameters:
  - `searchKeyword`: The keyword to search for on YouTube.

- Returns:
  - The calculated median view count of the retrieved videos.

#### `calculateMedian(arr)`

This function calculates the median value of an array of numbers.

- Parameters:
  - `arr`: An array of numbers.

- Returns:
  - The calculated median value.

---

Feel free to use, modify, and enhance this server code to meet your specific requirements. Make sure to handle errors, rate limiting, and other considerations when using APIs in a production environment.
