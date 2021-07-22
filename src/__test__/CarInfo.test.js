import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/index';
import CarInfo from '../containers/CarDetails/CarInfo/CarInfo';
import { useGetCarsQuery } from '../store/services/get_cars_slice';


test('Check if we have list of cars with details speed, color, price and release_year', async () => {
  const { getByText } = render(
  <Provider store={store}>
    <CarInfo />
  </Provider>
  );

  const test = () => {
    const { data } = useGetCarsQuery();
    data.map((item) => {
      expect(getByText(`Speed:${item.speed}`)).toBeInTheDocument();
      expect(getByText(`Release year:${item.release_year}`)).toBeInTheDocument();
      expect(getByText(`Price:${item.price}`)).toBeInTheDocument();
      expect(getByText(`Color:${item.color}`)).toBeInTheDocument();
    })
  }
});
