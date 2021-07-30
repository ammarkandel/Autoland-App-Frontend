import { Route, Redirect } from 'react-router-dom';

const SecureRoute = (props) => {
  const auth = localStorage.getItem('jwt');

  return (
    <Route
      path={props.path}
      render={(data) => {
        if (auth) {
          return (<props.component {...data} />);
        }
        return (
          <Redirect
            to={{ pathname: '/login' }}
          />
        );
      }}
    />
  );
};

export default SecureRoute;
