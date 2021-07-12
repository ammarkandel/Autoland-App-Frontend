/* eslint-disable */
import { authActions } from '../slices/AuthSlice';
import { userActions } from '../slices/UserDataSlice';

const getAppointmentsData = () => async (dispatch) => {
  dispatch(
    authActions.showNotification({
      status: 'pending',
      title: 'Loading....',
      message: 'Loading Appointments',
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
      'http://localhost:3001/user_appointments.json',
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
      dispatch(userActions.getAppointments(data));
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
        message: 'Error while get appointments',
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

export default getAppointmentsData;
