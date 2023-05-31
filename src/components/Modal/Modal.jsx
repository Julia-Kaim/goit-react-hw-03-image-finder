import React, { Component } from 'react';

import PropTypes from 'prop-types';

import styles from './Modal.module.css';



export default class Modal extends Component {
  handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { pic } = this.props;

    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <img src={pic} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  pic: PropTypes.string.isRequired,
};


