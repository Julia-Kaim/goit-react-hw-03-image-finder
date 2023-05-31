import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import styles from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';



export default class ImageGallery extends Component {
  state = {
    showModal: false,
    bigPic: null,
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }

  handleClick = e => {
    if (e.target.nodeName !== 'IMG') {
      this.setState({ showModal: false });
    } else {
      const picture = this.props.images.find(
        obj => obj.id === parseInt(e.target.alt)
      );
      this.setState({ bigPic: picture.largeImageURL });
    }
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    const { showModal, bigPic } = this.state;
    const { images } = this.props;

    return (
      <>
        <ul className={styles.gallery} onClick={this.toggleModal}>
          {images.map(img => (
            <ImageGalleryItem
              key={nanoid()}
              smallImgURL={img.webformatURL}
              id={img.id}
            />
          ))}
        </ul>
        {showModal && bigPic && (
          <Modal onClose={this.toggleModal} pic={bigPic} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
};
