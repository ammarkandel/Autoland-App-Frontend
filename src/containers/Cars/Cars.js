import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetCarsQuery } from '../../store/actions/get_cars_action';
import { authActions } from '../../store/slices/AuthSlice';
import Card from '../../components/Card/Card';
import classes from './Cars.module.css';

const Cars = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetCarsQuery();

  useEffect(() => {
    if (isLoading) {
      dispatch(
        authActions.showNotification({ status: 'pending', message: 'Loading Cars.......' }),
      );
      setTimeout(() => {
        dispatch(
          authActions.hideNotification({
            status: 'hide',
          }),
        );
      }, 2000);
    } else if (isError) {
      dispatch(
        authActions.showNotification({ status: 'error', message: 'Error while get cars' }),
      );
      setTimeout(() => {
        dispatch(
          authActions.hideNotification({ status: 'hide' }),
        );
      }, 2000);
    }
  }, [dispatch]);

  const renderCars = () => {
    if (data) {
      return (
        <>
          <div className={classes.cars}>
            {data.map((car) => (
              <Card key={car.id}>
                <h3>
                  Name:
                  {car.name}
                </h3>
                <h3>
                  Category:
                  {car.category}
                </h3>
                <Link className={classes.detail_btn} to={`/cars/:${car.id}`}>Details</Link>
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
      {renderCars()}
    </>
  );
};

export default Cars;
