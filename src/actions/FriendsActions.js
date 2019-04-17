import * as types from '../constants/ActionTypes';

export function addFriend(payload) {
  return {
    type: types.ADD_FRIEND,
    payload
  };
}

export function deleteFriend(id) {
  return {
    type: types.DELETE_FRIEND,
    id
  };
}

export function starFriend(id) {
  return {
    type: types.STAR_FRIEND,
    id
  };
}

export function incrementPagination() {
  return {
    type: types.INCREMENT_PAGINATION,
  };
}

export function decrementPagination() {
  return {
    type: types.DECREMENT_PAGINATION,
  };
}
