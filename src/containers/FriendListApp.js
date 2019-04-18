import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  addFriend,
  decrementPagination,
  deleteFriend,
  incrementPagination,
  starFriend,
} from '../actions/FriendsActions';
import { AddFriendForm, EmptyView, FriendList, Pagination } from '../components';
import styles from './FriendListApp.css';

class FriendListApp extends Component {

  render() {
    const {
      friendlist: { friendsByIdInView, pagination },
      addFriend,
      deleteFriend,
      starFriend,
      incrementPagination,
      decrementPagination,
    } = this.props;
    const actions = { addFriend, deleteFriend, starFriend };
    return (
      <div className={styles.friendListApp}>
        <h1>The FriendList</h1>
        <AddFriendForm addFriend={actions.addFriend} />
        {!!friendsByIdInView.length ? <FriendList friends={friendsByIdInView} actions={actions} /> : <EmptyView />}
        {!!friendsByIdInView.length && <Pagination
          pagination={pagination}
          incrementPagination={incrementPagination}
          decrementPagination={decrementPagination}
        />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {
  addFriend,
  deleteFriend,
  starFriend,
  incrementPagination,
  decrementPagination,
})(FriendListApp);
