let limit = 10
let offset = 0
let pokemonAPI = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`

const pokemonList = document.getElementById("pokemon-list")

const previousPokemon = () => {
    if (offset > 0) {
        pokemonList.innerHTML = ""
        offset -= limit
        pokemonAPI = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        getPokemon(pokemonAPI); 
    }
}

const nextPokemon = () => {
    if(offset < 1000000) {
        pokemonList.innerHTML = ""
        offset += limit
        pokemonAPI = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        getPokemon(pokemonAPI);
    }
}

const createBox = (ele) => {
    const div = document.createElement("div")
    div.classList.add("card")

    div.innerHTML = `<div class="wrapper">
      <img src="${ele?.sprites?.other?.dream_world?.front_default}" class="cover-image" />
    </div>
    <p style="font-size:30px; color: white; text-transform:capitalize">${ele?.name}</p>
    <img src="${ele?.sprites?.other?.dream_world?.front_default}" class="character" />
    `
    pokemonList.appendChild(div)
}

const getPokemonDetails = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    createBox(data);
}

const getPokemon = async (url) => {
    let res = await fetch(url)
    let data = await res.json()
    data?.results?.forEach(element => {
        getPokemonDetails(element?.url);
    });
}

getPokemon(pokemonAPI)