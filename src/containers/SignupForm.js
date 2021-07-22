/* eslint-disable */
import { useDispatch } from 'react-redux';
import useInput from '../hooks/use-input';
import { useAddSignupMutation } from '../store/services/signup_slice';
import { authActions } from '../store/slices/AuthSlice';

const isPassword = (value) => value.length >= 6;
const isUsername = (value) => value.length > 3;
const isEmail = (value) => value.length > 5 && value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

const SignupForm = () => {
  const dispatch = useDispatch();
  const [
    addSignup,
    { isLoading: isAdding },
  ] = useAddSignupMutation();

  const {
    value: usernameValue,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsername,
  } = useInput(isUsername);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isPassword);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  let formIsValid = false;

  if (passwordIsValid && emailIsValid && usernameIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const signupData = {
      username: usernameValue,
      email: emailValue,
      password: passwordValue,
      password_confirmation: passwordValue,
    };

    const sendSignupData = `user[username]=${signupData.username}&user[email]=${signupData.email}
                 &user[password]=${signupData.password}
                 &user[password_confirmation]=${signupData.password}`;

    dispatch(
      authActions.showNotification({ status: 'pending', message: 'Signup....' }),
    );
    addSignup(sendSignupData.replace(/\s/g, ''));
    dispatch(
      authActions.showNotification({ status: 'success', message: 'Signup successfuly' }),
    );
    setTimeout(() => {
      dispatch(
        authActions.hideNotification({ status: 'hide' }),
      );
    }, 2000);

    resetPassword();
    resetEmail();
    resetUsername();
  };

  const usernameClasses = usernameHasError ? 'form-control invalid' : 'form-control';
  const passwordClasses = passwordHasError ? 'form-control invalid' : 'form-control';
  const emailClasses = emailHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={submitHandler} className="form">
      <h2>Sign up</h2>
      <div className={usernameClasses}>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            id="username"
            value={usernameValue}
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
           />
          </label>
        {usernameHasError && <p className="error-text">Please enter a valid username</p>}
      </div>
      <div className={emailClasses}>
        <label htmlFor="email">
          E-Mail Address
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
        <div className={passwordClasses}>
          <label htmlFor="password">
            Password confirmation
            <input
              type="password"
              value={passwordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
          </label>
          {passwordHasError && <p className="error-text">Please enter a valid password[At least 6 characters]</p>}
        </div>
        <div className="form-actions">
          <button type="submit" disabled={!formIsValid}>Submit</button>
          <a href="login">Login if you already have account</a>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
