export default function (language = "", action) {
  if (action.type === "setLanguage") {
    return action.language;
  } else {
    return language;
  }
}
