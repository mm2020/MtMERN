import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Option, Test, Dashboard } from '../pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/home/sample/option' exact component={Option} />
        <Route path='/home/sample/test' exact component={Test} />
        <Route path='/home/sample/template' exact component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
