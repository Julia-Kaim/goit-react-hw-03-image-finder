import React, { Component } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import Button from './Button/Button';
// import Searchform from './Searchform/Searchform';
// import ImageGallery from './ImageGallery/ImageGallery';
// import Loader from './Loader/Loader';
import PixabayApi from './Api/PixabayApi';


export default class App extends Component {


//  fetchimg

  render() {
    // const { pictures, status, totalHits } = this.state;
    return (
      <>
        <PixabayApi></PixabayApi>
        {/* <Searchform onSubmit={this.processSubmit} />
        {pictures.length && <ImageGallery images={pictures} />}
        {totalHits > pictures.length && (
          <Button onClick={this.handleLoadMore} />
        )}
        {status === 'pending' && <Loader />}
        <ToastContainer autoClose={2000} /> */}
      </>
    );
  }
}
