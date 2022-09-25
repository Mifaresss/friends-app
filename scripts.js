let newPersonGender;
function getData() {
	const requestURL = 'https://randomuser.me/api/?results=54&inc=name,gender,picture,dob';
	return fetch(requestURL)
		.then(response => {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response.json();
		})
		// ↓ Массив объектов (людей)
		.then(data => data.results)
}

function createHuman(person) {
	const human = document.createElement('li');
	human.classList.add('people__human');
	coloringCard(person, human);
	human.innerHTML = `
	<img class='people__img' src='${person.picture.large}'>
	<h3 class='people__name'>My name is ${person.name.first}</h3>	
	<p class='people__age'>I am ${person.dob.age} years old</p>
	<img class='people__gender' src='${convertGender(person)}'>
	`
	return human;
}

const peopleList = document.querySelector('.people__list');
let receivedPeople = [];
let filteredPeople = [];

function createPeopleHTML() {
	getData().then(people => {
		receivedPeople = people.slice();
		renderPeople(receivedPeople);
	})
}
createPeopleHTML();

function renderPeople(people) {
	peopleList.innerHTML = '';
	const peopleHtml = people.map(human => createHuman(human))
	peopleList.append(...peopleHtml)
}


function convertGender(person) {
	if (person.gender == 'male') newPersonGender = './images/male-svgrepo-com.svg';
	if (person.gender == 'female') newPersonGender = './images/female-svgrepo-com.svg';
	return newPersonGender;
}
function coloringCard(person, human) {
	if (person.gender == 'male') human.classList.add('people__human_male')
	if (person.gender == 'female') human.classList.add('people__human_female')
}




// Sort and Filter
const form = document.querySelector('.filter');
form.addEventListener('change', filterData);

function filterData({ currentTarget }) {
	const checkedInput = Array.from(currentTarget.elements.gender).find(gender => gender.checked);
	const checkedGender = checkedInput.id;
	const filteredData = filterByGender(checkedGender, receivedPeople);
	renderPeople(filteredData);
}

function filterByGender(checked, people) {
	if (checked === 'all') return people;
	filteredPeople = people.filter(human => {
		if (human.gender == checked) return human;
	});
	return filteredPeople;
}

