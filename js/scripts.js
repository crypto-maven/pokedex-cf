var pokemonRepository = (function() {
	var repository = [];
	var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=900';
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
	function addListItem(pokemon) {
		var $pokemonList = $('.pokemon-list');
		var $listItem = $('<li>');

		var $button = $(
			'<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">' +
				pokemon.name +
				'</button>'
		);
		$listItem.append($button);
		$pokemonList.append($listItem);
		$button.on('click', function(event) {
			showDetails(pokemon);
		});
	}
	function showDetails(item) {
		pokemonRepository.loadDetails(item).then(function() {
			console.log(item);
			showModal(item);
		});
	}
	function loadList() {
		return $.ajax(apiUrl)
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
		return $.ajax(url)
			.then(function(details) {
				// Now we add the details to the item
				item.imageUrl = details.sprites.front_default;
				item.height = details.height;
				//loop for each ofthe pokemon types.
				//Also changing the background color depend on each pokemon type.
				item.types = [];
				for (var i = 0; i < details.types.length; i++) {
					item.types.push(details.types[i].type.name);
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
		var $modalContainer = $('#modal-content');
		//clear existing content of the model
		$modalContainer.empty();
		//creating div element in DOM
		//adding class to div DOM element
		var modal = $('<div ></div>');
		//creating closing button in modal content
		var closeButtonElement = $(
			'<button type="button" class="close" data-dismiss="modal" aria-label="Close">Close</button>'
		);

		//creating element for name in modal content
		var nameElement = $('<h1>' + item.name + '</h1>');
		// creating img in modal content
		var imageElement = $('<img class="modal-img">');
		imageElement.attr('src', item.imageUrl);
		//creating element for height in modal content
		var heightElement = $('<p>' + 'height : ' + item.height + '</p>');
		//creating element for weight in modal content
		var weightElement = $('<p>' + 'weight : ' + item.weight + '</p>');
		//creating element for type in modal content
		var typesElement = $('<p>' + 'types : ' + item.types + '</p>');
		//creating element for abilities in modal content
		var abilitiesElement = $(
			'<p>' + 'abilities : ' + item.abilities + '</p>'
		);
		//appending modal content to webpage
		modal.append(closeButtonElement);
		modal.append(nameElement);
		modal.append(imageElement);
		modal.append(heightElement);
		modal.append(weightElement);
		modal.append(typesElement);
		modal.append(abilitiesElement);
		$modalContainer.append(modal);
		//adds class to show the modal
		$modalContainer.addClass('is-visible');
	}

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails
	};
})();
pokemonRepository.loadList().then(function() {
	// Now the data is loaded!
	pokemonRepository.getAll().forEach(function(pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});
// pokemonRepository.loadDetails();
// pokemonRepository.loadList();
