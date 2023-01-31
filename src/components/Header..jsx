import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import '../css/Header.css';
import logo from '../images/TrybeTunes2.png';

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
        <aside data-testid="header-component">
          { isLoading ? (<Loading />) : (
            <div className="headerContainer">
              <header className="cabecalho">
                <img src={ logo } alt="Logo do Site" className="imageLogo2" />
                <h1 data-testid="header-user-name" className="nameUser">
                  { `Olá,
                  ${user}!`}
                </h1>
              </header>
              <nav className="navigation">
                <Link to="/search" data-testid="link-to-search">
                  <button type="button">
                    BUSCAR
                  </button>
                </Link>

                <Link
                  to="/favorites"
                  data-testid="link-to-favorites"
                >
                  <button type="button">
                    FAVORITOS
                  </button>
                </Link>

                <Link to="/profile" data-testid="link-to-profile">
                  <button type="button">
                    PERFIL
                  </button>
                </Link>
                <Link to="/" data-testid="link-to-profile">
                  <button
                    type="button"
                    data-testid="logout-button"
                    className="buttonLogout"
                  >
                    SAIR
                  </button>
                </Link>
              </nav>
            </div>
          )}
        </aside>
      );
    }
}

export default Header;
