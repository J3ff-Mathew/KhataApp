import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Page from './component/Page';
import LoadNezuko from './component/LoadNezuko';
import { lazy, Suspense } from 'react';
import myErrorBoundry from './component/myErrorBoundry';
// const myErrorBoundry = lazy(() => import('./component/myErrorBoundry'));
const Login = lazy(() => import('./component/Login'));
const Dashboard = lazy(() => import('./component/Dashboard'));
const Registration = lazy(() => import('./component/Registration'));
const Searching = lazy(() => import('./component/Searching'));



function App() {
  return (
    <>
      {/* <Nave/>
     <Forms/> */}
      {/* <UnderlineLink/>
     <ComboBox/> */}
      <myErrorBoundry>
        <Suspense fallback={<LoadNezuko />}>
          <Router>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/dash" component={Dashboard} />
              <Route path="/regis" component={Registration} />
              <Route path="/posts" component={Searching} />
            </Switch>
          </Router>
        </Suspense>
      </myErrorBoundry>

    </>
  );
}

export default App;