import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
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
            <div>
              <h1 data-testid="header-user-name">
                {user}
              </h1>
              <BrowserRouter>
                <ul>
                  <li>
                    <Link to="/search" data-testid="link-to-search">Search</Link>
                  </li>
                  <li>
                    <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
                  </li>
                  <li>
                    <Link to="/profile" data-testid="link-to-profile">Profile</Link>
                  </li>
                </ul>
              </BrowserRouter>
            </div>
          )}
        </header>
      );
    }
}

export default Header;
