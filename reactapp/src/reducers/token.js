import axios from "axios";

const newsAPIWS = axios.create({
  baseURL: "http://localhost:3000",
});

export default function (token = "", action) {
  if (action.type === "addToken") {
    const tempToken = action.token;
    return tempToken;
  } else {
    return token;
  }
}
