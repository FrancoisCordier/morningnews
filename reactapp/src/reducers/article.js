export default function (favoriteArticles = [], action) {
  if (action.type === "addArticle") {
    return [...favoriteArticles, action.article];
  } else if (action.type === "removeArticle") {
    return favoriteArticles.filter((el) => el.title !== action.title);
  } else {
    return favoriteArticles;
  }
}
