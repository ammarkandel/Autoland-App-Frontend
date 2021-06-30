/* eslint-disable */
import { Route, Switch, Redirect } from 'react-router-dom';
import Cars from './components/Cars/Cars';
import Appointments from './components/Appointments/Appointments';
import CarDetails from './components/CarDetails/CarDetails';
import NotFound from './components/NotFound/NotFound';
import Layout from './components/Layout';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

function App() {
  const auth = false;

  const checkAuth = () => {
    if (auth) {
      return (
        <>
         <Switch>
            <Route path="/" exact>
              <Redirect to="/cars" />
            </Route>
            <Route path="/login" exact>
              <Redirect to="/cars" />
            </Route>
            <Route path="/cars" exact>
              <Cars />
            </Route>
            <Route path="/appointments" exact>
              <Appointments />
            </Route>
            <Route path="/cars/:id">
              <CarDetails />
            </Route>
            <Route path="*" exact>
              <NotFound />
            </Route>
         </Switch>
        </>
      )
    } else {
       return (
         <>
           <Switch>
             <Route path="/" exact>
               <Redirect to="/login" />
             </Route>
             <Route path="/cars" exact>
               <Redirect to="/login" />
             </Route>
             <Route path="/login" exact>
               <Login />
             </Route>
             <Route path="/signup" exact>
               <Signup />
             </Route>
             <Route path="*" exact>
               <NotFound />
             </Route>
           </Switch>
         </>
       )
    }
  }

  return (
    <Layout>
        {checkAuth()}
    </Layout>
  );
}

export default App;
