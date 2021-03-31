import './App.css';
import SignUp from './components/SignUp'
import Login from './components/Login'
import Events from './components/Events'
import SingleEvent from './components/SingleEvent'
import MyEvents from './components/MyEvents'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AddEvent from './components/AddEvent';
import User from './components/userEvents';

function App() {
  return (
    <Router>
      <div className='App'>

      <Switch>
        <Route exact path='/' component={Login}></Route>
        <Route exact path='/signup' component={SignUp}></Route>
        <Route exact path='/events' component={Events}></Route>
        <Route exact path='/events/:eventId' component={SingleEvent} ></Route>
        <Route exact path='/userevents' component={MyEvents} ></Route>
        <Route exact path='/addEvent' component={AddEvent} ></Route>
        <Route exact path='/User' component={User} ></Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
