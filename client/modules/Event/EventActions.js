import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_EVENT = 'ADD_EVENTS';
export const ADD_EVENTS = 'ADD_EVENTS';
export const DELETE_EVENT = 'DELETE_EVENT';

// Export Actions
export function addEvent(event) {
	return {
		type: ADD_EVENT,
		event,
	};
}

export function fetchEvents() { 
	return (dispatch) => {
		return callApi('events').then(res => {
			dispatch(addEvents(res.events));
		});
	};
}

export function addEvents(events) {
	return {
		type: ADD_EVENTS,
		events,
	};
}

export function fetchEvent(slug) {
	return (dispatch) => {
		return callApi(`events/${slug}`).then(res => dispatch(addEvent(res.event)));
	};
}