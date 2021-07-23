import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card/Card';
import List from '../../components/List/List';
import classes from './Appointments.module.css';
import { useGetAppointmentsQuery } from '../../store/services/appointment_slice';
import { userActions } from '../../store/slices/UserDataSlice';

const Appointments = () => {
  const dispatch = useDispatch();
  const { data = [], isLoading, isError } = useGetAppointmentsQuery();
  const userId = useSelector((state) => state.userInfo).user.sub;
  useEffect(() => {
    dispatch(userActions.userData());
  }, []);

  const renderAppointments = () => {
    if (data && data.length > 0) {
      const allUserAppointments = data.filter((appointment) => appointment.user_id == userId);
      return (
        <>
          <h2 className={classes.title}>All Appointments You Booked</h2>
          <List>
            {allUserAppointments.map((appointment) => (
              <Card key={appointment.id}>
                <p className={classes.appointment_info}>
                  <span>Date ::  </span>
                  {appointment.date}
                </p>
                <p className={classes.appointment_info}>
                  <span>Time ::  </span>
                  {appointment.time}
                </p>
              </Card>
            ))}
          </List>
        </>
      );
    }

    return (
      <>
        {isLoading && <h2>Loading Appointments............</h2>}
        {isError && <h2>Something went wrong while fetching appointments data</h2>}
      </>
    );
  };

  return (
    <>
      {renderAppointments()}
    </>
  );
};

export default Appointments;
