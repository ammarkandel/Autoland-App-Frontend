import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../../components/Card/Card';
import { userActions } from '../../store/slices/UserDataSlice';
import getAppointmentsData from '../../store/actions/get_user_appointments';
import classes from './Appointments.module.css';

const Appointments = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const userId = userInfo.user.sub;
  const { appointments } = userInfo;
  const allUserAppointments = appointments.filter((appointment) => appointment.user_id == userId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.userData());
    dispatch(getAppointmentsData());
  }, []);

  const renderAppointments = () => {
    if (allUserAppointments.length > 0) {
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
