import { actions } from '../../Redux/Dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { WithAuthRedirect } from '../../hoc/authRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../Redux/Redux-store';

let mapStateToProps = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage,
    isAuth: state.auth.isAuth
  }
};

export default compose(
  connect(mapStateToProps, {...actions}),
  WithAuthRedirect
) (Dialogs);