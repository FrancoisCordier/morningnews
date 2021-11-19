import axios from "axios";

const newsAPIWS = axios.create({
  baseURL: "http://localhost:3000",
});

export default function (favoriteArticles = [], action) {
  if (action.type === "addArticle") {
    newsAPIWS.post("/add-to-favorite", {
      token: action.token,
      article: action.article,
    });
    return [...favoriteArticles, action.article];
  } else if (action.type === "removeArticle") {
    newsAPIWS.delete("/remove-from-favorite", {
      params: {
        title: action.title,
        token: action.token,
      },
    });
    return favoriteArticles.filter((el) => el.title !== action.title);
  } else if (action.type === "initializeStore") {
    const tempFav = action.user.favoriteArticles;
    return tempFav;
  } else {
    return favoriteArticles;
  }
}
