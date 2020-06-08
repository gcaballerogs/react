import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './component/Header';
import Login from './component/Login';
import MdcForm from './component/MdcForm';
import FormDetail from './component/FormDetail';


const App = () => (

  <div className="container" style={{ maxWidth: '50%' }}>
    <Header />
    <Router>
      <Switch>
        <Route path="/detalle" component={FormDetail} />
        <Route path="/form" component={MdcForm} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  </div>

);

export default App;
