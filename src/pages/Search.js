import React from 'react';
import Header from '../components/Header.';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonDisabled: true,
    };
  }

  onInputChange = ({ target }) => {
    const min = 2;
    const { value } = target;
    if (value.length >= min) {
      this.setState({ buttonDisabled: false });
    }
  }

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          data-testid="search-artist-input"
          onChange={ this.onInputChange }
          name="input"
        />
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ buttonDisabled }
        >
          Procurar
        </button>
      </div>
    );
  }
}
export default Search;
