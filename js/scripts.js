// this will be the repository of pokemon displayed in application
let pokemonRepo = [
	{ name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison'] },
	{ name: 'Ivysaur', height: 1, types: ['grass', 'poison'] },
	{ name: 'Venusaur', height: 0.7, types: ['grass', 'poison'] },
	{ name: 'Charmander', height: 0.6, types: ['fire'] },
	{ name: 'Charmeleon', height: 1.1, types: ['fire'] },
	{ name: 'Charizard', height: 1.7, types: ['fire'] }
];

// for (var element in pokemonRepo) {
// 	document.write(pokemonRepo[element].name, pokemonRepo[element].height);
// }

// for loop that iterates over each item in the repository
for (var printData = 0; printData < pokemonRepo.length; printData++) {
	document.write(pokemonRepo[printData].name, pokemonRepo[printData].height);
}
