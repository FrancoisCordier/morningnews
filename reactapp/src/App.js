import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScreenHome from "./ScreenHome";
import ScreenArticlesBySource from "./ScreenArticlesBySource";
import ScreenMyArticles from "./ScreenMyArticles";
import ScreenSource from "./ScreenSource";
import favoriteArticles from "./reducers/article";
import token from "./reducers/token";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

const store = createStore(combineReducers({ favoriteArticles, token }));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={ScreenHome} />
          <Route path="/screenmyarticles" component={ScreenMyArticles} />
          <Route
            path="/screenarticlesbysource/:id"
            component={ScreenArticlesBySource}
          />
          <Route path="/screensource" component={ScreenSource} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
