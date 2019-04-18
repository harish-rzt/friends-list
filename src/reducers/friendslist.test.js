import reducer, { initialState } from './friendlist';
import * as types from '../constants/ActionTypes';

describe('friendslist Reducer test', () => {
  let defaultState;
  let payload;
  let expectedData;
  beforeEach(() => {
    defaultState = {
      friendsById: [],
      friendsByIdInView: [],
      pagination: {
        currentPage: 0,
        totalPages: 0,
        pageSize: 2,
      }
    };
    payload = {
      name: 'Jhon Doe', gender: 'Male'
    };
    expectedData = {
      ...payload,
      id: 0, // id will be set as friends length
      starred: false, // default value as false
    };
  });

  it('test for initial state', () => {
    // returns empty object if {} is passed
    expect(reducer({}, {})).toEqual({});

    // returns initialState if undefined is passed because default will be taken as initialState
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('ADD_FRIEND reducer test', () => {
    // adding new friend to empty friend list
    const updatedState = reducer(defaultState, { type: types.ADD_FRIEND, payload });
    expect(updatedState.friendsById[0]).toEqual(expectedData);

    // adding new friend to initialState with 3 entries and checking for the count(after add should be 4)
    const updatedState2 = reducer(initialState, { type: types.ADD_FRIEND, payload });
    expect(updatedState2.friendsById.length).toEqual(4);
  });

  it('DELETE_FRIEND reducer test', () => {
    // adding a friend
    const newState = reducer(initialState, {});
    expect(newState.friendsById.length).toEqual(3);

    const deleteFriend1 = reducer(newState, { type: types.DELETE_FRIEND, id: 2 });
    expect(deleteFriend1.friendsById.length).toEqual(2);

    const deleteFriend2 = reducer(deleteFriend1, { type: types.DELETE_FRIEND, id: 1 });
    expect(deleteFriend2.friendsById.length).toEqual(1);

    const deleteFriend3 = reducer(deleteFriend2, { type: types.DELETE_FRIEND, id: 0 });
    expect(deleteFriend3.friendsById.length).toEqual(0);
  });

  it('STAR_FRIEND reducer test', () => {
    const updatedFriend = {
      ...expectedData,
      starred: true,
    };
    // adding a friend
    const updatedState = reducer(defaultState, { type: types.ADD_FRIEND, payload });
    // checking for default state as expectedData
    expect(updatedState.friendsById[0]).toEqual(expectedData);
    // checking for updated starred state as updatedFriend
    expect(reducer(updatedState, { type: types.STAR_FRIEND, id: updatedFriend.id }).friendsById[0]).toEqual(updatedFriend);
  });

  it('INCREMENT_DECREMENT_PAGINATION reducer test', () => {
    // initializing reducer state to initialState
    const newState = reducer(undefined, {});
    expect(newState.pagination.currentPage).toEqual(1);
    expect(newState.pagination.pageSize).toEqual(2);
    expect(newState.pagination.totalPages).toEqual(2);

    // Increment pagination and check values
    const statePaginationIncrement = reducer(newState, { type: types.INCREMENT_PAGINATION });
    expect(statePaginationIncrement.pagination.currentPage).toEqual(2);
    expect(statePaginationIncrement.pagination.pageSize).toEqual(2);
    expect(statePaginationIncrement.pagination.totalPages).toEqual(2);

    // Testing for invalid increment pagination
    const invalidStatePaginationIncrement = reducer(statePaginationIncrement, { type: types.INCREMENT_PAGINATION });
    expect(invalidStatePaginationIncrement.pagination.currentPage).toEqual(2);
    expect(invalidStatePaginationIncrement.pagination.pageSize).toEqual(2);
    expect(invalidStatePaginationIncrement.pagination.totalPages).toEqual(2);

    // Decrement pagination and check values
    const statePaginationDecrement = reducer(statePaginationIncrement, { type: types.DECREMENT_PAGINATION });
    expect(statePaginationDecrement.pagination.currentPage).toEqual(1);
    expect(statePaginationDecrement.pagination.pageSize).toEqual(2);
    expect(statePaginationDecrement.pagination.totalPages).toEqual(2);

    // Testing for invalid decrement pagination
    const invalidStatePaginationDecrement = reducer(statePaginationDecrement, { type: types.DECREMENT_PAGINATION });
    expect(invalidStatePaginationDecrement.pagination.currentPage).toEqual(1);
    expect(invalidStatePaginationDecrement.pagination.pageSize).toEqual(2);
    expect(invalidStatePaginationDecrement.pagination.totalPages).toEqual(2);
  });
});