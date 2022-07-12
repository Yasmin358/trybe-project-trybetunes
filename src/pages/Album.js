import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header.';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      albumInfo: [],
      albumMusics: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    const info = result[0];
    const musics = result.filter((obj) => obj !== info);
    this.setState({
      isLoading: false,
      albumInfo: info,
      albumMusics: musics,
    });
  }

  render() {
    const { isLoading, albumInfo, albumMusics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { isLoading ? (<Loading />) : (
          <section>
            <h2 data-testid="artist-name">{albumInfo.artistName}</h2>
            <h3 data-testid="album-name">{albumInfo.collectionName}</h3>
            <ol>
              {
                albumMusics.map((music) => (
                  <MusicCard
                    key={ music.trackId.toString() }
                    trackName={ music.trackName }
                    previewUrl={ music.previewUrl }
                    trackId={ music.trackId.toString() }
                    albumMusics={ music }
                  />
                ))
              }
            </ol>
          </section>
        )}
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
