/* eslint-disable */
import PropTypes from 'prop-types';
import MainNav from './MainNav/MainNav';
import classes from './Layout.module.css';

const Layout = (props) => {
  const { children } = props;

  return (
    <>
      <MainNav />
      <main className={classes.main}>
        { children }
      </main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
