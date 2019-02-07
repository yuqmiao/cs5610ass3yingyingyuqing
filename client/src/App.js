import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import SavedBooks from "./pages/SavedBooks";
import SearchBooks from "./pages/SearchBooks";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Footer from "./components/Footer"


function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={SearchBooks} />
          {/* <Route exact path="/saved" component={SavedBooks} */}
          {/* <Route exact path="/saved/:id" component={SavedBooks} /> */}
          <Route component={NoMatch} /> 
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
