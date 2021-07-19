/* eslint-disable */
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../../hooks/use-input';
import { userActions } from '../../store/slices/UserDataSlice';
import classes from './CarDetails.module.css';
import { useGetCarsQuery } from '../../store/actions/get_cars_action';
import CarAppointments from './CarAppointments';
import { authActions } from '../../store/slices/AuthSlice';
import { useAddTestDriveMutation } from '../../store/actions/book_appointment_action';
import CarInfo from './CarInfo';

const CarDetails = () => {
  const { data, isLoading, isError } = useGetCarsQuery();
  const dispatch = useDispatch();
  const id = useParams().id.slice(1);
  const userId = useSelector((state) => state.userInfo).user.sub;
  const [
    addTestDrive,
    { isLoading: isAdding },
  ] = useAddTestDriveMutation();

  useEffect(() => {
    dispatch(userActions.userData());
    if (isLoading) {
      dispatch(
        authActions.showNotification({ status: 'pending', message: 'Loading The Car Data.....' }),
      );
      setTimeout(() => {
        dispatch(
          authActions.hideNotification({ status: 'hide' }),
        );
      }, 2000);
    } else if (isError) {
      dispatch(
        authActions.showNotification({ status: 'error', message: 'Error while get the car data' }),
      );
      setTimeout(() => {
        dispatch(
          authActions.hideNotification({ status: 'hide' }),
        );
      }, 2000);
    }
  }, []);

  const isEmpty = (str) => !str.trim().length;
  const isValidDate = (value) => !isEmpty(value);
  const isValidTime = (value) => !isEmpty(value);

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

    addTestDrive(appointmentData);
    resetDate();
    resetTime();
  };

  const timeClasses = timeHasError ? 'form-control invalid' : 'form-control';
  const dateClasses = dateHasError ? 'form-control invalid' : 'form-control';

  return (
    <>
      <h3>- Tests drive booked -</h3>
      <CarAppointments id={id} userId={userId} />
      <h3>- Car Details -</h3>
      <CarInfo data={data} id={id} />
      <form className={classes.appointment} onSubmit={submitHandler}>
        <h3>- Book test drive -</h3>
        <div className={dateClasses}>
          <input
            type="date"
            value={dateValue}
            onChange={dateChangeHandler}
            onBlur={dateBlurHandler}
          />
          {dateHasError && <p className="error-text">Please enter a valid date.</p>}
        </div>
        <div className={timeClasses}>
          <input
            type="time"
            value={timeValue}
            onChange={timeChangeHandler}
            onBlur={timeBlurHandler}
          />
          {timeHasError && <p className="error-text">Please enter a valid time.</p>}
        </div>
        <button type="submit">BOOK</button>
      </form>
    </>
  );
};

export default CarDetails;
