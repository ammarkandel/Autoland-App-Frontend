import PropTypes from 'prop-types';
import classes from '../CarDetails.module.css';
import { useGetAppointmentsQuery } from '../../../store/services/appointment_slice';

const CarAppointments = ({ id, userId }) => {
  const { data: appointmentInfo, isLoading } = useGetAppointmentsQuery();

  const renderCarAppoinments = () => {
    if (appointmentInfo) {
      const carAppointments = appointmentInfo.filter((appointment) => appointment.car_id == id && appointment.user_id == userId);
      if (carAppointments.length > 0) {
        return (
          <ul className={classes.details}>
            {carAppointments.map((item) => (
              <li key={item.id}>
                <h3>
                  <p>
                    <span>Date ::  </span>
                    {item.date}
                  </p>
                </h3>
                <h3>
                  <p>
                    <span>Time ::  </span>
                    {item.time}
                  </p>
                </h3>
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
