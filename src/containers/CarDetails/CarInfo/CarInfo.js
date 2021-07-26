import detailsClasses from '../CarDetails.module.css';
import CarInfoClasses from './CarInfo.module.css';
import carImg from '../../../assets/Tesla-Model-S.png';

const CarInfo = ({ data, id }) => {
  let carsData = [];
  if (data && data.length > 0) {
    [carsData] = data.filter((car) => car.id == id);
  }
  return (
    <>
      <h1 className={CarInfoClasses.car_name}>{carsData.name}</h1>
      <img src={carImg} alt={carsData.name} width="60%" />
      <ul className={detailsClasses.details}>
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
    </>
  );
};

export default CarInfo;
