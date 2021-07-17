import { render, fireEvent, wait } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/index';
import LoginForm from '../containers/LoginForm';
import login from '../store/actions/login_action';

jest.mock('../store/actions/login_action');

test('Test login form', async () => {
   const { getByText, getByLabelText, debug } = render(
     <Provider store={store}>
       <LoginForm />
     </Provider>
   );

   const passwordInput = getByLabelText(/Password:/i);
   const emailInput = getByLabelText(/E-Mail/i);
   const submitBtn = getByText(/Submit/i);
   fireEvent.change(passwordInput, { 'target': { 'value': '12345678' } });
   fireEvent.change(emailInput, { 'target': { 'value': 'test123@gmail.com' } });
   fireEvent.click(submitBtn);
   expect(login).toHaveBeenCalledTimes(1);
})

test('Test form validation if user add invalid inputs', async () => {
  const { getByLabelText, getByRole, getByText } = render(
  <Provider store={store}>
    <LoginForm />
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

test('Test form validation if user add valid inputs', async () => {
  const { getByLabelText, getByRole, getByText } = render(
  <Provider store={store}>
    <LoginForm />
  </Provider>
);
  const passwordInput = getByLabelText(/Password:/i);
  const emailInput = getByLabelText(/E-Mail/i);
  const submitBtn = getByText(/Submit/i);
  fireEvent.change(passwordInput, { 'target': { 'value': '12345678' } });
  fireEvent.change(emailInput, { 'target': { 'value': 'test123@gmail.com' } });
  fireEvent.click(submitBtn);
  expect(submitBtn).not.toHaveAttribute('disabled');
})
