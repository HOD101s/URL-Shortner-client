import axios from "axios";
if (process.env.NODE_ENV !== "production") {
  axios.defaults.baseURL = "http://127.0.0.1:5000";
}
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

// POST /api/shorteb
// expects {long_url: ''}
// returns short_url
export const getShortLink = async (longUrl, shortCode) => {
  try {
    var post_data = { long_url: longUrl };
    if (
      isValidShortCode(shortCode) &&
      (await isShortCodeAvailable(shortCode))
    ) {
      // shortCode set
      post_data.short_code = shortCode;
    } else if (shortCode) {
      // shortCode passed but not available
      return;
    }
    const data = await axios.post(`/api/shorten`, post_data);
    return data.data;
  } catch (e) {
    return;
  }
};

// validate shortcode
const isValidShortCode = (code) => {
  return code && code.length >= 5 && !/\s/g.test(code);
};

// GET /api/code_available
export const isShortCodeAvailable = async (short_code) => {
  try {
    if (!isValidShortCode(short_code)) return false;
    const data = await axios.get(`/api/code_available?code=${short_code}`);
    return data.status === 200;
  } catch (e) {
    return;
  }
};
