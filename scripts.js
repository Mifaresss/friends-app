function getData() {
	const requestURL = 'https://randomuser.me/api/?results=30&inc=name,gender,picture,dob';
	return fetch(requestURL)
		.then(response => {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response.json();
		})
		.then(data => data.results)
}

function createPeople(person) {
	const human = document.createElement('li');
	human.classList.add('people__human')
	human.innerHTML = `
	<img class='people__img' src='${person.picture.large}'>
	<h3 class='people__name'>Меня зовут ${person.name.first}</h3>	
	<p class='people__age'>Мне ${person.dob.age}</p>
	`
	return human;
}

const peopleList = document.querySelector('.people');
function createPeopleHTML() {
	getData().then(people => {
		const peopleHtml = people.map(human => createPeople(human))
		peopleList.append(...peopleHtml)
	})
}
createPeopleHTML();