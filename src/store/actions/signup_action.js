import { authActions } from '../slices/AuthSlice';

const signup = (signupData) => async (dispatch) => {
  dispatch(
    authActions.showNotification({
      status: 'pending',
      title: 'Sending...',
      message: 'Wait signup',
    }),
  );

  const sendRequest = async () => {
    const data = `user[username]=${signupData.username}&user[email]=${signupData.email}
                 &user[password]=${signupData.password}
                 &user[password_confirmation]=${signupData.password}`;
    const response = await fetch(
      '/auth/signup',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        body: data.replace(/\s/g, ''),
      },
    );

    if (!response.ok) {
      throw new Error('Signup failed!');
    }
  };

  try {
    await sendRequest();

    dispatch(
      authActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sign up successfully!',
      }),
    );
  } catch (error) {
    dispatch(
      authActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sign up failed!',
      }),
    );
  }
};

export default signup;
