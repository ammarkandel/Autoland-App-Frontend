import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/index';
import SignupForm from '../containers/SignupForm';

test('Test form validation if user add invalid inputs', async () => {
  const { getByLabelText, getByText } = render(
  <Provider store={store}>
    <SignupForm />
  </Provider>
  );

  const passwordInput = getByLabelText(/Password:/i);
  const emailInput = getByLabelText(/E-Mail/i);
  const submitBtn = getByText(/Submit/i);

  fireEvent.change(passwordInput, { 'target': { 'value': '1678' } });
  fireEvent.change(emailInput, { 'target': { 'value': 'test123gmailcom' } });
  fireEvent.click(submitBtn);
  expect(submitBtn).toHaveAttribute('disabled');
})

test('Test form validation if username is empty', async () => {
  const { getByLabelText, getByText } = render(
  <Provider store={store}>
    <SignupForm />
  </Provider>,
  );

  const usernameInput = getByLabelText(/Username:/i);
  const passwordInput = getByLabelText(/Password:/i);
  const emailInput = getByLabelText(/E-Mail/i);
  const submitBtn = getByText(/Submit/i);

  fireEvent.change(usernameInput, { 'target': { 'value': '' } });
  fireEvent.change(passwordInput, { 'target': { 'value': '12345678' } });
  fireEvent.change(emailInput, { 'target': { 'value': 'test123@gmail.com' } });
  fireEvent.click(submitBtn);
  expect(submitBtn).toHaveAttribute('disabled');
})

test('Test form validation if user add valid inputs', async () => {
  const { getByLabelText, getByText } = render(
  <Provider store={store}>
    <SignupForm />
  </Provider>,
  );
  const usernameInput = getByLabelText(/Username:/i);
  const passwordInput = getByLabelText(/Password:/i);
  const emailInput = getByLabelText(/E-Mail/i);
  const submitBtn = getByText(/Submit/i);

  fireEvent.change(usernameInput, { 'target': { 'value': 'test name' } });
  fireEvent.change(passwordInput, { 'target': { 'value': '12345678' } });
  fireEvent.change(emailInput, { 'target': { 'value': 'test123@gmail.com' } });
  fireEvent.click(submitBtn);
  expect(submitBtn).not.toHaveAttribute('disabled=""');
})
