import React, { Component, useEffect, useCallback } from 'react';

import PropTypes from 'prop-types';

import styles from './Modal.module.css';

// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       return this.props.onClose();
//     }
//   };

//   render() {
//     return (
//       <div className={styles.overlay}>
//         <div className={styles.modal}>
//           <img src={this.props.pic} alt="" />
//         </div>
//       </div>
//     );
//   }
// }

// const Modal = ({ pic, onClose }) => {
//   const handleKeyDown = useCallback(
//     e => {
//       if (e.code === 'Escape') {
//         onClose();
//       }
//     },
//     [onClose]
//   );

//   useEffect(() => {
//     const eventListener = e => handleKeyDown(e);
//     window.addEventListener('keydown', eventListener);
//     return () => {
//       window.removeEventListener('keydown', eventListener);
//     };
//   }, [handleKeyDown]);

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.modal}>
//         <img src={pic} alt="" />
//       </div>
//     </div>
//   );
// };

// import React from 'react';

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

// export default Modal;
