import React from 'react';
import '../css/Loading.css';
import LoadingImage from '../images/loading3.gif';

class Loading extends React.Component {
  render() {
    return (
      <div className="loadingContainer">
        <img src={ LoadingImage } alt="Loading" />
      </div>
    );
  }
}

export default Loading;
