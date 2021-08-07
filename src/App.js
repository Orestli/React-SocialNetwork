import ProfileContainer from "./components/Profile/ProfileContainer";
import MessengerContainer from "./components/Messenger/MessengerContainer";
import UsersContainer from "./components/Users/UsersContainer";
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";

function App() {
  return (
    <Router>
        <div className="App">
            <HeaderContainer />
            <Route path="/profile/:userId?"
                   render={() => <ProfileContainer />} />
            <Route path="/messenger"
                   render={() => <MessengerContainer />} />
            <Route path="/users"
                   render={() => <UsersContainer />} />
            <Route path="/login"
                   render={() => <Login />} />
        </div>
    </Router>
  );
}

export default App;
