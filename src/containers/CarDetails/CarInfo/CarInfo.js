import classes from './CarInfo.module.css';

const CarInfo = ({ data, id }) => {
  let carsData = [];
  if (data && data.length > 0) {
    [carsData] = data.filter((car) => car.id == id);
  }
  return (
    <ul className={classes.details}>
      <li>
        Release year:
        {carsData.release_year}
      </li>
      <li>
        Speed:
        {carsData.speed}
      </li>
      <li>
        Price:
        {carsData.price}
      </li>
      <li>
        Color:
        {carsData.color}
      </li>
    </ul>
  );
};

export default CarInfo;
