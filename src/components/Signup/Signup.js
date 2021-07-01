/* eslint-disable */
import useInput from '../../hooks/use-input';

const isPassword = (value) => value.length >= 6;
const isUsername = (value) => value.length > 3;
const isEmail = (value) => value.length > 5 && value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

const Signup = () => {

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

  const submitHandler = event => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log('Submitted!');
    console.log(passwordValue, emailValue);

    resetPassword();
    resetConfirmationPassword();
    resetEmail();
  };

  const usernameClasses = usernameHasError ? 'form-control invalid' : 'form-control';
  const passwordClasses = passwordHasError ? 'form-control invalid' : 'form-control';
  const emailClasses = emailHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={submitHandler}>
      <div className={usernameClasses}>
        <label htmlFor='name'>Username</label>
        <input
          type='text'
          value={usernameValue}
          onChange={usernameChangeHandler}
          onBlur={usernameBlurHandler}
        />
        {usernameHasError && <p className="error-text">Please enter a valid username</p>}
      </div>
      <div className={emailClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input
          type='email'
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && <p className="error-text">Please enter a valid email address.</p>}
      </div>
      <div className='control-group'>
        <div className={passwordClasses}>
          <label htmlFor='name'>Password</label>
          <input
            type='password'
            value={passwordValue}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          {passwordHasError && <p className="error-text">Please enter a valid password[At least 6 characters]</p>}
        </div>
        <div className={passwordClasses}>
          <label htmlFor='name'>Password confirmation</label>
          <input
            type='password'
            value={passwordValue}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          {passwordHasError && <p className="error-text">Please enter a valid password[At least 6 characters]</p>}
        </div>
        <div className='form-actions'>
          <button disabled={!formIsValid}>Submit</button>
          <a href='login'>Login if you already have account</a>
        </div>
      </div>
    </form>
  );
};

export default Signup;
