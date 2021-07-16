import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import getCarsData from '../../store/actions/get_cars_action';
import Card from '../../components/Card/Card';
import classes from './Cars.module.css';

const Cars = () => {
  const carsData = useSelector((state) => state.userInfo.cars);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarsData());
  }, []);

  const renderCars = () => {
    if (carsData) {
      return (
        <>
          <div className={classes.cars}>
            {carsData.map((car) => (
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
