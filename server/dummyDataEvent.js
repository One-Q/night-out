import Event from './models/event';
import User from './models/user';

const jsonEvents = require('./events.json');
export default function () {
	User.count().exec((err, count) => {
		if (count > 0) {
			return;
		}
		User.create([new User({ username: "Test", password: "test", slug: 'test-user', cuid: 'cikqgkv4p31ck7453ualdn3hd' })], (error) => {
			if (!error) {
				//console.log('ready to go....');
			}
		});
	});

	Event.count().exec((err, count) => {
		if (count > 0) {
			return;
		}
		var events = [];
		for (var i = 0; i < jsonEvents.length; i++) {
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
