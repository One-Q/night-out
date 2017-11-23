// Import Actions
import { ADD_EVENT, ADD_EVENTS, DELETE_EVENT, RESEARCH_EVENTS } from './EventActions';

// Initial State
const initialState = { data: [] };

const EventReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT :
      return {
        data: [action.event, ...state.data],
      };
    case ADD_EVENTS :
      console.log('ADD_EVENTS', action.events);
      return {
        data: action.events,
      };
    default:
      return state;
  }
};

export const getEvents = state => state.events.data;


export const getEvent = (state, slug) => {
  if (state.events.data[0] === null) return '';
  const test = state.events.data.filter(event => event.slug === slug)[0];
  console.log(test);
  return test;
};

export default EventReducer;
