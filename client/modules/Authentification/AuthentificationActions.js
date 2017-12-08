import callApi from '../../util/apiCaller';

export const SET_USER = 'SET_USER';

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function login(user) {
  return (dispatch) => {
    return callApi('login', 'post', {
      username: user.username,
      password: user.password,
    }).then((res) => {
      if (res.token) {
        const userReceive = {
          username: user.username,
          token: res.token,
        };
        localStorage.setItem('token', res.token);
        dispatch(setUser(userReceive));
      } else {
        return res;
      }
    });
  };
}

export function signUp(user) {
  return (dispatch) => {
    return callApi('signup', 'post', {
      username: user.username,
      email: user.email,
      password: user.password,
    }).then((res) => {
      if (res.token) {
        const userReceive = {
          username: user.username,
          token: res.token,
        };
        localStorage.setItem('token', res.token);
        dispatch(setUser(userReceive));
      }
      return res;
    });
  }
}

export function verifyToken(token) {
  return (dispatch) => {
    return callApi('amilogged', 'post', {}, token)
    .then((res) => {
      if(!res.user) {
        dispatch(signOutAction());
      } 
      return res;
    });
  }
}

export function signOutAction(){
  return (dispatch) => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      dispatch(setUser({}));
    }
  }
}

export function changePassword(newPassword,token){
  return (dispatch) => {
    return callApi('changepassword', 'post', {newPassword}, token)
    .then((res) => {
      return res;
    })
  }
}
