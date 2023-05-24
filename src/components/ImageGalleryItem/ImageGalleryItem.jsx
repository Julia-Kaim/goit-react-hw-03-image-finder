import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  render() {
    return (
      <li className={styles.galleryItem}>
        <img src={this.props.smallImgURL} alt={this.props.id} />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  smallImgURL: PropTypes.string.isRequired,
};
