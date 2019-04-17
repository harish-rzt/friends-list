import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { decrementPagination, incrementPagination } from '../actions/FriendsActions';
import styles from './Pagination.css';


class Pagination extends Component {
  render() {
    const {
      friendlist: { pagination: { currentPage, totalPages } },
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

Pagination.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {
  incrementPagination,
  decrementPagination,
})(Pagination);