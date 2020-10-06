import React, { ComponentType } from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { BrowserRouter, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { initializApp } from './Redux/App-reducer';
import { compose } from 'redux';
import Preloader from './components/Common/Preloader/Preloader';
import {Provider} from  'react-redux';
import store, { AppStateType } from './Redux/Redux-store';
import {WithSuspense} from './hoc/withSuspense';

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializApp: () => void,
};

const SuspendedProfile = WithSuspense(ProfileContainer);
const SuspendedDialogs = WithSuspense(DialogsContainer);

class App extends React.Component<MapPropsType & DispatchPropsType> {

  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert('Some error occured');
  };
  
  componentDidMount() {
    this.props.initializApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  };

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  };

  render() {
    if(!this.props.initialized) {
      return  <Preloader/>
    } 
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className='app-wrapper'>
          <HeaderContainer/>
          <Navbar/>
          <div className='app-wrapper-content'>
            <Switch>
            <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
            <Route path='/profile:userId?' render={() => <SuspendedProfile/>}/>
            <Route path='/dialogs'  render={() => <SuspendedDialogs/>}/>
            <Route path='/users'  render={() => <UsersContainer pageTitle={'Users'}/>}/>
            <Route path='/news'  render={() => <News/>}/>
            <Route path='/music'  render={() => <Music/>}/>
            <Route path='/settings'  render={() => <Settings/>}/>
            <Route path='/login'  render={() => <Login/>}/>
            <Route path='*'  render={() => <div>404 NOT FOUND</div>}/>
            </Switch>
          </div>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  };
};

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, {initializApp})
) (App);

const MyApp: React.FC = () => {
  return (
  <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
  )
};

export default MyApp;