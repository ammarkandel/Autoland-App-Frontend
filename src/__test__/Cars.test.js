import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/index';
import Cars from '../containers/Cars/Cars';
import getCars from '../store/services/get_cars_slice';
import { useGetCarsQuery } from '../store/services/get_cars_slice';


test('Check if we have list of cars with details btn, names and categories', async () => {
  const { getByText } = render(
  <Provider store={store}>
    <Cars />
  </Provider>
  );

  const test = () => {
    const { data } = useGetCarsQuery();
    data.map((item) => {
      expect(getByText(`Name:${item.name}`)).toBeInTheDocument();
      expect(getByText(`Category:${item.category}`)).toBeInTheDocument();
    })
    expect(getByText('Details')).toBeInTheDocument();
  }
});
