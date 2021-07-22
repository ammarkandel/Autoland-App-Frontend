import { render, fireEvent, wait } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/index';
import TestDriveForm from '../containers/CarDetails/TestDriveForm/TestDriveForm';

test('Test form validation if user add invalid inputs', async () => {
  const { getByLabelText, getByRole, getByText } = render(
  <Provider store={store}>
    <TestDriveForm />
  </Provider>
  );
  const dateInput = getByLabelText(/Date:/i);
  const timeInput = getByLabelText(/Time:/i);
  const submitBtn = getByText(/Submit/i);
  fireEvent.change(dateInput, { 'target': { 'value': '' } });
  fireEvent.change(timeInput, { 'target': { 'value': '' } });
  fireEvent.click(submitBtn);
  expect(submitBtn).toHaveAttribute('disabled');
})

test('Test form validation if user add valid inputs', async () => {
  const { getByLabelText, getByRole, getByText } = render(
  <Provider store={store}>
    <TestDriveForm />
  </Provider>
  );
  const dateInput = getByLabelText(/Date:/i);
  const timeInput = getByLabelText(/Time:/i);
  const submitBtn = getByText(/Submit/i);
  fireEvent.change(dateInput, { 'target': { 'value': '2/12/2005' } });
  fireEvent.change(timeInput, { 'target': { 'value': '2:15:00' } });
  fireEvent.click(submitBtn);
  expect(submitBtn).not.toHaveAttribute('disabled=""');
})
