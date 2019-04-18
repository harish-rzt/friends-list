import * as actions from './FriendsActions';
import * as types from '../constants/ActionTypes';

describe('FriendsActions Action Creator', () => {
  it('ADD_FRIEND test',() => {
    const payload = { name: 'Jhon Doe', gender: 'Male'};
    const expectedAction = {
      type: types.ADD_FRIEND,
      payload
    };
    expect(actions.addFriend(payload)).toEqual(expectedAction);
    expect(actions.addFriend(payload).payload.name).toEqual(payload.name);
    expect(actions.addFriend(payload).payload.gender).toEqual(payload.gender);
  });

  it('DELETE_FRIEND test', () => {
    const id = 1;
    const expectedAction = {
      type: types.DELETE_FRIEND,
      id
    };
    expect(actions.deleteFriend(id)).toEqual(expectedAction);
    expect(actions.deleteFriend(id).id).toEqual(expectedAction.id);
  });

  it('STAR_FRIEND test', () => {
    const id = 1;
    const expectedAction = {
      type: types.STAR_FRIEND,
      id
    };
    expect(actions.starFriend(id)).toEqual(expectedAction);
    expect(actions.starFriend(id).id).toEqual(expectedAction.id);
  });

  it('INCREMENT_PAGINATION test',() => {
    const expectedAction = {
      type: types.INCREMENT_PAGINATION,
    };
    expect(actions.incrementPagination()).toEqual(expectedAction);
  });

  it('DECREMENT_PAGINATION test',() => {
    const expectedAction = {
      type: types.DECREMENT_PAGINATION,
    };
    expect(actions.decrementPagination()).toEqual(expectedAction);
  })
});