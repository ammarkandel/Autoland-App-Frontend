import PropTypes from 'prop-types';
import MainNav from './MainNav/MainNav';

const Layout = (props) => {
  const { children } = props;

  return (
    <>
      <MainNav />
      <main>
        { children }
      </main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
