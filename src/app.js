let pokeCount = 151;
let pokeDex = {};

const pokeList = document.getElementById("pokemonList");

window.onload = async function () {
    for (let i = 1; i <= pokeCount; i++) {
        await getPokemon(i);
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
        let pokeImg = pokeData.sprites.front_default;
        let pokeName = pokeData.name.toUpperCase();
        response = await fetch(pokeData.species.url);
        let pokeDesc = await response.json();
        pokeDesc = pokeDesc.flavor_text_entries[0].flavor_text.replace(
            /[\n\r\t\f]/g,
            " "
        );

        pokeDex[num] = {
            name: pokeName,
            image: pokeImg,
            description: pokeDesc,
        };
    } catch (error) {
        alert(`Something went wrong...`);
    }
}
