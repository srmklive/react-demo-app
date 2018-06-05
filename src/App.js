import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

import * as actions from './store/actions/';

class App extends Component {
  componentDidMount() {
      this.props.onTryAutoSignUp();
  }

  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path={`${process.env.PUBLIC_URL}/checkout`} component={Checkout} />
            <Route path={`${process.env.PUBLIC_URL}/orders`} component={Orders} />
            <Route path={`${process.env.PUBLIC_URL}/auth`} component={Auth} />
            <Route path={`${process.env.PUBLIC_URL}/logout`} component={Logout} />
            <Route path={`${process.env.PUBLIC_URL}/`} exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
