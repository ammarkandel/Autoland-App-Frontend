import useInput from '../../../hooks/use-input';
import { useAddTestDriveMutation } from '../../../store/services/appointment_slice';

const TestDriveForm = ({ id, userId }) => {
  const isEmpty = (str) => !str.trim().length;
  const isValidDate = (value) => !isEmpty(value);
  const isValidTime = (value) => !isEmpty(value);
  const [
    addTestDrive,
  ] = useAddTestDriveMutation();

  const {
    value: dateValue,
    isValid: dateIsValid,
    hasError: dateHasError,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    reset: resetDate,
  } = useInput(isValidDate);

  const {
    value: timeValue,
    isValid: timeIsValid,
    hasError: timeHasError,
    valueChangeHandler: timeChangeHandler,
    inputBlurHandler: timeBlurHandler,
    reset: resetTime,
  } = useInput(isValidTime);

  let formIsValid = false;

  if (dateIsValid && timeIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    const testDriveData = {
      date: dateValue,
      time: timeValue,
      userId,
      car_id: id,
    };

    const appointmentData = `appointment[date]=${testDriveData.date}
                  &appointment[time]=${testDriveData.time}
                  &appointment[user_id]=${testDriveData.userId}
                  &appointment[car_id]=${testDriveData.car_id}`;

    addTestDrive(appointmentData).then(() => {
      window.location.href = `${window.location.origin}/user_appointments`;
    });
    resetDate();
    resetTime();
  };

  const timeClasses = timeHasError ? 'form-control invalid' : 'form-control';
  const dateClasses = dateHasError ? 'form-control invalid' : 'form-control';

  return (
    <form className="appointment" onSubmit={submitHandler}>
      <h3>- Book test drive -</h3>
      <div className={dateClasses}>
        <label htmlFor="date">
          Date:
          <input
            type="date"
            id="date"
            value={dateValue}
            onChange={dateChangeHandler}
            onBlur={dateBlurHandler}
          />
        </label>
        {dateHasError && <p className="error-text">Please enter a valid date.</p>}
      </div>
      <div className={timeClasses}>
        <label htmlFor="time">
          Time:
          <input
            type="time"
            id="time"
            value={timeValue}
            onChange={timeChangeHandler}
            onBlur={timeBlurHandler}
          />
        </label>
        {timeHasError && <p className="error-text">Please enter a valid time.</p>}
      </div>
      <button type="submit" disabled={!formIsValid}>Submit</button>
    </form>
  );
};

export default TestDriveForm;
