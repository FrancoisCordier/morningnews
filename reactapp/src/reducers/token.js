export default function (token = "", action) {
  if (action.type === "addToken") {
    const tempToken = action.token;
    return tempToken;
  } else {
    return token;
  }
}
