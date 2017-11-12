import { put, takeEvery } from 'redux-saga/effects'
import firebase from './firebase';

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

function* loginGoogleUser() {
  try {
    const user = yield auth.signInWithPopup(googleProvider);
    // 용석: Firebase Auth의 onAuthStateChanged method로 로그인 변경 상태 관리하는 것으로 변경
    yield put({type: "LOGIN_USER_REQUEST", payload: user});
  } catch (e) {
    // 로그인 에러가 발생한 경우에만 핸들링
    yield put({type: "LOGIN_USER_FAILED", payload: e.message});
  }
}

function logoutUser() {
  return auth.signOut();
}

function* mySaga() {
  yield takeEvery("LOGIN_GOOGLE_USER_REQUEST", loginGoogleUser);
  yield takeEvery("LOGIN_FACEBOOK_USER_REQUEST", facebookProvider);
  yield takeEvery("LOGOUT_USER", logoutUser);
}

export default mySaga;
