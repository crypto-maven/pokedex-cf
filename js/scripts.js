// wrapping pokemonRepo in an IIFE
var pokemonRepository = (function() {
	var repository = [
		{ name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison'] },
		{ name: 'Ivysaur', height: 1, types: ['grass', 'poison'] },
		{ name: 'Venusaur', height: 0.7, types: ['grass', 'poison'] },
		{ name: 'Charmander', height: 0.6, types: ['fire'] },
		{ name: 'Charmeleon', height: 1.1, types: ['fire'] },
		{ name: 'Charizard', height: 1.7, types: ['fire'] }
	];
	// the validation of the pokemon
	function add(pokemon) {
		if (
			typeof pokemon === 'object' &&
			'name' in pokemon &&
			'height' in pokemon &&
			'types' in pokemon
		) {
			repository.push(pokemon);
		}
	}
	function getAll() {
		return repository;
	}
	function addListItem(pokemon = {}) {
		var pokemonList = document.querySelector('.pokemon-list');
		var $listItem = document.createElement('li');
		var button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('my-class');
		$listItem.appendChild(button);
		pokemonList.appendChild($listItem);
		button.addEventListener('click', function(event) {
			showDetails(pokemon);
		});
	}
	function showDetails(pokemon) {
		console.log(pokemon);
	}
	return {
		add,
		getAll,
		addListItem
	};
})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Pikachu', height: 0.3, types: ['electric'] });
console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(item) {
	// var size;
	// if (item.height > 1) {
	// 	size = 'Wow, that’s big!';
	// } else {
	// 	size = "It's small pokemon";
	// }

	// var result;
	// item.types.forEach(function(typeItem) {
	// 	if (typeItem == 'grass') {
	// 		result = '<span style="color:green;"> ';
	// 	} else if (typeItem == 'fire') {
	// 		result = '<span style="color:red;"> ';
	// 	} else if (typeItem == 'electric') {
	// 		result = '<span style="color:yellow;"> ';
	// 	} else if (typeItem == 'poison') {
	// 		result = '<span style="color:rgb(106, 42, 106);"> ';
	// 	} else if (typeItem == 'psychic') {
	// 		result = '<span style="color:orange;"> ';
	// 	}
	// });
	pokemonRepository.addListItem(item);
});

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
