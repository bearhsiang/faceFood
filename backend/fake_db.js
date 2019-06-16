const users = [
	{
		id: '1',
		name: 'Andrew',
		email: 'andrew@example.com',
		figure: "default_figure", 
		password: '123'
	},
	{
		id: '2',
		name: 'Sarah',
		email: 'sarah@example.com',
		figure: "default_figure",
		password: '234'
	},
	{
		id: '3',
		name: 'Mike',
		email: 'mike@example.com',
		figure: 'default_figure',
		password: '345'
	}
]

const posts = [
	{
	  id: '10',
	  author: '1',
	  name: 'bubble tea',
	  date: {
		  y:2010, m:12, d:30,
	  },
	  text: 'sweet',
	  location: 'NTU',
	  photo:[ 'p1'],
	  rate: 5
	},
	{
		id: '11',
		author: '2',
		name: 'hambergur',
		date: {
			y:2011, m:1, d:30,
		},
		text: 'beef',
		location: 'Taipei',
		photo:[ 'p2', 'p3'],
		rate: 3.3
	},
	{
		id: '12',
		author: '1',
		name: 'chocolate',
		date: {
			y:2011, m:1, d:30,
		},
		text: 'black',
		location: 'Kaohsiung',
		photo:[ 'p5'],
		rate: 7.0
	}
]

const photos = [
	{
		id: 'p1',
		author: '10',
		data: ""
	},
	{
		id: 'p2',
		author: '2',
		data: ""
	},
	{
		id: 'p3',
		author: '2',
		data: ""
	},
	{
		id: 'p5',
		author: '1',
		data: ""
	}
]

const db = {
	users,
	posts,
	photos
}

export {db as default }