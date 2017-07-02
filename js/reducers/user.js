import type {Action} from '../actions/types';
import {SET_USER, FIREBASE_MESSAGE} from '../actions/user';

export type State = {
  name: string,
  error: string
}

const initialState = {
  name: '',
  error: ''
};

export default function (state: State = initialState, action: Action): State {
  const {type, payload} = action;
  if (type === SET_USER) {
    return {
      ...state,
      name: payload,
    };
  } else if (type === FIREBASE_MESSAGE) {
    return {
      ...state,
      firebaseMessage: payload
    }
  }
  return state;
}
