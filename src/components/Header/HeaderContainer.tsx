import React from 'react';
import Header, { MapPropsType, DispatchPropsType } from './Header';
import { connect } from 'react-redux';
import {logout} from '../../Redux/Auth-reducer';
import { AppStateType } from '../../Redux/Redux-store';

class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType> {
  render() {
    return (
     <Header {...this.props}/>
    )
  };
};

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {logout})(HeaderContainer);

