/* eslint-disable */
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Notification from './components/Notification/Notification';
import Cars from './components/Cars/Cars';
import Appointments from './components/Appointments/Appointments';
import CarDetails from './components/CarDetails/CarDetails';
import NotFound from './components/NotFound/NotFound';
import Layout from './components/Layout';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import SecureRoute from './containers/SecureRoute';

function App() {
  const notification = useSelector((state) => state.authInfo.notification);
  const auth = localStorage.getItem("auth");

  return (
    <>
    { notification &&
      <Notification
      message = {notification.message}
      title = {notification.title}
      status = {notification.status}
      />
    }
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to={auth == "true" ? "/cars" : "/login"} />
        </Route>
        <Route path="/login" component={LoginForm}></Route>
        <Route path="/signup" component={SignupForm}></Route>
        <SecureRoute path="/cars" component={Cars}></SecureRoute>
        <SecureRoute path="/appointments" component={Appointments}></SecureRoute>
        <SecureRoute path="/cars/:id" component={CarDetails}></SecureRoute>
        <Route path="*" component={NotFound}></Route>
       </Switch>
    </Layout>
    </>
  );
}

export default App;
