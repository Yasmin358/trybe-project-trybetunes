import React from 'react';
import Header from '../components/Header.';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';
import '../css/Search.css';
import '../css/pageBase.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonDisabled: true,
      inputName: '',
      artistName: '',
      isLoading: false,
      resultArray: [],
      search: false,
    };

    this.validateButton = this.validateButton.bind(this);
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
  }

  validateButton = ({ target }) => {
    const min = 2;
    const { value } = target;
    if (value.length >= min) {
      this.setState({ buttonDisabled: false });
    }

    this.setState({ inputName: value });
  }

  onSearchButtonClick = async () => {
    const { inputName } = this.state;
    this.setState({
      isLoading: true,
      artistName: inputName,
      search: true,
    });
    const result = await searchAlbumsAPI(inputName);

    this.setState({
      isLoading: false,
      resultArray: result,
      inputName: '',
      buttonDisabled: true,
    });

    if (!result) {
      this.setState({
        search: false,
      });
    }
  };

  render() {
    const { buttonDisabled, inputName, artistName, isLoading,
      resultArray, search } = this.state;

    const noResult = <p className="null">Nenhum álbum foi encontrado</p>;

    const result = (
      <section className="containerResult">
        <div className="header">
          <p>
            Resultado de álbuns de:
            <b>{`${artistName}`}</b>
          </p>
        </div>
        <div className="result">
          {resultArray.map((card) => (
            <AlbumCard
              key={ card.collectionId.toString() }
              artistName={ card.artistName }
              collectionId={ card.collectionId.toString() }
              collectionName={ card.collectionName }
              artworkUrl100={ card.artworkUrl100 }
            />
          ))}
        </div>
      </section>);

    const containerResult = search && (resultArray.length !== 0
      ? result : noResult);

    return (
      <div className="body">
        <div data-testid="page-search" className="baseContainer">
          <Header />
          <main>
            <section className="containerInput">
              <input
                type="text"
                data-testid="search-artist-input"
                value={ inputName }
                onChange={ this.validateButton }
                placeholder="O que você gostaria de ouvir?"
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ buttonDisabled }
                onClick={ this.onSearchButtonClick }
              >
                BUSCAR
              </button>
            </section>
            { isLoading ? (<Loading />) : (containerResult)}
          </main>
        </div>
      </div>
    );
  }
}
export default Search;
