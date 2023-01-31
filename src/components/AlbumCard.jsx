import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../css/albumCard.css';

class AlbumCard extends React.Component {
  render() {
    const { artistName, collectionId, collectionName, artworkUrl100 } = this.props;
    return (
      <article className="albumCard">
        <div className="capaAlbum">
          <img src={ artworkUrl100 } alt={ collectionName } />
        </div>
        <div className="dadosAlbum">
          <h3>{collectionName}</h3>
          <h4>{ artistName.length > 100 ? 'Various Artists' : artistName }</h4>
        </div>
        <Link
          className="buttonAlbum"
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          Ver Detalhes
        </Link>
      </article>
    );
  }
}

AlbumCard.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
};

export default AlbumCard;
