// wrapping pokemonRepo in an IIFE
var pokemonRepository = (function() {
	var repository = [];
	var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=900';
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
		$listItem.classList.add('pokemon-list__item');
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
				item.weight = details.weight;
				item.types = Object.keys(details.types);
			})
			.catch(function(e) {
				console.error(e);
			});
	}
	return {
		add,
		getAll,
		addListItem,
		loadList,
		loadDetails
	};
})();

pokemonRepository.loadList().then(function() {
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
