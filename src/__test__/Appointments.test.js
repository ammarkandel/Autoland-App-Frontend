import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/index';
import Appointments from '../containers/Appointments/Appointments';
import getAppointments from '../store/services/get_appointments_slice';
import { useGetAppointmentsQuery } from '../store/services/get_cars_slice';

test('Check if we have list of appointments with date and time', async () => {
  const { getByText } = render(
  <Provider store={store}>
    <Appointments />
  </Provider>
  );

  const test =  async () => {
    const { data } = useGetAppointmentsQuery();
    data.map((item) => {
      expect(getByText(`Date:${item.date}`)).toBeInTheDocument();
      expect(getByText(`Time:${item.time}`)).toBeInTheDocument();
    })
  }
});
