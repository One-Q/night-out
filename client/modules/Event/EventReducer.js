// Import Actions
import { ADD_EVENT, ADD_EVENTS, DELETE_EVENT, RESEARCH_EVENTS } from './EventActions';

// Initial State
const initialState = {};

const EventReducer = (state = initialState, action) => {
  switch (action.type) {
    /*
    case ADD_EVENT :
      return {
        data: [action.event, ...state.data],
      };
    */
    case ADD_EVENTS :
      return {
        data: action.events,
      };

    default:
      return state;
  }
};

export const getEvents = state => state.events.data;

export const getEvent = (state, slug) => state.events.data.filter(event => event.slug === slug)[0];

export default EventReducer;
