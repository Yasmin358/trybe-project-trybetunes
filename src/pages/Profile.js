import React from 'react';
import Header from '../components/Header.';
import Loading from '../components/Loading';
import aviso from '../images/aviso2.png';
import '../css/profile.css';
import '../css/pageBase.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div className="body">
        <div data-testid="page-profile" className="baseContainer">
          <Header />
          <main>
            { isLoading ? (<Loading />) : (
              <section className="profileContainer">
                <img src={ aviso } alt="Pagina em construção" />
              </section>
            )}
          </main>
        </div>
      </div>
    );
  }
}
export default Profile;
