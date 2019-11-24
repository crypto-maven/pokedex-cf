// wrapping pokemonRepo in an IIFE
var pokemonRepository = (function() {
	var repository = [];
	var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	// the validation of the pokemon
	function add(pokemon) {
		if (
			typeof pokemon === 'object' &&
			'name' in pokemon &&
			'detailsUrl' in pokemon
		) {
			repository.push(pokemon);
		} else {
			console.log('add an object');
		}
	}
	function getAll() {
		return repository;
	}

	function addListItem(pokemon = {}) {
		var pokemonList = document.querySelector('.pokemon-list');
		var $listItem = document.createElement('li');
		var button = document.createElement('button');
		// $listItem.classList.add('pokemon-list__item');
		button.innerText = pokemon.name;
		button.classList.add('my-class');
		$listItem.appendChild(button);
		pokemonList.appendChild($listItem);
		button.addEventListener('click', function(event) {
			showDetails(pokemon);
		});
	}

	function showDetails(item) {
		pokemonRepository.loadDetails(item).then(function() {
			console.log(item);
			showModal(item);
		});
	}
	// loading data from external api
	function loadList() {
		return fetch(apiUrl)
			.then(function(response) {
				return response.json();
			})
			.then(function(json) {
				json.results.forEach(function(item) {
					var pokemon = {
						name: item.name,
						detailsUrl: item.url
					};
					add(pokemon);
					console.log(pokemon);
				});
			})
			.catch(function(e) {
				console.error(e);
			});
	}
	function loadDetails(item) {
		var url = item.detailsUrl;
		return fetch(url)
			.then(function(response) {
				return response.json();
			})
			.then(function(details) {
				// adding details to the item
				item.imageUrl = details.sprites.front_default;
				item.height = details.height;
				// item.weight = details.weight;
				item.types = [];
				for (var i = 0; i < details.types.length; i++) {
					item.types.push(details.types[i].type.name);
				}
				if (item.types.includes('grass')) {
					document.getElementById(
						'modal-container'
					).style.background = 'lightgreen';
				} else if (item.types.includes('fire')) {
					document.getElementById(
						'modal-container'
					).style.background = 'red';
				} else if (item.types.includes('psychic')) {
					document.getElementById(
						'modal-container'
					).style.background = '#FF69B4';
				} else if (item.types.includes('poison')) {
					document.getElementById(
						'modal-container'
					).style.background = 'purple';
				} else if (item.types.includes('water')) {
					document.getElementById(
						'modal-container'
					).style.background = 'blue';
				} else if (item.types.includes('bug')) {
					document.getElementById(
						'modal-container'
					).style.background = '#3f000f';
				} else if (item.types.includes('rock')) {
					document.getElementById(
						'modal-container'
					).style.background = '#BC8F8F';
				} else if (item.types.includes('flying')) {
					document.getElementById(
						'modal-container'
					).style.background = '#2F4F4F';
				} else if (item.types.includes('electric')) {
					document.getElementById(
						'modal-container'
					).style.background = 'gold';
				} else if (item.types.includes('ice')) {
					document.getElementById(
						'modal-container'
					).style.background = '#4169E1';
				} else if (item.types.includes('ghost')) {
					document.getElementById(
						'modal-container'
					).style.background = '#8B008B';
				} else if (item.types.includes('ground')) {
					document.getElementById(
						'modal-container'
					).style.background = '#D2B48C';
				} else if (item.types.includes('fairy')) {
					document.getElementById(
						'modal-container'
					).style.background = '#EE82EE';
				} else if (item.types.includes('steel')) {
					document.getElementById(
						'modal-container'
					).style.background = '#708090';
				}
				//loop to get the abilities of a selected pokemon
				item.abilities = [];
				for (var i = 0; i < details.abilities.length; i++) {
					item.abilities.push(details.abilities[i].ability.name);
					// item.abilities.push('slot: ' + details.abilities[i].slot);
					// item.abilities.push('is_hidden: ' + details.abilities[i].is_hidden);
				}

				item.weight = details.weight;
			})
			.catch(function(e) {
				console.error(e);
			});
	}
	// show the modal content
	function showModal(item) {
		var $modalContainer = document.querySelector('#modal-container');
		//clear existing content of the model
		$modalContainer.innerHTML = '';
		//creating div element in DOM
		var modal = document.createElement('div');
		//adding class to div DOM element
		modal.classList.add('modal');
		//creating closing button in modal content
		var closeButtonElement = document.createElement('button');
		closeButtonElement.classList.add('modal-close');
		closeButtonElement.innerText = 'Close';
		// adding event listener to close modal when clicked on button
		closeButtonElement.addEventListener('click', hideModal);
		//creating element for name in modal content
		var nameElement = document.createElement('h1');
		nameElement.innerText = item.name;
		// creating img in modal content
		var imageElement = document.createElement('img');
		imageElement.classList.add('modal-img');
		imageElement.setAttribute('src', item.imageUrl);
		//creating element for height in modal content
		var heightElement = document.createElement('p');
		heightElement.innerText = 'height : ' + item.height;
		//creating element for weight in modal content
		var weightElement = document.createElement('p');
		weightElement.innerText = 'weight : ' + item.weight;
		//creating element for type in modal content
		var typesElement = document.createElement('p');
		typesElement.innerText = 'types : ' + item.types;
		//creating element for abilities in modal content
		var abilitiesElement = document.createElement('p');
		abilitiesElement.innerText = 'abilities : ' + item.abilities;
		//appending modal content to webpage
		modal.appendChild(closeButtonElement);
		modal.appendChild(nameElement);
		modal.appendChild(imageElement);
		modal.appendChild(heightElement);
		modal.appendChild(weightElement);
		modal.appendChild(typesElement);
		modal.appendChild(abilitiesElement);
		$modalContainer.appendChild(modal);
		//adds class to show the modal
		$modalContainer.classList.add('is-visible');
	}
	//hides modal when clicked on close button
	function hideModal() {
		var $modalContainer = document.querySelector('#modal-container');
		$modalContainer.classList.remove('is-visible');
	}
	//hides modal when clicked on ESC on keyboard
	window.addEventListener('keydown', e => {
		var $modalContainer = document.querySelector('#modal-container');
		if (
			e.key === 'Escape' &&
			$modalContainer.classList.contains('is-visible')
		) {
			hideModal();
		}
	});
	//hides modal if clicked outside of it
	var $modalContainer = document.querySelector('#modal-container');
	$modalContainer.addEventListener('click', e => {
		var target = e.target;
		if (target === $modalContainer) {
			hideModal();
		}
	});
	return {
		add,
		getAll,
		addListItem,
		loadList,
		loadDetails,
		showModal,
		hideModal
	};
})();
pokemonRepository.loadList().then(function() {
	// Now the data is loaded!
	pokemonRepository.getAll().forEach(function(pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});
// end of modal
// functionality for the nav bar- from bulma documentation
document.addEventListener('DOMContentLoaded', function() {
	// get all "navbar burger" elements
	var $navbarBurgers = Array.prototype.slice.call(
		document.querySelectorAll('.navbar-burger'),
		0
	);
	// check if there are any navbar burgers
	if ($navbarBurgers.length > 0) {
		// add a click event on each of them
		$navbarBurgers.forEach(function($el) {
			$el.addEventListener('click', function() {
				// get the target from the "data-target" attribute
				var target = $el.dataset.target;
				var $target = document.getElementById(target);
				// toggle the class on both the "navbar-burger" and the "navbar-menu"
				$el.classList.toggle('is-active');
				$target.classList.toggle('is-active');
			});
		});
	}
});
