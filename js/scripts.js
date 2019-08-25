// this will be the repository of pokemon displayed in application
let pokemonRepo = [
	{ name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison'] },
	{ name: 'Ivysaur', height: 1, types: ['grass', 'poison'] },
	{ name: 'Venusaur', height: 0.7, types: ['grass', 'poison'] },
	{ name: 'Charmander', height: 0.6, types: ['fire'] },
	{ name: 'Charmeleon', height: 1.1, types: ['fire'] },
	{ name: 'Charizard', height: 1.7, types: ['fire'] }
];

document.write(pokemonRepo[('name', 'height')]);

for (var element in pokemonRepo) {
	document.write(element, pokemonRepo[element]);
}
