/* eslint-disable */
import { authActions } from '../slices/AuthSlice';

const signup = (signupData) => {
  return async (dispatch) => {
    dispatch(
      authActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Wait Signing up',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        'http://localhost:3000/auth/signup',
        {
          method: 'POST',
          body: JSON.stringify(signupData),
        }
      );

      if (!response.ok) {
        throw new Error('Sign up failed!');
      }
    };

    try {
      await sendRequest();

      dispatch(
        authActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sign up successfully!',
        })
      );
      dispatch(authActions.askAuth());
    } catch (error) {
      dispatch(
        authActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sign up failed!',
        })
      );
    }
  };
};

export default signup;
