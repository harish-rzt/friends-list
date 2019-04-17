import * as types from '../constants/ActionTypes';

const initialState = {
  friendsById: [
    {
      id: 0,
      name: 'Theodore Roosevelt',
      starred: true,
      gender: 'Male',
    },
    {
      id: 1,
      name: 'Abraham Lincoln',
      starred: false,
      gender: 'Male',
    },
    {
      id: 2,
      name: 'George Washington',
      starred: false,
      gender: 'Male',
    }
  ],
  friendsByIdInView: [
    {
      id: 0,
      name: 'Theodore Roosevelt',
      starred: true,
      gender: 'Male',
    },
    {
      id: 1,
      name: 'Abraham Lincoln',
      starred: false,
      gender: 'Male',
    },
  ],
  pagination: {
    currentPage: 1,
    totalPages: 2,
    pageSize: 2,
  }
};

const getFriendsByIdInView = ({currentPage, pageSize, friends}) => {
  const endIndex = currentPage * pageSize;
  const startIndex = endIndex - pageSize;
  return friends.slice(startIndex, endIndex);
};

const addFriend = (state, action) => {
  const { currentPage, pageSize } = state.pagination;
  const friendsByIdCount = state.friendsById.length;

  const newId = friendsByIdCount ? state.friendsById[friendsByIdCount - 1].id + 1 : 0;

  const updatedCurrentPage = friendsByIdCount ? currentPage : 1;
  const updatedTotalPages = Math.ceil((friendsByIdCount + 1) / state.pagination.pageSize);

  const pagination = {
    ...state.pagination,
    totalPages: updatedTotalPages,
    currentPage: updatedCurrentPage,
  };

  const friends = [
    ...state.friendsById,
    {
      id: newId,
      name: action.payload.name,
      gender: action.payload.gender,
      starred: false,
    }
  ];

  return {
    ...state,
    friendsById: friends,
    friendsByIdInView: [...getFriendsByIdInView({
      currentPage: updatedCurrentPage,
      pageSize: pageSize,
      friends
    })],
    pagination,
  };
};

const deleteFriend = (state, action) => {
  const { currentPage, pageSize } = state.pagination;
  let friends = state.friendsById.filter(item => item.id !== action.id);
  const updatedPageSize = Math.ceil(friends.length / pageSize);
  const pagination = {
    ...state.pagination,
    totalPages: updatedPageSize,
    currentPage: (currentPage > updatedPageSize) ? currentPage - 1 : currentPage,
  };
  return {
    ...state,
    friendsById: friends,
    friendsByIdInView: [...getFriendsByIdInView({
      currentPage: pagination.currentPage,
      pageSize: pagination.pageSize,
      friends
    })],
    pagination,
  };
};

const updatePagination = (state, action, type) => {
  const { totalPages, currentPage } = state.pagination;
  const newCurrentPage = type === 'INCREMENT' ? currentPage + 1 : currentPage - 1;
  const updateCondition = type === 'INCREMENT' ? totalPages >= newCurrentPage : newCurrentPage >= 1;
  if(updateCondition) {
    return {
      ...state,
      friendsByIdInView: [...getFriendsByIdInView({
        currentPage: newCurrentPage,
        pageSize: state.pagination.pageSize,
        friends: state.friendsById,
      })],
      pagination: {
        ...state.pagination,
        currentPage: newCurrentPage,
      }
    }
  }
  return { ...state };
};

const starFriend = (state, action) => {
  const { currentPage, pageSize } = state.pagination;
  const friends = [...state.friendsById];
  let friendIndex = friends.findIndex(item => item.id === action.id);
  friends[friendIndex].starred = !friends[friendIndex].starred;
  return {
    ...state,
    friendsById: friends,
    friendsByIdInView: [...getFriendsByIdInView({ currentPage, pageSize, friends })],
  };
};

export default function friends(state = initialState, action) {
  switch (action.type) {
    case types.ADD_FRIEND: return addFriend(state, action);
    case types.DELETE_FRIEND: return deleteFriend(state, action);
    case types.STAR_FRIEND: return starFriend(state, action);
    case types.INCREMENT_PAGINATION: return updatePagination(state, action, 'INCREMENT');
    case types.DECREMENT_PAGINATION: return updatePagination(state, action, 'DECREMENT');
    default:
      return state;
  }
}
