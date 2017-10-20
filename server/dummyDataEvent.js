import Event from './models/event';

export default function () {
  Event.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
		/*
    const event1 = new Event({
			name: "Quentin's event",
    picture: "None",
    description: "This is Quentin's event",
    category: "MUSIC",
    location: {
        city: "Bruxelles",
        street: "Avenue Paul Deschanel",
        latitude: 50.861471,
        longitude: 4.379874
    },
    slug: "quentin-event",
    cuid: "cj8yv37pj0000x8r60e0gp2s0",
    startTime: {
    	$date: "2017-10-13T18:59:17.769Z"
    },
    "dateAdded": {
        "$date": "2017-10-13T18:59:17.769Z"
    }}
);*/
    // const post2 = new Post({ name: 'Admin', title: 'Lorem Ipsum', slug: 'lorem-ipsum', cuid: 'cikqgkv4q01ck7453ualdn3hf', content: content2 });
		/*
    Post.create([post1, post2], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
		});
		*/
  });
}
