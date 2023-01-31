import React from 'react';
import Header from '../components/Header.';
// import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import '../css/favorites.css';
import '../css/pageBase.css';
import aviso from '../images/aviso2.png';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      // favorite: [],
    };
  }

  /*
  componentDidMount() {
    this.getFavoriteSongsList();
  }

  getFavoriteSongsList = async () => {
    const favoriteList = await getFavoriteSongs();
    console.log(favoriteList);
    this.setState({ favorite: favoriteList, isLoading: false });
  } */

  render() {
    const { isLoading /* favorite */ } = this.state;
    return (
      <div className="body">
        <div data-testid="page-favorite" className="baseContainer">
          <Header />
          <main>
            { isLoading ? (<Loading />) : (
              <section className="musicFavoriteContainer">
                <img src={ aviso } alt="Pagina em construção" />
              </section>
            )}
          </main>
        </div>
      </div>
    );
  }
}
export default Favorites;
