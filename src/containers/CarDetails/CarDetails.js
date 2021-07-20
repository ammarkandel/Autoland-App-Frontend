import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/slices/UserDataSlice';
import { useGetCarsQuery } from '../../store/actions/get_cars_action';
import { authActions } from '../../store/slices/AuthSlice';
import CarInfo from './CarInfo/CarInfo';
import CarAppointments from './CarAppointments/CarAppointments';
import TestDriveForm from './TestDriveForm/TestDriveForm';

const CarDetails = () => {
  const { data: carData, isLoading, isError } = useGetCarsQuery();
  const dispatch = useDispatch();
  const id = useParams().id.slice(1);
  const userId = useSelector((state) => state.userInfo).user.sub;

  useEffect(() => {
    dispatch(userActions.userData());
    if (isLoading) {
      dispatch(
        authActions.showNotification({ status: 'pending', message: 'Loading The Car Details.....' }),
      );
      setTimeout(() => {
        dispatch(
          authActions.hideNotification({ status: 'hide' }),
        );
      }, 2000);
    } else if (isError) {
      dispatch(
        authActions.showNotification({ status: 'error', message: 'Error while get the car details' }),
      );
      setTimeout(() => {
        dispatch(
          authActions.hideNotification({ status: 'hide' }),
        );
      }, 2000);
    }
  }, []);

  return (
    <>
      <h3>- Tests drive booked -</h3>
      <CarAppointments id={id} userId={userId} />
      <h3>- Car Details -</h3>
      <CarInfo data={carData} id={id} />
      <TestDriveForm id={id} userId={userId} />
    </>
  );
};

export default CarDetails;
