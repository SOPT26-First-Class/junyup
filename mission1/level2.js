const getInfo = (name, age) => {
	return `${name} is ${age ? age: '?'} years old.`;
};
const memInfo = [
	{
		name: 'Shin',
		age: 26,
		print: function() { console.log(getInfo(this.name, this.age)); },
	},
	{
		name: 'Um',
		age: 26,
		print: function() { console.log(getInfo(this.name, this.age)); },
	},
	{
		name: 'Lee',
		age: 23,
		print: function() { console.log(getInfo(this.name, this.age)); },
	},
	{
		name: 'Jung',
		age: undefined,
		print: function() { console.log(getInfo(this.name, this.age)); },
	},
	{
		name: 'Hwang',
		age: 22,
		print: function() { console.log(getInfo(this.name, this.age)); },
	},
	{
		name: 'Hong',
		age: 26,
		print: function() { console.log(getInfo(this.name, this.age)); },
	},
];

for (let i = 0; i < memInfo.length; i++) {
	process.stdout.write(`${i+1}: `);
	memInfo[i].print();
}