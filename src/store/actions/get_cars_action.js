/* eslint-disable */
import { authActions } from '../slices/AuthSlice';
import { userActions } from '../slices/UserDataSlice';

const getCarsData = () => async (dispatch) => {
  dispatch(
    authActions.showNotification({
      status: 'pending',
      title: 'Loading....',
      message: 'Loading Cars',
    }),
  );
  setTimeout(() => {
    dispatch(
      authActions.hideNotification({
        status: 'hide',
      }),
    );
  }, 2000)
  const sendRequest = async () => {
    let token = "Bearer " + localStorage.getItem("jwt");
    const response = await fetch(
      'http://localhost:3001/cars.json',
      {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-type': 'application/json',
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      dispatch(userActions.getCars(data));
    } else {
      throw new Error('Error while get cars');
    }
  };

  try {
    await sendRequest();
  } catch (error) {
    dispatch(
      authActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Error while get cars',
      }),
    );
    setTimeout(() => {
      dispatch(
        authActions.hideNotification({
          status: 'hide',
        }),
      );
    }, 2000)
  }
};

export default getCarsData;
