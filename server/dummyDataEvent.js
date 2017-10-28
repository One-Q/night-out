import Event from './models/event';
const jsonEvents = require('./events.json');
export default function () {
	Event.count().exec((err, count) => {
		if (count > 0) {
			return;
		}
		var events = [];
		for (var i = 0; i < jsonEvents.length; i++){
			events[i] = new Event(jsonEvents[i]);
			//console.log("ajout de "+i)
		}
		Event.create(events, (error) => {
			if (!error) {
				//console.log('ready to go....');
			}
		});
	});
}
