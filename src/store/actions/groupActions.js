import firebase from '../../firebase';
import 'firebase/auth';
import 'firebase/firestore';
import history from '../../routes/History';
import { slugify } from '../../utils/slugify';
import { fetchAllExpenses } from './expenseActions';

import {
  JOINED_GROUPS_REQUEST,
  JOINED_GROUPS_SUCCESS,
  JOINED_GROUPS_ERROR,
  JOIN_GROUP_REQUEST,
  JOIN_GROUP_SUCCESS,
  JOIN_GROUP_ERROR,
  CREATED_GROUPS_REQUEST,
  CREATED_GROUPS_SUCCESS,
  CREATED_GROUPS_ERROR,
  CREATE_GROUP_REQUEST,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_ERROR,
  GET_GROUP_REQUEST,
  GET_GROUP_SUCCESS,
  GET_GROUP_ERROR,
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR,
  DELETE_GROUP_REQUEST,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_ERROR,
  LEAVE_GROUP_REQUEST,
  LEAVE_GROUP_SUCCESS,
  LEAVE_GROUP_ERROR
} from '../types';

export const leaveGroup = (user, id) => async dispatch => {
  dispatch({ type: LEAVE_GROUP_REQUEST });
  try {
    await firebase
      .firestore()
      .collectionGroup('groups')
      .where('id', '==', id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({
            users: firebase.firestore.FieldValue.arrayRemove({
              id: user.uid,
              name: user.displayName
            })
          });
        });
      });
    dispatch({ type: LEAVE_GROUP_SUCCESS, payload: id, user });
  } catch (error) {
    dispatch({ type: LEAVE_GROUP_ERROR, payload: error });
  }
};

export const deleteGroup = id => async dispatch => {
  dispatch({ type: DELETE_GROUP_REQUEST });
  try {
    await firebase
      .firestore()
      .collectionGroup('groups')
      .where('id', '==', id)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          doc.ref.delete();
        });
      });
    dispatch({ type: DELETE_GROUP_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_GROUP_ERROR, payload: error });
  }
};

export const fetchJoinedGroups = user => async dispatch => {
  dispatch({ type: JOINED_GROUPS_REQUEST });
  try {
    await firebase
      .firestore()
      .collectionGroup('groups')
      .where('users', 'array-contains', {
        id: user.uid,
        name: user.displayName
      })
      .get()
      .then(snapshot => {
        const groups = snapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          .filter(group => group.owner.id !== user.uid);
        dispatch({ type: JOINED_GROUPS_SUCCESS, payload: groups });
      });
  } catch (error) {
    console.log(error);
    dispatch({ type: JOINED_GROUPS_ERROR, payload: error });
  }
};

export const fetchCreatedGroups = user => async dispatch => {
  dispatch({ type: CREATED_GROUPS_REQUEST });
  try {
    await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('groups')
      .get()
      .then(snapshot => {
        const groups = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        dispatch({ type: CREATED_GROUPS_SUCCESS, payload: groups });
      });
  } catch (error) {
    dispatch({ type: CREATED_GROUPS_ERROR, payload: error });
  }
};

export const fetchGroup = id => async dispatch => {
  let group;
  dispatch({ type: GET_GROUP_REQUEST });
  try {
    await firebase
      .firestore()
      .collectionGroup('groups')
      .where('id', '==', id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          group = { ...doc.data(), id: doc.id };
          dispatch({ type: GET_GROUP_SUCCESS, payload: group });
        });
      });
    await dispatch(fetchAllExpenses(id, group.users));
  } catch (error) {
    dispatch({ type: GET_GROUP_ERROR, payload: error });
  }
};

export const joinGroup = (
  provider,
  existingUser,
  id,
  group
) => async dispatch => {
  let user = existingUser;
  if (!user) {
    dispatch({ type: USER_REQUEST });
    try {
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      const facebookProvider = new firebase.auth.FacebookAuthProvider();
      const response =
        provider === 'google'
          ? await firebase.auth().signInWithPopup(googleProvider)
          : await firebase.auth().signInWithPopup(facebookProvider);
      await firebase
        .firestore()
        .collection('users')
        .doc(response.user.uid);
      dispatch({ type: USER_SUCCESS, payload: response.user });
      user = response.user;
    } catch (err) {
      dispatch({ type: USER_ERROR, payload: err });
    }
  }

  dispatch({ type: JOIN_GROUP_REQUEST });
  try {
    await firebase
      .firestore()
      .collectionGroup('groups')
      .where('id', '==', id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({
            users: firebase.firestore.FieldValue.arrayUnion({
              id: user.uid,
              name: user.displayName
            })
          });
        });
      });
    dispatch({ type: JOIN_GROUP_SUCCESS });
  } catch (error) {
    dispatch({ type: JOIN_GROUP_ERROR, payload: error });
  }
  history.push(`/group/${id}/${slugify(group.name)}`);
};

export const createGroup = (user, name) => async dispatch => {
  dispatch({ type: CREATE_GROUP_REQUEST });
  try {
    let groupIndex;
    const increment = firebase.firestore.FieldValue.increment(1);

    const statsRef = await firebase
      .firestore()
      .collection('users')
      .doc('--stats--');

    await statsRef.set({ index: increment }, { merge: true });
    await statsRef.get().then(doc => {
      groupIndex = doc.data().index;
    });

    const newGroupRef = await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('groups')
      .doc(`${groupIndex}`);
    const newGroup = {
      id: newGroupRef.id,
      owner: {
        id: user.uid,
        name: user.displayName
      },
      users: [{ id: user.uid, name: user.displayName }],
      name,
      created: Date.now()
    };
    newGroupRef.set(newGroup, { merge: true });
    dispatch({ type: CREATE_GROUP_SUCCESS, payload: newGroup });
  } catch (error) {
    dispatch({ type: CREATE_GROUP_ERROR, payload: error });
  }
};
