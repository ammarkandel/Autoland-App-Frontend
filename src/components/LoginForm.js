/* eslint-disable */
import useInput from '../hooks/use-input';

const charNumber = (value) => value.length >= 6;
const isEmail = (value) => value.length > 5 && value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

const LoginForm = () => {

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

  const submitHandler = event => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log('Submitted!');
    console.log(passwordValue, emailValue);

    resetPassword();
    resetEmail();
  };

  const passwordClasses = passwordHasError ? 'form-control invalid' : 'form-control';
  const emailClasses = emailHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={submitHandler} className='form'>
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
        <div className='form-actions'>
          <button disabled={!formIsValid}>Submit</button>
          <a href='signup'>Signup if you not have account</a>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
