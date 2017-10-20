import Event from './models/event';

export default function () {
	Event.count().exec((err, count) => {
		if (count > 0) {
			return;
		}
		const event1 = new Event({
			name: "Cours de Yoga",
			picture: 'None',
			description: "Nous vous attendons nombreux ",
			category: 'SPORT',
			location: {
				city: 'Bruxelles',
				street: 'Avenue Tomberg',
				latitude: 57.861471,
				longitude: 8.379874,
			},
			slug: 'cours-yoga',
			cuid: 'cj8yv37pj0300x8r60e0gp2s0',
			startTime: Date.now(),
			dateAdded: Date.now()
		});
		const event2 = new Event({
			name: "Fête de la musique",
			picture: 'None',
			description: "Venez vous ambiancer",
			category: 'MUSIC',
			location: {
				city: 'Bruxelles',
				street: 'Avenue du Parc',
				latitude: 12.861471,
				longitude: 9.379874,
			},
			slug: 'fete-music',
			cuid: 'cj8yv42pj0000x8r60e0gp2s0',
			startTime: Date.now(),
			dateAdded: Date.now()
		});
		const event3 = new Event({
			name: "Manifestation contre Trump",
			picture: 'None',
			description: "Y en a marre",
			category: 'POLITIQUE',
			location: {
				city: 'Bruxelles',
				street: 'avenue Schuman',
				latitude: 21.861471,
				longitude: 86.379874,
			},
			slug: 'manif-trump',
			cuid: 'cj8yv37pj1234x8r60e0gp2s0',
			startTime: Date.now(),
			dateAdded: Date.now()
		});
		const event4 = new Event({
			name: "Anniversaire de Josette",
			picture: 'None',
			description: "Amenez vos consommations",
			category: 'FETE',
			location: {
				city: 'Charleroi',
				street: 'Avenue de la Gare',
				latitude: 41.861471,
				longitude: 6.379874,
			},
			slug: 'anif-josette',
			cuid: 'cj8yv37pj0000x8r50f0gp2s0',
			startTime: Date.now(),
			dateAdded: Date.now()
		});
		const event5 = new Event({
			name: "Conférence sur les poissons rouges",
			picture: 'None',
			description: "Sont-ils dangereux ?",
			category: 'MUSIC',
			location: {
				city: 'Knokke',
				street: 'Avenue de la Digue',
				latitude: 30.861471,
				longitude: 14.379874,
			},
			slug: 'conference-poisson',
			cuid: 'cj8uy37pj0000x8r60e0gp2s0',
			startTime: Date.now(),
			dateAdded: Date.now()
		});
		const event6 = new Event({
			name: "Enterrement d'André",
			picture: 'None',
			description: "Vennez habillés en noirs de préférence",
			category: 'DEUIL',
			location: {
				city: 'Waterloo',
				street: 'Avenue des pommes',
				latitude: 34.861471,
				longitude: 5.379874,
			},
			slug: 'enterrement-andre',
			cuid: 'cj8yv37pj0000x8r60e0lq2s0',
			startTime: Date.now(),
			dateAdded: Date.now()
		});
		const event7 = new Event({
			name: "Concert de Diam's",
			picture: 'None',
			description: "La boulette revient sur scène",
			category: 'MUSIC',
			location: {
				city: 'Paris',
				street: 'Avenue du Zénith',
				latitude: 10.861471,
				longitude: 76.379874,
			},
			slug: 'concert-diams',
			cuid: 'ck3yv37pj0000x8r60e0gp2s0',
			startTime: Date.now(),
			dateAdded: Date.now()
		});
		const event8 = new Event({
			name: "Expo de voitures",
			picture: 'None',
			description: "Vives les voitures",
			category: 'EXPO',
			location: {
				city: 'Bruxelles',
				street: 'Avenue du Palais 12',
				latitude: 12.861471,
				longitude: 7.379874,
			},
			slug: 'expo-voiture',
			cuid: 'cj8yv37pj0000x8r12e0gp2s0',
			startTime: Date.now(),
			dateAdded: Date.now()
		});
		const event9 = new Event({
			name: "Distribution de sodas gratuits",
			picture: 'None',
			description: "Glou glou glou",
			category: 'PUB',
			location: {
				city: 'Paris',
				street: 'Avenue des Parisiens',
				latitude: 12.861471,
				longitude: 77.379874,
			},
			slug: 'distri-soda',
			cuid: 'cj8yv37pj0000x8r39JIKgp2s0',
			startTime: Date.now(),
			dateAdded: Date.now()
		});
		const event10 = new Event({
			name: "Bapteme des bleus",
			picture: 'None',
			description: "Viens séquestrer ton bleu",
			category: 'FETE',
			location: {
				city: 'Bruxelles',
				street: 'Avenue de l\'ULB',
				latitude: 21.861471,
				longitude: 6.379874,
			},
			slug: 'bapteme-bleu',
			cuid: 'cj8yv39sz0000x8r60e0gp2s0',
			startTime: Date.now(),
			dateAdded: Date.now()
		});
		// const post2 = new Post({ name: 'Admin', title: 'Lorem Ipsum', slug: 'lorem-ipsum', cuid: 'cikqgkv4q01ck7453ualdn3hf', content: content2 });
		Event.create([event1, event2, event3, event4, event5, event6, event7, event8, event9, event10], (error) => {
			if (!error) {
				// console.log('ready to go....');
			}
		});
	});
}
