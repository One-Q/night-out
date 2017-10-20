// Import Actions
import { ADD_EVENT, ADD_EVENTS, DELETE_EVENT } from './EventActions';

// Initial State
const initialState = {};

const EventReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENTS :
      return {
        data: action.events,
      };
    default:
      return state;
  }
};

export default EventReducer;
