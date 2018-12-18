$(function () {
	console.log('our js file loaded....');
	listenForClickUser();
})

function listenForClickUser() {
	let myButton = document.getElementById('myexpenses')
	console.log("myButton: ", myButton);

	myButton.addEventListener('click', function (event) {
		event.preventDefault()

		console.log("event: ", event);
		getUsers()
	})
}

function getUsers() {
	$.ajax({
		url: "/users",
		method: 'get',
		dataType: 'json'
	}).done(function (response) {
		console.log("response: ", response);
		let user = new User(response[0])
		debugger
		// the DOM cannot take raw JSON data
		// you have to create HTML strings to put on the DOM

	});
}

class User {
	constructor(obj) {
		this.name = obj.name,
			this.transactions = obj.transactions,
			this.incomes = obj.incomes,
			this.expenses = obj.expenses
	}
}

User.prototype.customHTML = function () {
	return `<div>${this.name}</div>`
}

User.prototype.financeReport = function () {
	let txArray = this.transactions.map(tx => {
		return (`
			<li>${tx.amount}</li>
		`)
	})
	return `<div>${txArray}</div>`
}


function updateExpense(response) {

	let htmlArray = response.map((exp, index) => {
		return (`
		<li id=${index}>${exp.description} - ${exp.category} - ${exp.amount}</li>
		`)
	})

	let fullHTML = `<ul>${htmlArray.join('')}</ul>`
	$("#expense_list").append(fullHTML)
}

// listeners

// functions that do things after a listener has had an event

// Javascript Object Model


// const brad = new User(data)

// functions that create custom HTML to put on the DOM


// brad.customHTML
// append that to the DOM



// function listenForClickUser() {
// 	console.log('our js file loaded....');

// }