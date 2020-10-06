import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { createField, Textarea } from '../Common/Preloader/FormsControls/FormsControls';
import { requiredField, maxLengthCreator } from '../../utils/validators/validators';
import { InitialStateType } from '../../Redux/Dialogs-reducer';

const maxLength30 = maxLengthCreator(30);

type OwnPropsType = {
  dialogsPage: InitialStateType,
  sendMessage: (messageText: string) => void,
};

type NewMessageFormValuesType = {
  newMessageBody: string, 
};

type PropsType = {};

const Dialogs: React.FC<OwnPropsType> = (props) => {

  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map(d => 
    <DialogItem key={d.id} name={d.name} id={d.id}/>
  );

  let messagesElements = state.messages.map(m => 
      <Message key={m.id} message={m.message} id={m.id}/>
  );

  let addNewMessage = (values: {newMessageBody: string}) => {
    props.sendMessage(values.newMessageBody);
  };

    return (
        <div className={s.dialogs}>
          <div className={s.dialogsItems}>
            {dialogsElements}
          </div>
          <div className={s.messages}>
            <div>{messagesElements}</div>
              <AddMessageFormRedux onSubmit={addNewMessage}/>
          </div>
        </div>
    );
};

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
  return(
  <form onSubmit={props.handleSubmit}>
    <div>
      {createField('Enter your message', 'newMessageBody', Textarea, [requiredField, maxLength30])}
    </div>
    <div>
      <button>Send message</button>
    </div>
  </form>
  );
};

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType>({form: 'dialogAddMessageForm'}) (AddMessageForm);

export default Dialogs;