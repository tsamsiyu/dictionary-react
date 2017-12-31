import React from 'react';
import AuthRoute from 'components/rbac/AuthRoute';
import GuestRoute from 'components/rbac/GuestRoute';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import NotFound from "components/view/errors/NotFound";
import Login from "components/view/login/Login";
import Logout from 'components/view/logout/Logout';
import Profile from 'components/view/profile/Profile';
import { observer, inject } from 'mobx-react';
import { TopNav } from 'components/ui/TopNav';
import "components/view/app/App.css";
import { DictumList } from "components/view/dicta/DictumList";


@inject('authStore')
@observer
class App extends React.Component {

  render() {
    return (
      <div>
        <header>
          <TopNav/>
        </header>

        { this.props.authStore.loaded && (
          <main className="main-content">
            <div className="container">
              <Switch>
                <AuthRoute path="/logout" exact={true} component={Logout}/>

                <AuthRoute path="/profile" exact={true} component={Profile}/>
                <AuthRoute path="/dicta" exact={true} component={DictumList}/>

                <GuestRoute path="/login" exact={true} component={Login}/>

                <Redirect from='/' exact={true} to='/profile'/>
                <Route component={NotFound}/>
              </Switch>
            </div>
          </main>
        ) }
      </div>
    );
  }
}

export default withRouter(App);
