import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_EVENT = 'ADD_EVENT';
export const ADD_EVENTS = 'ADD_EVENTS';
export const DELETE_EVENT = 'DELETE_EVENT';
export const RESEARCH_EVENTS = 'RESEARCH_EVENTS';

// Export Actions
export function addEvent(event) {
  return {
    type: ADD_EVENT,
    event,
  };
}

export function addEvents(events) {
  return {
    type: ADD_EVENTS,
    events,
  };
}

export function researchEvents(events) {
  return {
    type: ADD_EVENTS,
    events,
  };
}

export function fetchEvents() {
  return (dispatch) => {
    return callApi('events').then(res => {
      dispatch(addEvents(res.event));
    });
  };
}

export function fetchEvent(slug) {
  return (dispatch) => {
    return callApi(`events/${slug}`).then(res => dispatch(addEvent(res.event)));
  };
}

export function fetchResearch(event) {
  return (dispatch) => {
    return callApi(`research/${event}`).then(res =>dispatch(researchEvents(res.elastic_mongo_response)));
  };
}

export function fetchEventsFromFacebook(value,distance,long,lat,category){
  return (dispatch) => {
    return callApi(`eventsFromFacebook/${value}&${distance*1000}&${long}&${lat}&${category}`).then(res =>dispatch(researchEvents(res.eventsFacebook)));
  };
}

export function fetchEventsFromFacebookWithoutValue(long,lat,distance){
  return (dispatch) => {
    return callApi(`eventsFromFacebook/${long}&${lat}&${distance*1000}`).then(res =>dispatch(researchEvents(res.eventsFacebook)));
  };
}
