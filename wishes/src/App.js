import './App.css';
import SignUp from './components/SignUp'
import Login from './components/Login'
import Events from './components/Events'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>
    <div className='App'>

      <Switch>
        <Route exact path='/' component={Login}></Route>
        <Route exact path='/signup' component={SignUp}></Route>
        <Route exact path='/events' component={Events}></Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
