import React from "react";
import {Field, reduxForm} from "redux-form";
import {login} from "../../redux/auth-reducer";
import {Element} from "../common/FormsContorls/FormsContorls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import '../common/FormsContorls/FormsControls.css'
import HeaderContainer from "../Header/HeaderContainer";

const Input = Element("input");

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {
                error ? <div className="form-summary-error">{error}</div> : null
            }
            <div>
                <Field component={Input} name={'email'} type={'text'} validate={[required]} placeholder={'Login'}/>
            </div>
            <div>
                <Field component={Input} name={'password'} type={'password'} validate={[required]} placeholder={'Password'}/>
            </div>
            <div>
                <Field component={Input} name={'rememberMe'} type={'checkbox'}/> remember me
            </div>
            {captchaUrl && (
                <>
                    <img src={captchaUrl} alt={''}/>
                    <Field component={Input} name={'captcha'} placeholder={'Captcha text'} validate={[required]}/>
                </>
            )}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        const {email, password, rememberMe, captcha} = formData
        debugger
        props.login(email, password, rememberMe, captcha)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <HeaderContainer />
            <h1>Login page</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);