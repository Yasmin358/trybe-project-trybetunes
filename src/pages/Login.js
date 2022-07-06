import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
      buttonDisabled: true,
      isLoading: false,
      redirect: false,
    };
  }

  submitUser = async () => {
    const { user } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: user });
    this.setState({ isLoading: false, redirect: true });
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
      <div data-testid="page-login">
        {isLoading ? (<Loading />) : (
          <form>
            <label htmlFor="login">
              <input
                type="text"
                data-testid="login-name-input"
                id="login"
                onChange={ this.validateUser }
              />
            </label>
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ buttonDisabled }
              onClick={ this.submitUser }
            >
              Entrar
            </button>
          </form>
        )}
        { redirect && <Redirect to="/search" /> }
      </div>
    );
  }
}
export default Login;
