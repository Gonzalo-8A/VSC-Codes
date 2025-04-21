const pokemonInput = document.getElementById("pokemon-input");
const searchBtn = document.getElementById("search-btn");
const compareBtn = document.getElementById("compare-btn");
const pokemonsContainer = document.getElementById("pokemons-container");
const pokedex = document.querySelector(".pokedex")

let statsArr1 = [];
let statsArr2 = [];

// Function to render a Pokémon's information
const renderPokemon = async (pokemon, cardIndex) => {
  const pokemonCard = document.querySelector(`#pokemon-card-${cardIndex}`);
  const pokemonName = pokemonCard.querySelector(".pokemon-name");
  const pokemonBody = pokemonCard.querySelector(".pokemon-body-info");
  const pokemonImg = pokemonCard.querySelector(".pokemon-image");
  const pokemonType = pokemonCard.querySelector(".pokemon-types");
  const statsTable = pokemonCard.querySelector(".pokemon-stats");

  pokemonName.innerHTML = `${pokemon.name.toUpperCase()}
  <span class="pokemon-id">#${pokemon.id}</span>`;
  pokemonBody.innerHTML = `
    <span class="weight">Weight: ${pokemon.weight}</span> &nbsp; <span class="height">Height: ${pokemon.height}</span>
  `;
  pokemonImg.src = `${pokemon.sprites.front_default}`;
  pokemonImg.style.display = "block";

  // Render types
  pokemonType.innerHTML = pokemon.types.map(type => `
    <span class="pokemon-type ${type.type.name}">${type.type.name}</span>
  `).join(' ');

  statsTable.style.display = '';

  // Render stats
  await pokemon.stats.forEach(statItem => {
    const statName = statItem.stat.name;
    const statValue = statItem.base_stat;
    const statElement = pokemonCard.querySelector(`#${statName}-${cardIndex}`);
    if (statElement) {
      statElement.textContent = statValue;
    }
  });



};

const getPokemon = async (input, cardIndex) => {
  try {
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${input.toLowerCase()}`);
    const data = await res.json();
    await renderPokemon(data, cardIndex);
    if(cardIndex === 0) {
      getStats1(cardIndex)
      compareStats(statsArr1,statsArr2)
    } else {
      getStats2(cardIndex)
      compareStats(statsArr1,statsArr2)
    }

  } catch (err) {
    alert("Please introducing a valid Pokémon name or ID");
  }
};

const comparePokemon = (cardIndex) => {
  const existingCard = document.getElementById("pokemon-card-1");

  if (compareBtn.textContent === "Add a Pokémon") {
    compareBtn.textContent = "Remove Pokémon";

    const newPokemonCard = document.createElement("div");
    newPokemonCard.classList.add("pokemon-card");
    newPokemonCard.id = "pokemon-card-1";

    pokemonsContainer.classList.add("pokemons-container");
    pokedex.classList.add("comparing");

    newPokemonCard.innerHTML = `
      <div class="pokemon-input">
        <label for="pokemon-input-compare"></label>
        <input id="pokemon-input-compare" type="text">
        <button id="search-btn-compare"></button>
      </div>
      <div class="pokemon-info">
        <h2 class="pokemon-name"></h2>
        <p class="pokemon-body-info"></p>
        <img class="pokemon-image" src="" alt="Pokemon image" style="display:none">
        <div class="pokemon-types"></div>
      </div>
      <div class="pokemon-stats" style="display:none">
        <h3>Stats</h3>
        <table>
          <thead>
            <tr>
              <th>Stat</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>HP:</td>
              <td class="stat-${cardIndex}" id="hp-${cardIndex}"></td>
            </tr>
            <tr>
              <td>Attack:</td>
              <td class="stat-${cardIndex}" id="attack-${cardIndex}"></td>
            </tr>
            <tr>
              <td>Defense:</td>
              <td class="stat-${cardIndex}" id="defense-${cardIndex}"></td>
            </tr>
            <tr>
              <td>Sp. Attack:</td>
              <td class="stat-${cardIndex}" id="special-attack-${cardIndex}"></td>
            </tr>
            <tr>
              <td>Sp. Defense:</td>
              <td class="stat-${cardIndex}" id="special-defense-${cardIndex}"></td>
            </tr>
            <tr>
              <td>Speed:</td>
              <td class="stat-${cardIndex}" id="speed-${cardIndex}"></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    pokemonsContainer.appendChild(newPokemonCard);

    const searchBtnCompare = newPokemonCard.querySelector("#search-btn-compare");
    const pokemonInputCompare = newPokemonCard.querySelector("#pokemon-input-compare");

    searchBtnCompare.addEventListener("click", () => {
      getPokemon(pokemonInputCompare.value, 1);
      pokemonInputCompare.value = "";
    });

    pokemonInputCompare.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        getPokemon(pokemonInputCompare.value, 1);
        pokemonInputCompare.value = "";
      }
    });
  } else {
    compareBtn.textContent = "Add a Pokémon";

    if (existingCard) {
      pokemonsContainer.removeChild(existingCard);
      pokedex.classList.remove("comparing");

    }
  }
}


const getStats1 = (cardIndex) => {
  const statsNodeList = document.querySelectorAll(`.stat-${cardIndex}`);
  const updateArr1 = Array.from(statsNodeList).map((el) => ({
    cardIndex,
    name: el.id,
    value: Number(el.textContent), 
  }));
  statsArr1 = updateArr1;
};
const getStats2 = (cardIndex) => {
  const statsNodeList = document.querySelectorAll(`.stat-${cardIndex}`);
  const updateArr2 = Array.from(statsNodeList).map((el) => ({
    cardIndex,
    name: el.id,
    value: Number(el.textContent), 
  }));
  statsArr2 = updateArr2;
};

const compareStats = (arr1, arr2) => {
  if(arr1.length < 1 || arr2.length < 1) {
    return
  }

  arr1.forEach((el1, index) => {
    if(el1.value === arr2[index].value){
      document.querySelector(`#${el1.name}`).style = "color: black; font-weight: 400;";
      document.querySelector(`#${arr2[index].name}`).style = "color: black";
      return
    }
    
    if(el1.value > arr2[index].value) {
      document.querySelector(`#${el1.name}`).style = "color: green; font-weight:bold;";
      document.querySelector(`#${arr2[index].name}`).style = "color: red";
    } else {
      document.querySelector(`#${arr2[index].name}`).style = "color: green; font-weight:bold";
      document.querySelector(`#${el1.name}`).style = "color: red";
    }
  })

}

searchBtn.addEventListener('click', () => {
  getPokemon(pokemonInput.value, 0);
  pokemonInput.value = '';
});

pokemonInput.addEventListener('keydown',(e) => {
  if (e.key === 'Enter') {
    getPokemon(pokemonInput.value, 0);
    pokemonInput.value = '';
  }
});

compareBtn.addEventListener('click', () => {
    comparePokemon(1)
});
