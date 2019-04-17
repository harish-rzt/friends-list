import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import styles from './FriendListItem.css';

class FriendListItem extends Component {

  render() {
    const { id, name, gender, starFriend, deleteFriend } = this.props;
    return (
      <li className={styles.friendListItem}>
        <div className={styles.friendInfos}>
          <div><span>{name}</span></div>
          <div>
            <small>xx friends in common</small>
          </div>
          <div>Gender: <b>{gender}</b></div>
        </div>
        <div className={styles.friendActions}>
          <button
            className={`btn btn-default ${styles.btnAction}`}
            onClick={() => starFriend(id)}
          >
            <i className={classnames('fa', {
              'fa-star': this.props.starred,
              'fa-star-o': !this.props.starred,
            })} />
          </button>
          <button
            className={`btn btn-default ${styles.btnAction}`}
            onClick={() => deleteFriend(id)}
          >
            <i className="fa fa-trash" />
          </button>
        </div>
      </li>
    );
  }

}

FriendListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  starred: PropTypes.bool,
  starFriend: PropTypes.func.isRequired,
};

export default FriendListItem;
