import { useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { authActions } from '../store/slices/AuthSlice';

const SecureRoute = (props) => {
  const dispatch = useDispatch();
  const auth = localStorage.getItem('jwt');

  return (
    <Route
      path={props.path}
      render={(data) => {
        if (auth) {
          return (<props.component {...data} />);
        }
        dispatch(
          authActions.showNotification({
            status: 'error',
            title: 'Error!',
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
