/* eslint-disable */
import { authActions } from '../slices/AuthSlice';

const login = (loginData) => {
  return async (dispatch) => {
    dispatch(
      authActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Wait login',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        'http://localhost:3000/auth/signin',
        {
          method: 'POST',
          body: JSON.stringify(loginData),
        }
      );

      if (!response.ok) {
        throw new Error('Login failed!');
      }
    };

    try {
      await sendRequest();

      dispatch(
        authActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Login successfully!',
        })
      );
    } catch (error) {
      dispatch(
        authActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Login failed!',
        })
      );
    }
  };
};

export default login;
