import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { AuthAction } from "../../context/Auth-Redux";
// import { authAction } from "../../Context/auth-redux";
import classes from "./Header.module.css";

const Header = () => {
  const Auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const logoutHandler = () => {
    const logout = window.confirm("Are You Sure");
    if (logout) {
      dispatch(AuthAction.logout());
      history.replace("/Login");
    }
  };

  return (
    <header className={classes.header}>
      <div className={classes["header-item"]}>
        {Auth.isLogin && (
          <NavLink to="/Home" activeClassName={classes.active}>
            <span>Home</span>
          </NavLink>
        )}
        {Auth.isLogin && (
          <NavLink to="/Inbox" activeClassName={classes.active}>
            <span>Inbox</span>
          </NavLink>
        )}
        {Auth.isLogin && (
          <NavLink to="/Sent" activeClassName={classes.active}>
            <span>Sent</span>
          </NavLink>
        )}
        {!Auth.isLogin && (
          <NavLink to={"/Login"} activeClassName={classes.active}>
            <span>Login</span>
          </NavLink>
        )}
        {!Auth.isLogin && (
          <NavLink to={"/SignUp"} activeClassName={classes.active}>
            <span>SignUp</span>
          </NavLink>
        )}
        {Auth.isLogin && <span onClick={logoutHandler}>Logout</span>}
      </div>
    </header>
  );
};

export default Header;
