import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/index';
import CarAppointments from '../containers/CarDetails/CarAppointments/CarAppointments';
import { useGetAppointmentsQuery } from '../store/services/get_appointments_slice';


test('Check if we have list of appointments in car details with details date and time', async () => {
  const { getByText } = render(
  <Provider store={store}>
    <CarAppointments id={'1'} />
  </Provider>
  );

  const testComponent = async () => {
    const { data } = useGetAppointmentsQuery();
    data.map((item) => {
      expect(getByText(`Date:${item.date}`)).toBeInTheDocument();
      expect(getByText(`Time:${item.time}`)).toBeInTheDocument();
    })
  }
});
