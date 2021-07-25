import { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      const allUserAppointments = data.filter((appointment) => appointment.user_id == userId).reverse();
      return (
        <>
          <h2 className={classes.title}>All Appointments You Booked</h2>
          <List>
            {allUserAppointments.map((appointment, index) => (
              <Card key={appointment.id}>
                <span>{allUserAppointments.length - index}</span>
                <p className={classes.appointment_info}>
                  <span>The date to test the car ::  </span>
                  {appointment.date}
                </p>
                <p className={classes.appointment_info}>
                  <span>The time to test the car ::  </span>
                  {appointment.time}
                </p>
                <p className={classes.appointment_info}>
                  <span>Ordered at ::  </span>
                  {appointment.created_at.split('T')[0]}
                </p>
                <Link className="car_details_btn" to={`/cars/:${appointment.car_id}`}>About</Link>
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
