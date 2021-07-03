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

function App() {
  const auth = useSelector((state) => state.authInfo.auth);
  console.log(auth);
  const notification = useSelector((state) => state.authInfo.notification);

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
          <Redirect to="/login" />
        </Route>
        <Route path="/cars" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login" exact>
          <LoginForm />
        </Route>
        <Route path="/signup" exact>
          <SignupForm />
        </Route>
       </Switch>
    </Layout>
    </>
  );
}

export default App;
