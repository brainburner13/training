import React from 'react';
import style from '../Common/Preloader/FormsControls/FormsControls.module.css';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { createField, GetStringCase, Input } from '../Common/Preloader/FormsControls/FormsControls';
import { requiredField, maxLengthCreator } from '../../utils/validators/validators';
import { login } from '../../Redux/Auth-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../../Redux/Redux-store';

const maxLength25 = maxLengthCreator(25);

type LoginFormOwnPropsType = {
  captchaUrl: string | null,
}; 

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = ({ handleSubmit, error, captchaUrl}) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFprmValuesTypeKeys>("Email", "email", Input, [requiredField, maxLength25])}
      {createField<LoginFprmValuesTypeKeys>("Password", "password", Input, [requiredField, maxLength25], { type: "password"})}
      {createField<LoginFprmValuesTypeKeys>(undefined, "rememberMe", Input, [], { type: "checkbox"}, "Remember me")}
      {captchaUrl && <img src={captchaUrl} alt=''/>}
      {captchaUrl && createField<LoginFprmValuesTypeKeys>("Symbols from image", "captcha", Input, [requiredField])}
      {error && <div className={style.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({form: 'login'}) (LoginForm);

type LoginFormValuesType = {
  email: string, 
  password: string,
  rememberMe: boolean,
  captcha: string,
};

type LoginFprmValuesTypeKeys = GetStringCase<LoginFormValuesType>;

export const LoginPage: React.FC = () => {

  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

  const dispatch = useDispatch();

  const onSubmit = (formData: LoginFormValuesType) => {
    dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
  };

  if(isAuth) {
    return (<Redirect to={'/profile'}/>)
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
  );
};