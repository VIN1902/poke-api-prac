let pokeCount = 151;
let pokeDex = {};

const pokeList = document.getElementById("pokemonList");

window.onload = async function () {
    for (let i = 1; i <= pokeCount; i++) {
        await getPokemon(i);
    }
    for (let i = 1; i <= pokeCount; i++) {
        renderPokemonList(pokeDex, i);
    }
    console.log(pokeDex);
};

async function getPokemon(num) {
    let url = `https://pokeapi.co/api/v2/pokemon/${num}`;
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error("Can't connect to PokeAPI");
        }
        let pokeData = await response.json();

        let pokeHeight = `HT: ${pokeData.height / 10} m`;
        let pokeWeight = `WT: ${pokeData.weight / 10} kg`;
        let pokePType = pokeData.types[0].type.name.toUpperCase();
        let pokeSType = pokeData.types[1]
            ? pokeData.types[1].type.name.toUpperCase()
            : "NONE";
        let pokeNumber = `#` + num.toString().padStart(4, "0");
        let pokeImg = pokeData.sprites.front_default;
        let pokeName = pokeData.name.toUpperCase();
        response = await fetch(pokeData.species.url);
        let pokeDescData = await response.json();
        let entry = pokeDescData.flavor_text_entries.find(
            (text) => text.language.name === "en"
        );
        let pokeDesc = entry
            ? entry.flavor_text.replace(/[\n\r\t\f]/g, " ")
            : "No description available.";

        pokeDex[num] = {
            entryNo: pokeNumber,
            name: pokeName,
            weight: pokeWeight,
            height: pokeHeight,
            image: pokeImg,
            description: pokeDesc,
            PrimaryType: pokePType,
            SecondaryType: pokeSType,
        };
    } catch (error) {
        console.error(
            `Failed to fetch data for Pokemon #${num}: ${error.message}`
        );
    }
}

function renderPokemonList(pokeDex, num) {
    let pokeList = document.getElementById("pokemonList");
    let pokeListItem = document.createElement("option");
    pokeListItem.setAttribute("value", num);
    pokeListItem.textContent = `${pokeDex[num]["name"]}`;
    pokeList.appendChild(pokeListItem);
}

let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", () => {
    let select = document.getElementById("pokemonList");
    let selectedPokeDex = pokeDex[select.value];
    renderPokemonData(selectedPokeDex);
});

function renderPokemonData(pokeDex) {
    let pokemonPhoto = document.querySelector("#pokeLook img");
    let pokemonEntryNo = document.querySelector("#pokeLook p");
    let pokemonName = document.querySelector("#pokeData #pokeName");
    let pokemonType1 = document.querySelector("#pokeData #type1");
    let pokemonType2 = document.querySelector("#pokeData #type2");
    let pokemonHeight = document.querySelector("#pokeData #pokeHT");
    let pokemonWeight = document.querySelector("#pokeData #pokeWT");
    let pokemonDescription = document.querySelector("#display #pokeDesc");

    let displaySection = document.querySelector("#display");
    displaySection.classList.remove("hidden");

    pokemonPhoto.setAttribute("src", pokeDex.image);

    pokemonEntryNo.textContent = pokeDex.entryNo;

    pokemonName.textContent = pokeDex.name;

    pokemonType1.textContent = pokeDex.PrimaryType;

    pokemonType2.textContent = pokeDex.SecondaryType;

    pokemonHeight.textContent = pokeDex.height;
    pokemonWeight.textContent = pokeDex.weight;

    pokemonDescription.textContent = pokeDex.description;
}
