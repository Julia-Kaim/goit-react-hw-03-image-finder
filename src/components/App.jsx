import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from './Button/Button';
import Searchform from './Searchform/Searchform';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';

export default class App extends Component {
  state = {
    URL: 'https://pixabay.com/api/',
    API_KEY: '34856693-e3065cdefd04353a1725658fc',
    pictures: [],
    error: '',
    status: 'idle',
    page: 1,
    query: '',
    totalHits: null,
  };

  // fetchImg = () => {
  //   return fetch(
  //     `${this.state.URL}?q=${this.state.query}&page=${this.state.page}&key=${this.state.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  //   )
  //     .then(res => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       return Promise.reject(new Error('Failed to find any images'));
  //     })
  //     .then(pictures => {
  //       if (!pictures.total) {
  //         toast.error('Did find anything, mate');
  //       }
  //       const selectedProperties = pictures.hits.map(
  //         ({ id, largeImageURL, webformatURL }) => {
  //           return { id, largeImageURL, webformatURL };
  //         }
  //       );
  //       this.setState(prevState => {
  //         return {
  //           pictures: [...prevState.pictures, ...selectedProperties],
  //           status: 'resolved',
  //           totalHits: pictures.total,
  //         };
  //       });
  //     })
  //     .catch(error => this.setState({ error, status: 'rejected' }));
  // };
  fetchImg = async () => {
    try {
      const response = await fetch(
        `${this.state.URL}?q=${this.state.query}&page=${this.state.page}&key=${this.state.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );

      if (response.ok) {
        const pictures = await response.json();

        if (!pictures.total) {
          toast.error('Did not find anything, mate');
        }

        const selectedProperties = pictures.hits.map(
          ({ id, largeImageURL, webformatURL }) => {
            return { id, largeImageURL, webformatURL };
          }
        );

        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...selectedProperties],
          status: 'resolved',
          totalHits: pictures.total,
        }));
      } else {
        throw new Error('Failed to find any images');
      }
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query) {
      this.setState({ status: 'pending', pictures: [], page: 1 });
      this.fetchImg();
    }
    if (
      this.state.query === prevState.query &&
      this.state.page !== prevState.page
    ) {
      this.setState({ status: 'pending' });
      this.fetchImg();
    }
  }

  processSubmit = query => {
    this.setState({ query });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { pictures, status, totalHits } = this.state;
    return (
      <>
        <Searchform onSubmit={this.processSubmit} />
        {pictures.length && <ImageGallery images={pictures} />}
        {totalHits > pictures.length && (
          <Button onClick={this.handleLoadMore} />
        )}
        {status === 'pending' && <Loader />}
        <ToastContainer autoClose={2000} />
      </>
    );
  }
}
