import React from 'react';
import CapitalGame from './components/CapitalGame.js';
import FlagGame from './components/FlagGame.js';
import {BrowserRouter as Router, NavLink, Route} from 'react-router-dom';
import Info from './components/Info';


function App() {
  return (
    <div>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink className="nav-item nav-link" to="/capital/">
            Capital Game
          </NavLink>
          <NavLink className="nav-item nav-link" to="/flag/"> 
            Flag Game
          </NavLink>
          <NavLink className="nav-item nav-link" to="/list/"> 
            Country List
          </NavLink>
        </nav>


      <Route path="/capital/" component={CapitalGame}/>
      <Route path="/flag/" component={FlagGame}/>
      <Route path="/list/" component={Info}/>

      </Router>
    </div>
  );
}

export default App;
