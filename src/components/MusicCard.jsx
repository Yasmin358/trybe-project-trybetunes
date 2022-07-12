import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      check: false,
    };
    this.addFavoriteSong = this.addFavoriteSong.bind(this);
  }

  componentDidMount() {
    this.getFavoriteSongsList();
  }

  getFavoriteSongsList = async () => {
    const { albumMusics } = this.props;
    const favoriteList = await getFavoriteSongs();
    const isFavorite = favoriteList.some((song) => song.trackId === albumMusics.trackId);
    if (isFavorite === true) {
      this.setState({ check: true });
    }
  }

  addFavoriteSong() {
    this.setState({ isLoading: true },
      async () => {
        await addSong();
        this.setState({ isLoading: false, check: true });
      });
  }

  render() {
    const { trackName, trackId, previewUrl } = this.props;
    const { isLoading, check } = this.state;
    return (
      <div>
        <li>
          { isLoading ? (<Loading />) : (
            <>
              <p>{trackName}</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
              <label htmlFor="favorites">
                <input
                  data-testid={ `checkbox-music-${trackId}` }
                  name="favorites"
                  type="checkbox"
                  id={ trackId }
                  checked={ check }
                  onChange={ this.addFavoriteSong }
                />
                Favorita
              </label>
            </>)}
        </li>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  albumMusics: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MusicCard;
