import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import store from "./store"

import Login from "./components/Login"
import Account from "./components/Account";
import PrivateRoute from "./components/private-route/PrivateRoute";

// Check if the user has a JWT token
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken
  setAuthToken(token)
  const decoded = jwt_decode(token)
  store.dispatch(setCurrentUser(decoded))
}


// Have to check for expired 

function App() {
  return (
      <Router>
        <div>
          Hello World
        </div>
        <Route exact path="/login" component={Login}/>

        <Switch>
          <PrivateRoute exact path="/account" component={Account} />
        </Switch>
      </Router>
  );
}

export default App;
