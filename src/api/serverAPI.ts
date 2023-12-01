import axios from "axios";

const instance = axios.create({
  // baseURL: "https://f73f-2600-4041-41f3-5b00-3cc5-f616-d3c1-1623.ngrok.io",
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

const setAuthToken = (token: string) => {
  if (token) {
    // Apply the token to every request header
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // If no token is provided, remove the authorization header
    delete instance.defaults.headers.common["Authorization"];
  }
};

export { instance, setAuthToken };
