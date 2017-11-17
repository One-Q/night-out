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
      console.log(res);
      if (res.token) {
        const userReceive = {
          username: user.username,
          token: res.token,
        };
        localStorage.setItem('token', res.token);
        dispatch(setUser(userReceive));
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
      localStorage.setItem('token', res.token);
      dispatch(setUser(user));
    });
  }
}
