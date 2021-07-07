/* eslint-disable */
import classes from './Notification.module.css';

const Notification = (props) => {
  const { status, title, message } = props;
  let alertClasses = '';

  if (status === 'error') alertClasses = classes.error
  if (status === 'success') alertClasses = classes.success
  if (status === 'hide') alertClasses = classes.hide

  const notificationClass = `${classes.notification} ${alertClasses}`;

  return (
    <div className={notificationClass}>
        <h2>{title}</h2>
        <p>{message}</p>
    </div>
  )
}

export default Notification;
