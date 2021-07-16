import { authActions } from '../slices/AuthSlice';

const login = (loginData) => async (dispatch) => {
  dispatch(
    authActions.showNotification({
      status: 'pending',
      title: 'Sending...',
      message: 'Wait login',
    }),
  );

  const sendRequest = async () => {
    const response = await fetch(
      'https://autoland-api.herokuapp.com/auth/signin.json',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        body: `auth[email]=${loginData.email}&auth[password]=${loginData.password}`,
      },
    );
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('jwt', data.jwt);
    } else {
      throw new Error('Login failed!');
    }
  };

  try {
    await sendRequest();
    dispatch(
      authActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sign in successfully!',
      }),
    );
    setTimeout(() => {
      dispatch(
        authActions.hideNotification({
          status: 'hide',
        }),
      );
    }, 2000);
    window.location.href = `${window.location.origin}/cars`;
  } catch (error) {
    dispatch(
      authActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sign in failed!',
      }),
    );
    setTimeout(() => {
      dispatch(
        authActions.hideNotification({
          status: 'hide',
        }),
      );
    }, 2000);
  }
};

export default login;
