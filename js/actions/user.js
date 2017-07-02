import type {Action} from './types';
import firebase from '../utils/Firebase';

export const SET_USER = 'SET_USER';
export const FIREBASE_MESSAGE = 'LOGIN_FIREBASE_MESSAGE';

export function login(email: string, password: string): Action {
  return dispatch => {

    dispatch({
      type: FIREBASE_MESSAGE,
      payload: undefined
    })

    firebase.auth().signInWithEmailAndPassword(email, password).then(user => {

      if (user) {
        dispatch({
          type: FIREBASE_MESSAGE,
          payload: `We are happy to se you again ${user.providerData[0].email}`
        });
      }
      else console.warn('NO');

    }, error => {
      const errorMessage = error.toString();
      if (errorMessage.indexOf('There is no user record corresponding') !== -1) {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            dispatch({type: FIREBASE_MESSAGE, payload: 'User has been created'})
          },
          error => {
            dispatch({type: FIREBASE_MESSAGE, payload: error.toString()})
          }
        );
      }
      else {

        dispatch({
          type: FIREBASE_MESSAGE,
          payload: errorMessage
        })

      }
    });

    return {
      type: SET_USER,
      payload: {email, password},
    };

  };
}
