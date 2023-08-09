const { google } = require("googleapis");
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.listen(3000, () => {
  console.log('Server is listening on port http://localhost:3000/');
});

app.get('/getTotalViewCount', async (req, res) => {
  try {
    // const searchKeyword = req.body || 'dubai';
    const searchKeyword = req.query.searchKeyword || 'dubai'; // Use the query parameter, default to 'dubai'
    console.log(searchKeyword);
    let totalViewCount = await getSearchVolume(searchKeyword);
    res.json({ totalViewCount });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const getSearchVolume = async (searchKeyword) => {
  const apiKey = "AIzaSyB5UobEBgOMSqjKALU0o5kY36Y8Obp4itQ";
  const youtube = google.youtube({
    version: "v3",
    auth: apiKey,
  });

  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const publishedAfter = firstDayOfMonth.toISOString();
  const publishedBefore = lastDayOfMonth.toISOString();

  const response = await youtube.search.list({
    q: searchKeyword,
    type: "video",
    part: "id",
    maxResults: 10,
    publishedAfter: publishedAfter,
    publishedBefore: publishedBefore,
    order: "relevance",
  });

  let videoViews = [];
  const searchResults = response.data.items || [];
  for (const searchResult of searchResults) {
    const videoId = searchResult.id.videoId;

    // Use the videoId to retrieve video statistics
    const videoResponse = await youtube.videos.list({
      part: "statistics",
      id: videoId,
    });

    if (videoResponse.data.items.length > 0) {
      const viewCount = parseInt(
        videoResponse.data.items[0].statistics.viewCount
      );
      videoViews.push(viewCount);
    }
  }

  const ans = calculateMedian(videoViews);

  return ans;
};


function calculateMedian(arr) {
  arr.sort((a, b) => a - b);

  const length = arr.length;
  const middleIndex = Math.floor(length / 2);

  if (length % 2 === 0) {
    const middleValue1 = arr[middleIndex - 1];
    const middleValue2 = arr[middleIndex];
    return (middleValue1 + middleValue2) / 2;
  } else {
    return arr[middleIndex];
  }
}
