import classnames from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Pagination.css';


export default class Pagination extends Component {
  render() {
    const {
      pagination: { currentPage, totalPages },
      decrementPagination,
      incrementPagination,
    } = this.props;
    return (
      <div className={styles.wrapper}>
        <button
          className={`btn btn-default ${styles.btnAction}`}
          onClick={() => decrementPagination()}
          disabled={currentPage <= 1}
        >
          <i className={classnames('fa', 'fa-chevron-left')} />
        </button>
        <span className={styles.info}>
          {currentPage} / {totalPages} pages
        </span>
        <button
          className={`btn btn-default ${styles.btnAction}`}
          onClick={() => incrementPagination()}
          disabled={currentPage >= totalPages}
        >
          <i className={classnames('fa', 'fa-chevron-right')} />
        </button>
      </div>
    );
  }
}

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  decrementPagination: PropTypes.func.isRequired,
  incrementPagination: PropTypes.func.isRequired,
};
