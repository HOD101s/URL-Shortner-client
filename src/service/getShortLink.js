import axios from "axios";
if (process.env.NODE_ENV != "production") {
  axios.defaults.baseURL = "http://127.0.0.1:5000";
}
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
