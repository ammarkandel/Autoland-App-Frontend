// import React from 'react';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authActions } from '../store/slices/AuthSlice';
import { userActions } from '../store/slices/UserDataSlice';

const SecureRoute = (props) => {
  const dispatch = useDispatch();
  const auth = localStorage.getItem('jwt');
  const userId = useSelector((state) => state.userInfo).user.sub;
  useEffect(() => {
    dispatch(userActions.userData());
  }, []);

  return (
    <Route
      path={props.path}
      render={(data) => {
        if (auth) {
          return (<props.component userId={userId} {...data} />);
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
