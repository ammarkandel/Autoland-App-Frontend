/* eslint-disable */
import { useDispatch } from 'react-redux';
import useInput from '../hooks/use-input';
import login from '../store/services/login_action';
import { authActions } from '../store/slices/AuthSlice';

const charNumber = (value) => value.length >= 6;
const isEmail = (value) => value.length > 5 && value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

const LoginForm = () => {
  const dispatch = useDispatch();

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(charNumber);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  let formIsValid = false;

  if (passwordIsValid && emailIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const loginData = {
      email: emailValue,
      password: passwordValue,
    };

    dispatch(login(loginData));
    resetPassword();
    resetEmail();
  };

  const passwordClasses = passwordHasError ? 'form-control invalid' : 'form-control';
  const emailClasses = emailHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={submitHandler} className="form">
      <h2>Login</h2>
      <div className={emailClasses}>
        <label htmlFor="email">
          E-Mail Address:
          <input
            type="email"
            id="email"
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
        </label>
        {emailHasError && <p className="error-text">Please enter a valid email address.</p>}
      </div>
      <div className="control-group">
        <div className={passwordClasses}>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              id="password"
              value={passwordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
          </label>
          {passwordHasError && <p className="error-text">Please enter a valid password[At least 6 characters]</p>}
        </div>
        <div className="form-actions">
          <button type="submit" disabled={!formIsValid}>Submit</button>
          <a href="signup">Signup if you not have account</a>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
