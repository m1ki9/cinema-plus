import { GET_ROOMS, SELECT_ROOM } from '../types';

const initialState = {
  rooms: [],
  selectedRoom: null
};

const getRooms = (state, payload) => ({
  ...state,
  rooms: payload
});

const getRoom = (state, payload) => ({
  ...state,
  selectedRoom: payload
});

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ROOMS:
      return getRooms(state, payload);
    case SELECT_ROOM:
      return getRoom(state, payload);
    default:
      return state;
  }
};
