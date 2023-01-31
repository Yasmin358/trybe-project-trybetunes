import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import heart from '../images/heart.png';
import heart2 from '../images/heart2.png';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      favorite: false,
      favoriteS: 'false',
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
    if (isFavorite) {
      this.setState({ favorite: true, favoriteS: 'true' });
    }
  }

  addFavoriteSong(event, albumMusics) {
    const favorite = event.currentTarget.name;
    this.setState({ isLoading: true },
      async () => {
        if (favorite === 'false') {
          await addSong(albumMusics);
          this.setState({ isLoading: false, favorite: true, favoriteS: 'true' });
        } else {
          await removeSong(albumMusics);
          this.setState({ isLoading: false, favorite: false, favoriteS: 'false' });
        }
      });
  }

  render() {
    const { trackName, trackId, previewUrl, albumMusics, trackCount } = this.props;
    const { isLoading, favorite, favoriteS } = this.state;
    const imgFavorite = <img src={ heart2 } alt="favorite Icon" />;
    const notImgFavorite = <img src={ heart } alt="faorite Icon" />;

    return (
      <li className="music">
        { isLoading ? (<Loading />) : (
          <>
            <div className="musicInfo">
              <p>{`${trackCount} - ${trackName}`}</p>
              <button
                className="favoriteButton"
                type="button"
                name={ favoriteS }
                onClick={ (event) => this.addFavoriteSong(event, albumMusics) }
                id={ trackId }
                title={ favorite === true ? 'Remover dos favoritos'
                  : 'Adicionar aos favoritos' }
              >
                { favorite === true ? imgFavorite : notImgFavorite}
              </button>
            </div>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
          </>)}
      </li>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  albumMusics: PropTypes.objectOf(PropTypes.any).isRequired,
  trackCount: PropTypes.number.isRequired,
};

export default MusicCard;
