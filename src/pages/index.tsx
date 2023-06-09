import React, { Component, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
import "../../node_modules/font-awesome/scss/font-awesome.scss";
import Loader from "../App/layout/Loader";
import ScrollToTop from "../App/layout/ScrollToTop";
import routes from "../routes";

class App extends Component<{}, {}> {
  render() {
    const menu = routes.map((route, index) => {
      return route.component ? (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          render={props => <route.component {...props} />}
        />
      ) : null;
    });
    return (
      <>
        <ScrollToTop>
          <Suspense fallback={<Loader />}>
            <Switch>
              {menu}
            </Switch>
          </Suspense>
        </ScrollToTop>
      </>
    );
  }
}
export default App;
