import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header.';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import '../css/albumPage.css';
import '../css/pageBase.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      albumInfo: [],
      albumYear: '',
      albumMusics: [],
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    const info = result[0];
    const musics = result.filter((obj) => obj !== info);
    const newDate = new Date(info.releaseDate);
    const year = newDate.getFullYear();
    this.setState({
      isLoading: false,
      albumInfo: info,
      albumYear: year,
      albumMusics: musics,
    });
  }

  render() {
    const { isLoading, albumInfo, albumMusics, albumYear } = this.state;
    return (
      <div className="body">
        <div data-testid="page-album" className="baseContainer">
          <Header />
          <main>
            { isLoading ? (<Loading />) : (
              <section className="musicContainer">
                <div className="albumHeader">
                  <div className="albumInfo">
                    <h2 data-testid="album-name" className="albumName">
                      {albumInfo.collectionName}
                    </h2>
                    <h3 data-testid="artist-name" className="artistName">
                      {albumInfo.artistName}
                    </h3>
                    <h3 className="albumYear">{albumYear}</h3>
                  </div>
                  <img src={ albumInfo.artworkUrl100 } alt="capa do Album" />
                </div>
                <ol>
                  {
                    albumMusics.map((music) => (
                      <MusicCard
                        key={ music.trackId.toString() }
                        trackName={ music.trackCensoredName }
                        previewUrl={ music.previewUrl }
                        trackId={ music.trackId.toString() }
                        albumMusics={ music }
                        trackCount={ music.trackNumber }
                      />
                    ))
                  }
                </ol>
              </section>
            )}
          </main>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
