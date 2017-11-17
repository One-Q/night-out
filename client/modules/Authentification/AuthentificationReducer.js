import { SET_USER } from './AuthentificationActions';

const initialState = { user: {} };

const AuthentificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER :
      return {
        user: action.user,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getUser = state => state.user;

// Export Reducer
export default AuthentificationReducer;
