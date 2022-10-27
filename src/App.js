import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Home from "./components/Layout/Home/Home";
import { useEffect } from "react";
import { AuthAction } from "./context/Auth-Redux";

function App() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  console.log(isLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("login"));
    if (login) {
      dispatch(AuthAction.login(login));
    }
  });

  return (
    <div className="App">
      <Switch>
        {!isLogin && (
          <Route path={"/Login"}>
            <Login />
          </Route>
        )}
        {!isLogin && (
          <Route path={"/SignUp"}>
            <SignUp />
          </Route>
        )}
        {isLogin && (
          <Route path={"/Home"}>
            <Home />
          </Route>
        )}
        {isLogin && (
          <Route path={"*"}>
            <Redirect to="Home" />
          </Route>
        )}
        {!isLogin && (
          <Route path={"*"}>
            <Redirect to="login" />
          </Route>
        )}
      </Switch>
    </div>
  );
}

export default App;
