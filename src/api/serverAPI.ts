import axios from "axios";

export default axios.create({
  // baseURL: "https://f73f-2600-4041-41f3-5b00-3cc5-f616-d3c1-1623.ngrok.io",
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});
