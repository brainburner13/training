import { InferActionTypes } from './Redux-store';

type DialogType = {
  id: number,
  name: string,
};

type MessageType = {
  id: number,
  message: string,
};

let initialState = {
  dialogs: [
    {id: 1, name: 'Huy'},
    {id: 2, name: 'Pizda'},
    {id: 3, name: 'Jgurda'}
  ] as Array<DialogType>, 
  messages: [
    {id: 1, message: 'Fuck you'},
    {id: 2, message: 'Suck'},
    {id: 3, message: 'Fucken idiot'}
  ] as Array<MessageType>,
  newMessageBody: '',
};

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionTypes<typeof actions>;

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

  switch (action.type) {
    case 'my/dialogsPage/SEND_MESSAGE':
      let body = action.newMessageBody;
      return {...state, messages: [...state.messages, {id: 4, message: body}]}      
    default:
      return {...state};
  }
};

export const actions = {
  sendMessage: (newMessageBody: string) => ({type: 'my/dialogsPage/SEND_MESSAGE', newMessageBody} as const),
};

export default dialogsReducer;