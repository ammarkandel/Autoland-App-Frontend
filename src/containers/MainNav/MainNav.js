import { NavLink, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/slices/AuthSlice';
import classes from './MainNav.module.css';

const MainNav = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.clear();
    dispatch(
      authActions.showNotification({
        status: 'success',
        message: 'Logout successfully!',
      }),
    );
    setTimeout(() => {
      dispatch(
        authActions.hideNotification({
          status: 'hide',
        }),
      );
    }, 1000);
  };
  const auth = localStorage.getItem('jwt');

  const checkAuth = () => {
    if (!auth) {
      dispatch(
        authActions.showNotification({
          status: 'error',
          message: 'Please Sign in first',
        }),
      );
      setTimeout(() => {
        dispatch(
          authActions.hideNotification({
            status: 'hide',
          }),
        );
      }, 1000);
    }
  };

  return (
    <nav className={classes.main_nav}>
      <h1>
        Auto
        <span className={classes.logo}>land</span>
      </h1>

      <ul className={classes.nav_links}>
        <li><NavLink to="/user_appointments" onClick={() => checkAuth()}>MyAppointments</NavLink></li>
        <li><NavLink to="/cars" onClick={() => checkAuth()}>Cars</NavLink></li>
        {auth && (
          <>
            <li><Link to="/login" onClick={() => logoutHandler()}>Logout</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default MainNav;
