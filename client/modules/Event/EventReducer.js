// Import Actions
import { ADD_EVENT, ADD_EVENTS, DELETE_EVENT, RESEARCH_EVENTS } from './EventActions';

// Initial State
const initialState = {};

const EventReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENTS :
    console.log(action);
      return {
        data: action.events,
      };
    case RESEARCH_EVENTS : 
      console.log(action);
      return state;
    default:
      return state;
  }
};

export const getEvents = state => state.events.data;

export default EventReducer;
