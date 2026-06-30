import { GET_ROOMS, SELECT_ROOM } from '../types';
import { setAlert } from './alert';

export const getRooms = (cinemaId) => async dispatch => {
  try {
    const url = cinemaId ? `/rooms?cinemaId=${cinemaId}` : '/rooms';
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const rooms = await response.json();
    if (response.ok) {
      dispatch({ type: GET_ROOMS, payload: rooms });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const getRoom = id => async dispatch => {
  try {
    const url = '/rooms/' + id;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const room = await response.json();
    if (response.ok) {
      dispatch({ type: SELECT_ROOM, payload: room });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const createRoom = (room) => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/rooms';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(room)
    });
    if (response.ok) {
      dispatch(setAlert('Room Created', 'success', 5000));
      return { status: 'success', message: 'Room Created' };
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' Room have not been saved, try again.'
    };
  }
};

export const updateRoom = (room, id) => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/rooms/' + id;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(room)
    });
    if (response.ok) {
      dispatch(setAlert('Room Updated', 'success', 5000));
      return { status: 'success', message: 'Room Updated' };
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' Room have not been updated, try again.'
    };
  }
};

export const removeRoom = id => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/rooms/' + id;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      dispatch(setAlert('Room Deleted', 'success', 5000));
      return { status: 'success', message: 'Room Removed' };
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' Room have not been deleted, try again.'
    };
  }
};
