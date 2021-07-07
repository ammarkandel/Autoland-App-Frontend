/* eslint-disable */
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CarDetails = () => {
  const id = useParams().id.slice(1);
  const carsData = useSelector((state) => state.userInfo.cars[0]);
  console.log(carsData);
  return (
     <h1>Details of {id}</h1>
  )
}

export default CarDetails;
