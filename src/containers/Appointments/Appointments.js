import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card/Card';
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
          <div className={classes.appointments}>
            {allUserAppointments.map((appointment) => (
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
