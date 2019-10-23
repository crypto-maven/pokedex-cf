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
	function add(pokemon) {
		repository.push(pokemon);
	}
	function getAll() {
		return repository;
	}
	function addListItem() {}
	return {
		add,
		getAll,
		addListItem
	};
})();
console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Pikachu', height: 0.4 });
console.log(pokemonRepository.getAll());

//  create a variable above the forEach loop block, then assign it the ul element
var $pokemonList = document.querySelector('.pokemon-list');

// for loop that iterates over each item in the repository
for (var i = 0; i < pokemonRepository.getAll().length; i++) {
	let printData = pokemonRepository.getAll()[i];
	var li = document.createElement('li');
	li.innerText = printData.name;
	var button = document.createElement('button');
	button.innerText = pokemonRepository.name;
	li.appendChild(button);
	$pokemonList.appendChild(li);

	// if (printData.height >= 1.5) {
	// 	document.write(
	// 		printData.name,
	// 		printData.height,
	// 		' - Wow, that is big!'
	// 	);
	// }
}

// forEach that prints the details of the pokemon repo exercise 1.4
Object.keys(pokemonRepository).forEach(function(property) {
	console.log(pokemonRepository[property]);
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
debugger;
