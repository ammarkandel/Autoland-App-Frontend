/* eslint-disable */
import { authActions } from '../slices/AuthSlice';

const testDrive = (appointmentData) => async (dispatch) => {
    dispatch(
      authActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Wait Booking test drive',
      }),
    );

  const sendRequest = async () => {
    //let token = "Bearer " + localStorage.getItem("jwt");
    const data = `appointment[date]=${appointmentData.date}
                  &appointment[time]=${appointmentData.time}
                  &appointment[user_id]=${appointmentData.user_id}
                  &appointment[car_id]=${appointmentData.car_id}`;
    const response = await fetch(
      'https://autoland-api.herokuapp.com/appointments.json',
      {
        method: 'POST',
        headers: {
          //'Authorization': token,
          'Content-type': 'application/x-www-form-urlencoded',
        },
        body: data.replace(/\s/g, ''),
      },
    );

    if (!response.ok) {
      throw new Error('Booking is failed!');
    }
  };

  try {
    await sendRequest();
    dispatch(
      authActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Test drive is booked',
      }),
    );
    setTimeout(() => {
      dispatch(
        authActions.hideNotification({
          status: 'hide',
        }),
      );
    }, 2000)
  } catch (error) {
    dispatch(
      authActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Booking failed!',
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

export default testDrive;
