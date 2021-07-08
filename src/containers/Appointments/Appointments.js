/* eslint-disable */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../../components/Card/Card';
import { userActions } from '../../store/slices/UserDataSlice';
import getAppointmentsData from '../../store/actions/get_user_appointments';
import classes from './Appointments.module.css';

const Appointments = () => {
  const userId = useSelector((state) => state.userInfo.user).sub;
  const appointments = useSelector((state) => state.userInfo.appointments).filter((appointment) => appointment.user_id == userId );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.userData());
    dispatch(getAppointmentsData())
  }, [])

  const renderAppointments = () => {
    if (appointments) {
      return (
        <>
          <div className={classes.appointments}>
            {appointments.map((appointment) => (
              <Card key={appointment.id}>
                 <h3>Date: {appointment.date}</h3>
                 <h3>Time: {appointment.time}</h3>
              </Card>
            ))}
           </div>
        </>
      );
    }

    return null;
  };

  return (
    <>
      {renderAppointments()}
    </>
  )
};

export default Appointments;
