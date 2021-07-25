import PropTypes from 'prop-types';
import classes from '../CarDetails.module.css';
import carAppointmentsClasses from './CarAppointments.module.css';
import { useGetAppointmentsQuery } from '../../../store/services/appointment_slice';

const CarAppointments = ({ id, userId }) => {
  const { data: appointmentInfo, isLoading } = useGetAppointmentsQuery();

  const renderCarAppoinments = () => {
    if (appointmentInfo) {
      const carAppointments = appointmentInfo.filter((appointment) => appointment.car_id == id && appointment.user_id == userId).reverse();
      if (carAppointments.length > 0) {
        return (
          <ul className={`${classes.details} ${carAppointmentsClasses.overflow}`}>
            {carAppointments.map((item, index) => (
              <li key={item.id}>
                <span className="count">{carAppointments.length - index}</span>
                <h3>
                  <p>
                    <span>The date to test the car ::  </span>
                    {item.date}
                  </p>
                </h3>
                <h3>
                  <p>
                    <span>The time to test the car ::  </span>
                    {item.time}
                  </p>
                </h3>
                <p className={classes.appointment_info}>
                  <span>Ordered at ::  </span>
                  {item.created_at.split('T')[0]}
                </p>
              </li>
            ))}
          </ul>
        );
      }
      return (
        <>
          <h2>No booked test drive for this car yet</h2>
        </>
      );
    }
    return (
      <>
        {isLoading && <h2>Loading Car Appointments............</h2>}
      </>
    );
  };

  return (
    <>
      {renderCarAppoinments()}
    </>
  );
};

CarAppointments.propTypes = {
  id: PropTypes.string.isRequired,
  userId: PropTypes.number,
};

export default CarAppointments;
