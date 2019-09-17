// this will be the repository of pokemon displayed in application
// let pokemonRepo = [
// 	{ name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison'] },
// 	{ name: 'Ivysaur', height: 1, types: ['grass', 'poison'] },
// 	{ name: 'Venusaur', height: 0.7, types: ['grass', 'poison'] },
// 	{ name: 'Charmander', height: 0.6, types: ['fire'] },
// 	{ name: 'Charmeleon', height: 1.1, types: ['fire'] },
// 	{ name: 'Charizard', height: 1.7, types: ['fire'] }
// ];

// wrapping pokemonRepo in an IIFE
(function(pokemonRepository) {
	var pokemonRepository = repository;
	var repository = [
		{ name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison'] },
		{ name: 'Ivysaur', height: 1, types: ['grass', 'poison'] },
		{ name: 'Venusaur', height: 0.7, types: ['grass', 'poison'] },
		{ name: 'Charmander', height: 0.6, types: ['fire'] },
		{ name: 'Charmeleon', height: 1.1, types: ['fire'] },
		{ name: 'Charizard', height: 1.7, types: ['fire'] }
	];
})(pokemonRepository);

// for loop that iterates over each item in the repository
for (var printData = 0; printData < pokemonRepo.length; printData++) {
	document.write(pokemonRepo[printData].name, pokemonRepo[printData].height);
}

for (var printData = 0; printData < pokemonRepo.length; printData++) {
	if (pokemonRepo[printData].height >= 1.5) {
		document.write(
			pokemonRepo[printData].name,
			pokemonRepo[printData].height,
			' - Wow, that is big!'
		);
	}
}

// forEach that prints the details of the pokemon repo exercise 1.4
Object.keys(pokemonRepo).forEach(function(property) {
	console.log(pokemonRepo[property]);
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
