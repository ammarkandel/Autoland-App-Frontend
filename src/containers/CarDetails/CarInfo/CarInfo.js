import classes from '../CarDetails.module.css';

const CarInfo = ({ data, id }) => {
  let carsData = [];
  if (data && data.length > 0) {
    [carsData] = data.filter((car) => car.id == id);
  }
  return (
    <ul className={classes.details}>
      <li>
        <p>
          <span>Release year :: </span>
          {carsData.release_year}
        </p>
      </li>
      <li>
        <p>
          <span>Speed :: </span>
          {carsData.speed}
        </p>
      </li>
      <li>
        <p>
          <span>Price :: </span>
          {carsData.price}
        </p>
      </li>
      <li>
        <p>
          <span>Color :: </span>
          {carsData.color}
        </p>
      </li>
    </ul>
  );
};

export default CarInfo;
