import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '../Button/Button';
import Searchform from '../Searchform/Searchform';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';

class ImageFetcher extends Component {
  state = {
    pictures: [],
    error: '',
    status: 'idle',
    totalHits: null,
  };

  fetchImg = async () => {
    const { URL, API_KEY, query, page } = this.props;

    try {
      const response = await fetch(
        `${URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
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

  // componentDidMount() {
  //   this.fetchImg();
  // }

  componentDidUpdate(prevProps) {
    if (
      this.props.query !== prevProps.query ||
      this.props.page !== prevProps.page
    ) {
      this.setState({ status: 'pending', pictures: [] });
      this.fetchImg();
    }
  }

  render() {
    const { pictures, status, totalHits } = this.state;
    const { handleLoadMore } = this.props;

    return (
      <>
        {pictures.length > 0 && <ImageGallery images={pictures} />}
        {totalHits > pictures.length && <Button onClick={handleLoadMore} />}
        {status === 'pending' && <Loader />}
      </>
    );
  }
}

export default class PixabayApi extends Component {
  state = {
    URL: 'https://pixabay.com/api/',
    API_KEY: '34856693-e3065cdefd04353a1725658fc',
    page: 1,
    query: '',
  };

  processSubmit = query => {
    this.setState({ query });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { URL, API_KEY, query, page } = this.state;

    return (
      <>
        <Searchform onSubmit={this.processSubmit} />
        <ImageFetcher
          URL={URL}
          API_KEY={API_KEY}
          query={query}
          page={page}
          handleLoadMore={this.handleLoadMore}
        />
        <ToastContainer autoClose={2000} />
      </>
    );
  }
}
