function getData() {
	const requestURL = 'https://randomuser.me/api/?results=50&inc=name,gender,picture,dob';
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

function createPeople(person) {
	const human = document.createElement('li');
	human.classList.add('people__human');
	coloringCard(person, human);
	human.innerHTML = `
	<img class='people__img' src='${person.picture.large}'>
	<h3 class='people__name'>Меня зовут ${person.name.first}</h3>	
	<p class='people__age'>Мне ${person.dob.age}</p>
	<img class='people__gender' src='${convertGender(person)}'>
	`
	return human;
}

const peopleList = document.querySelector('.people');
let receivedPeople = [];

function createPeopleHTML() {
	getData().then(people => {
		receivedPeople = [...people];
		const peopleHtml = receivedPeople.map(human => createPeople(human))
		peopleList.append(...peopleHtml)
	})
}
createPeopleHTML();


function convertGender(person) {
	if (person.gender == 'male') person.gender = './images/male-svgrepo-com.svg';
	if (person.gender == 'female') person.gender = './images/female-svgrepo-com.svg';
	return person.gender;
}
function coloringCard(person, human) {
	if (person.gender == 'male') human.classList.add('people__human_male')
	if (person.gender == 'female') human.classList.add('people__human_female')
}




// Sort and Filter
const form = document.querySelector('.filter');
form.addEventListener('change', filterData);

function filterData({ currentTarget }) {
	const checkedGender = Array.from(currentTarget.elements.gender).find(gender => gender.checked)
}
