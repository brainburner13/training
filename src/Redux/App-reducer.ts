import { InferActionTypes } from './Redux-store';
import { getAuthUserData } from './Auth-reducer';

let initialState = {
  initialized: false,
};

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionTypes<typeof actions>;

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
      case 'my/app/INITIALIZED_SUCCESS': {
        return {...state, initialized: true};
      }
      default: {
        return {...state};
      }
    }
};

const actions = {
  initializedSuccess: () => ({type: 'my/app/INITIALIZED_SUCCESS'} as const),
};

export const initializApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
    .then(() => {});
    dispatch(actions.initializedSuccess());
};

export default appReducer;