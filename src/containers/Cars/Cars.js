import { Link } from 'react-router-dom';
import { useGetCarsQuery } from '../../store/services/get_cars_slice';
import Card from '../../components/Card/Card';
import classes from './Cars.module.css';

const Cars = () => {
  const { data, isLoading, isError } = useGetCarsQuery();

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
