import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import Logo from '../images/TrybeTunes2.png';
import '../css/Login.css';

class Login extends React.Component {
  mounted = false;

  constructor() {
    super();

    this.state = {
      user: '',
      buttonDisabled: true,
      isLoading: false,
      redirect: false,
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  submitUser = async (event) => {
    event.preventDefault();
    const { user } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: user });
    if (this.mounted) {
      this.setState({ isLoading: false, redirect: true });
    }
  }

  validateUser = (event) => {
    const min = 3;
    if (event.target.value.length >= min) {
      this.setState({ buttonDisabled: false, user: event.target.value });
    } else {
      this.setState({ buttonDisabled: true, user: event.target.value });
    }
  }

  render() {
    const { buttonDisabled, isLoading, redirect } = this.state;

    return (
      <div data-testid="page-login" className="pageLogin">
        {isLoading ? (<Loading />) : (
          <form className="formulario">
            <img src={ Logo } alt="Logo" className="imageLogo" />
            <input
              type="text"
              data-testid="login-name-input"
              id="loginInput"
              onChange={ this.validateUser }
              placeholder="Digite seu nome aqui"
              className="loginInput"
            />
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ buttonDisabled }
              onClick={ this.submitUser }
              className="buttonLogin"
            >
              ENTRAR
            </button>
          </form>
        )}
        { redirect && <Redirect to="/search" /> }
      </div>
    );
  }
}
export default Login;
