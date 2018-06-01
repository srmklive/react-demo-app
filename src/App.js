import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path={`${process.env.PUBLIC_URL}/checkout`} component={Checkout} />
            <Route path={`${process.env.PUBLIC_URL}/orders`} component={Orders} />
            <Route path={`${process.env.PUBLIC_URL}/auth`} component={Auth} />
            <Route path={`${process.env.PUBLIC_URL}/`} exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
