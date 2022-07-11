import React from 'react';
import Header from '../components/Header.';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonDisabled: true,
      inputName: '',
      artistName: '',
      isLoading: false,
      resultArray: [],
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
    });
    const result = await searchAlbumsAPI(inputName);
    this.setState({
      isLoading: false,
      resultArray: result,
      inputName: '',
      buttonDisabled: true,
    });
  };

  render() {
    const { buttonDisabled, inputName, artistName, isLoading, resultArray } = this.state;
    console.log({ buttonDisabled });
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          data-testid="search-artist-input"
          value={ inputName }
          onChange={ this.validateButton }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ buttonDisabled }
          onClick={ this.onSearchButtonClick }
        >
          Procurar
        </button>

        {isLoading && <Loading />}
        { resultArray.length !== 0 ? (
          <section>
            <p>
              {`Resultado de álbuns de: ${artistName}`}
            </p>
            {resultArray.map((card) => (
              <AlbumCard
                key={ card.collectionId.toString() }
                artistName={ card.artistName }
                collectionId={ card.collectionId.toString() }
                collectionName={ card.collectionName }
                artworkUrl100={ card.artworkUrl100 }
              />
            ))}
          </section>
        )
          : (<p>Nenhum álbum foi encontrado</p>)}
      </div>
    );
  }
}
export default Search;
