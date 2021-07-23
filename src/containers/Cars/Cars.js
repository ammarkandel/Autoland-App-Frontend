import { Link } from 'react-router-dom';
import { useGetCarsQuery } from '../../store/services/get_cars_slice';
import Card from '../../components/Card/Card';
import classes from './Cars.module.css';
import carImg from '../../assets/Tesla-Model-S.png';

const Cars = () => {
  const { data, isLoading, isError } = useGetCarsQuery();

  const renderCars = () => {
    if (data) {
      return (
        <>
          <div className={classes.cars}>
            {data.map((car) => (
              <Card key={car.id}>
                <img src={carImg} alt={car.name} height="150" width="220" />
                <div className={classes.info}>
                  <p>
                    <span>Name :: </span>
                    {car.name}
                  </p>
                  <p>
                    <span>Category :: </span>
                    {car.category}
                  </p>
                </div>
                <Link className={`${classes.detail_btn} details`} to={`/cars/:${car.id}`}>Details</Link>
              </Card>
            ))}
          </div>
        </>
      );
    }

    return (
      <>
        {isLoading && <h2>Loading Cars............</h2>}
        {isError && <h2>Something went wrong while fetching cars data</h2>}
      </>
    );
  };

  return (
    <>
      {renderCars()}
    </>
  );
};

export default Cars;
