/* eslint-disable */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../../components/Card/Card';
import { userActions } from '../../store/slices/UserDataSlice';
import { authActions } from '../../store/slices/AuthSlice';
import classes from './Appointments.module.css';
import { useGetAppointmentsQuery } from '../../store/actions/get_appointments';

const Appointments = () => {
  const userId = useSelector((state) => state.userInfo).user.sub;
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetAppointmentsQuery();

  useEffect(() => {
    dispatch(userActions.userData());
    if (isLoading) {
      dispatch(
        authActions.showNotification({ status: 'pending', message: 'Loading Your Appointments....' }),
      );
      setTimeout(() => {
        dispatch(
          authActions.hideNotification({ status: 'hide' }),
        );
      }, 2000);
    } else if (isError) {
      dispatch(
        authActions.showNotification({ status: 'error', message: 'Error while get appointments' }),
      );
      setTimeout(() => {
        dispatch(
          authActions.hideNotification({ status: 'hide' }),
        );
      }, 2000);
    }
  }, []);

  const renderAppointments = () => {
    if (data && data.length > 0) {
      const allUserAppointments = data.filter((appointment) => appointment.user_id == userId);
      return (
        <>
          <div className={classes.appointments}>
            {data.map((appointment) => (
              <Card key={appointment.id}>
                <h3>
                  Date:
                  {appointment.date}
                </h3>
                <h3>
                  Time:
                  {appointment.time}
                </h3>
              </Card>
            ))}
          </div>
        </>
      );
    }

    return (
      <h2>Currently you don t have any appointments yet </h2>
    );
  };

  return (
    <>
      {renderAppointments()}
    </>
  );
};

export default Appointments;
