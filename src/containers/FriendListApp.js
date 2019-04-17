import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addFriend, deleteFriend, starFriend } from '../actions/FriendsActions';
import { AddFriendForm, FriendList, Pagination, EmptyView } from '../components';
import styles from './FriendListApp.css';

class FriendListApp extends Component {

  render() {
    const { friendlist: { friendsByIdInView }, addFriend, deleteFriend, starFriend } = this.props;
    const actions = { addFriend, deleteFriend, starFriend };
    return (
      <div className={styles.friendListApp}>
        <h1>The FriendList</h1>
        <AddFriendForm addFriend={actions.addFriend} />
        {!!friendsByIdInView.length ? <FriendList friends={friendsByIdInView} actions={actions} /> : <EmptyView />}
        {!!friendsByIdInView.length && <Pagination />}
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
})(FriendListApp);
