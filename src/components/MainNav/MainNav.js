/* eslint-disable */
import classes from './MainNav.module.css';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/slices/AuthSlice';

const MainNav = () => {
  const dispatch = useDispatch();
  const auth = localStorage.getItem("auth");
  const logoutHandler = () => {
    dispatch(authActions.askAuth())
    localStorage.setItem("auth", "false");
    dispatch(
      authActions.showNotification({
        status: 'success',
        title: 'Logout!',
        message: 'Logout successfully!',
      }),
    );
  };

  return (
  <nav className={classes.main_nav}>
    <h1>
      Auto
      <span className={classes.logo}>land</span>
    </h1>

      <ul className={classes.nav_links}>
        {auth == "true" && (
          <>
            <li><Link to="/login" onClick={() => logoutHandler()}>Logout</Link></li>
            <li><NavLink to="/appointments">Appointments</NavLink></li>
          </>
        )}
      </ul>
  </nav>
  )
};

export default MainNav;
