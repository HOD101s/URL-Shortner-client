import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default async function getShortLink(longUrl) {
  try {
    const data = await axios.post(`/api/shorten`, {
      long_url: longUrl,
    });
    return data.data;
  } catch (e) {
    return;
  }
}