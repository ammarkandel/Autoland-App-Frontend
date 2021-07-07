/* eslint-disable */
import classes from './MainNav.module.css';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/slices/AuthSlice';

const MainNav = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.askAuth())
    localStorage.clear();
    dispatch(
      authActions.showNotification({
        status: 'success',
        title: 'Logout!',
        message: 'Logout successfully!',
      }),
    );
    setTimeout(() => {
      dispatch(
        authActions.hideNotification({
          status: 'hide',
        }),
      );
    }, 1000)
  };
  const auth = localStorage.getItem("jwt");

  return (
  <nav className={classes.main_nav}>
    <h1>
      Auto
      <span className={classes.logo}>land</span>
    </h1>

      <ul className={classes.nav_links}>
        {auth && (
          <>
            <li><Link to="/login" onClick={() => logoutHandler()}>Logout</Link></li>
            <li><NavLink to="/appointments">Appointments</NavLink></li>
            <li><NavLink to="/cars">Cars</NavLink></li>
          </>
        )}
      </ul>
  </nav>
  )
};

export default MainNav;
