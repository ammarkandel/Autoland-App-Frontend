/* eslint-disable */
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Notification from './components/Notification/Notification';
import Cars from './containers/Cars/Cars';
import Appointments from './containers/Appointments/Appointments';
import CarDetails from './containers/CarDetails/CarDetails';
import NotFound from './components/NotFound/NotFound';
import Layout from './components/Layout';
import LoginForm from './containers/LoginForm';
import SignupForm from './containers/SignupForm';
import SecureRoute from './containers/SecureRoute';

function App() {
  const notification = useSelector((state) => state.authInfo.notification);
  const auth = localStorage.getItem('jwt');
  const dispatch = useDispatch();

  return (
    <>
      {
        notification
        && (
        <Notification
          message={notification.message}
          title={notification.title}
          status={notification.status}
        />
        )
      }
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Redirect to={auth ? '/cars' : '/login'} />
          </Route>
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignupForm} />
          <SecureRoute exact path="/cars" component={Cars} />
          <SecureRoute exact path="/user_appointments" component={Appointments} />
          <SecureRoute exact path="/cars/:id" component={CarDetails} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Layout>
    </>
  );
}

export default App;
