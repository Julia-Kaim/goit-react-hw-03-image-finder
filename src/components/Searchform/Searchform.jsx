import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import styles from './Searchform.module.css';

export default class Searchform extends Component {
  state = {
    query: '',
  };

  handleInputChange = e => {
    this.setState({ query: e.target.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.query.trim() === '') {
      toast.error('Enter your search query');
      return;
    }

    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form className={styles.searchform} onSubmit={this.handleSubmit}>
          <input
            onInput={this.handleInputChange}
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
          />
          <button type="submit" className={styles.searchFormButton}>
            search
          </button>
        </form>
      </header>
    );
  }
}

Searchform.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};