import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import wishlist from "./reducers/article";
import token from "./reducers/token";
import { Provider } from "react-redux";

import { createStore, combineReducers } from "redux";
import "./App.css";
import ScreenHome from "./components/ScreenHome";
import ScreenArticlesBySource from "./components/ScreenArticlesBySource";
import ScreenMyArticles from "./components/ScreenMyArticles";
import ScreenSource from "./components/ScreenSource";

const store = createStore(combineReducers({ wishlist, token }));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={ScreenHome} />
          <Route path="/screensource" component={ScreenSource} />
          <Route
            path="/articlesbysource/:id"
            component={ScreenArticlesBySource}
          />
          <Route path="/myarticles" component={ScreenMyArticles} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
