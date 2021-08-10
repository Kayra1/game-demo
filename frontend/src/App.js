import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import jwt_decode from "jwt-decode";
import { setCurrentUser } from "./actions/authActions";
import store from "./store"
import { Provider } from "react-redux";

import Login from "./components/Login"
import Account from "./components/Account";
import Game from "./components/Game"
import PrivateRoute from "./components/private-route/PrivateRoute";

// Check if the user has a JWT token
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken
  const decoded = jwt_decode(token)
  store.dispatch(setCurrentUser(decoded))
}


// Have to check for expired 

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          Hello World
        </div>
        <Route exact path="/login" component={Login}/>

        <Switch>
          <PrivateRoute exact path="/account" component={Account} />
          <PrivateRoute exact path="/game" component={Game} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
