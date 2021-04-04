import { Route, Switch } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Body from './layouts/Body';
import Register from './views/auth/Register';
import Login from './views/auth/Login';
import Profile from './views/UserProfile/Profile';


function App() {
 
  return (
    <div className="App">
      
        <Header />      
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile}/>
          <Route path="/" component={Body} />
        </Switch>
        <Footer />
    </div>
  );
}

export default App;
