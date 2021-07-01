import classes from './MainNav.module.css';

const MainNav = () => (
  <nav className={classes.main_nav}>
    <h1>
      Auto
      <span className={classes.logo}>land</span>
    </h1>

    <ul className={classes.nav_links}>
      <li><a href="/">Logout</a></li>
      <li><a href="/appointments">Appointments</a></li>
    </ul>
  </nav>
);

export default MainNav;
