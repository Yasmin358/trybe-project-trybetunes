import React from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
      isLoading: false,
    };
  }

    componentDidMount = async () => {
      this.setState({ isLoading: true });
      const user = await getUser();
      this.setState({ user: user.name, isLoading: false });
    }

    render() {
      const { user, isLoading } = this.state;
      return (
        <header data-testid="header-component">
          { isLoading ? (<Loading />) : (
            <h1 data-testid="header-user-name">
              { user }
            </h1>
          )}
        </header>
      );
    }
}

export default Header;
