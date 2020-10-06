import profileReducer from "./Profile-reducer";
import dialogsReducer from "./Dialogs-reducer";
import sidebarReducer from "./Sidebar-reducer";

let store = {
   _state: {

    profilePage: {

      posts: [
        {id: 1, message: 'Hi, fresh mea', likesCount: 3},
        {id: 2, message: 'How are you?', likesCount: 5}
      ],

      newPostText: 'Enter wew post'
    },

    dialogsPage: {

      dialogs: [
        {id: 1, name: 'Huy'},
        {id: 2, name: 'Pizda'},
        {id: 3, name: 'Jgurda'}
      ], 

      messages: [
        {id: 1, message: 'Fuck you'},
        {id: 2, message: 'Suck'},
        {id: 3, message: 'Fucken idiot'}
      ],

      newMessageBody: ''
    },

    sidebar: {

    }
  },

  _callSubscriber() {
    console.log('State changed')
  },

  getState() {
    return this._state;
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);
    this._callSubscriber(this._state);
  },
};

export default store;
