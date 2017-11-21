// Import Actions
import { ADD_EVENT, ADD_EVENTS, DELETE_EVENT, RESEARCH_EVENTS , RESEARCHED_ADRESS} from './EventActions';

// Initial State
const initialState = { data: [],adress:[] };

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
    case RESEARCHED_ADRESS :
      return {
        ...state,
        adress: action.adress,
      };
    default:
      return state;
  }
};

export const getEvents = state => state.events.data;

export const getAdress = state => state.events.adress;

export const getEvent = (state, slug) => {
  if (state.events.data[0] === null) return '';
  const test = state.events.data.filter(event => event.slug === slug)[0];
  console.log(test);
  return test;
};

export default EventReducer;
