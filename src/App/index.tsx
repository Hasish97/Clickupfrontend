import React, { Component, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
import "../../node_modules/font-awesome/scss/font-awesome.scss";
import Loader from "./layout/Loader";
import ScrollToTop from "./layout/ScrollToTop";
import routes from "../route";
const AdminLayout = Loadable({
  loader: () => import("./layout/AdminLayout"),
  loading: Loader
});
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
            
            </Switch>
          </Suspense>
        </ScrollToTop>
      </>
    );
  }
}
export default App;
