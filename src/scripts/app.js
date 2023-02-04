import { saveToLocalStorageByName, GetLocalStorage, RemoveFromLocalStorage, favorites } from "./localStorage.js";

let boxSearch = document.getElementById("boxSearch");
let searchBtn = document.getElementById("searchBtn");
let pokemonName =document.getElementById("pokemonName");
let normalPic = document.getElementById("normalPic");
let secondTypePic = document.getElementById("secondTypePic");
let locationText = document.getElementById("locationText");
let abilityText = document.getElementById("abilityText");
let moves = document.getElementById("moves");
let evolutionText = document.getElementById("evolutionText");
let Randomize = document.getElementById("Randomize");
let favoriteBtn = document.getElementById("favoriteBtn");
let favoriteBox = document.getElementById("favoriteBox");
let FavoriteList = document.getElementById("FavoriteList");
let favoritesBoxInner = document.getElementById("favoritesBoxInner");
let pictureStar = document.getElementById("pictureStar");

let srcGet = "";
let asyncPokeApi;
let asyncPokeApi2;
let locationPokeApi;
let evolutionPokeApi;
let evoChainPokeApi;

searchBtn.addEventListener("click", function(){
    GetPokeData(boxSearch.value.toLowerCase());
    if(favorites.includes(boxSearch.value.toLowerCase().charAt(0).toUpperCase() + boxSearch.value.slice(1)))
    {
        pictureStar.src = "./assets/Star 2.png";
    }
    else
    {
        pictureStar.src = "./assets/Star 1.png";
    }
})

Randomize.addEventListener("click", function(){
    GetPokeData(Math.floor(Math.random() * 649) + 1);
})

favoriteBtn.addEventListener("click", function(){
    addAndRemoveFav(pokemonName.textContent)
})

FavoriteList.addEventListener("click", function(){
    // toggleFavorites();
    favoritesBoxInner.innerHTML = "";
    CreateElements();
})

async function GetPokeData(name){
    console.log(name);
    await fetch("https://pokeapi.co/api/v2/pokemon/" + name)
    .then(data => data.json())
    .then(data => {
        asyncPokeApi = data;
        console.log(asyncPokeApi);
        pokemonName.textContent = asyncPokeApi.name.toLowerCase().charAt(0).toUpperCase() + asyncPokeApi.name.slice(1);
        console.log(asyncPokeApi.sprites);

        normalPic.src = asyncPokeApi.sprites.front_default;
        normalPic.className = "normal2Pic";

        shinyPic.src = asyncPokeApi.sprites.front_shiny;
        shinyPic.className = "shiny2Pic";

        typePic.className = "type2Pic";
        secondTypePic.className = "secondType2Pic";

        let locationUrl = asyncPokeApi.location_area_encounters;

        GetLocation(locationUrl);

        abilityText.textContent = asyncPokeApi.abilities[0].ability.name.toLowerCase().charAt(0).toUpperCase() + asyncPokeApi.abilities[0].ability.name.slice(1);

        if(asyncPokeApi.abilities[1])
        {
            abilityText.textContent += ", " + asyncPokeApi.abilities[1].ability.name.toLowerCase().charAt(0).toUpperCase() + asyncPokeApi.abilities[1].ability.name.slice(1);
        }

        if(asyncPokeApi.abilities[2])
        {
            abilityText.textContent += ", " + asyncPokeApi.abilities[2].ability.name.toLowerCase().charAt(0).toUpperCase() + asyncPokeApi.abilities[2].ability.name.slice(1); 
        }

        removeOptions(moves);

        asyncPokeApi.moves.map(person => {
            let option = document.createElement('option');
            option.value = person.move.name;
            option.textContent = person.move.name.toLowerCase().charAt(0).toUpperCase() + person.move.name.slice(1);

            moves.appendChild(option);
        })

        let evolutionUrl = asyncPokeApi.species.url;
        GetEvolutions(evolutionUrl);

        let type1 = asyncPokeApi.types[0].type.name;
        console.log(type1);

        if(type1 === "normal")
            {
                typePic.src = "./assets/NormalIC_RSE.png"
            }
            else if( type1 === "bug")
            {
                typePic.src = "./assets/BugIC_RSE.png"
            }
            else if( type1 === "dark")
            {
                typePic.src = "./assets/DarkIC_RSE.png"
            }
            else if( type1 === "dragon")
            {
                typePic.src = "./assets/DragonIC_RSE.png"
            }
            else if( type1 === "electric")
            {
                typePic.src = "./assets/ElectricIC_RSE.png"
            }
            else if( type1 === "fairy")
            {
                typePic.src = "./assets/Fairy.png"
            }
            else if( type1 === "fighting")
            {
                typePic.src = "./assets/FightingIC_RSE.png"
            }
            else if( type1 === "fire")
            {
                typePic.src = "./assets/FireIC_RSE.png"
            }
            else if( type1 === "flying")
            {
                typePic.src = "./assets/FlyingIC_RSE.png"
            }
            else if( type1 === "ghost")
            {
                typePic.src = "./assets/GhostIC_RSE.png"
            }
            else if( type1 === "grass")
            {
                typePic.src = "./assets/GrassIC_RSE.png"
            }
            else if( type1 === "ground")
            {
                typePic.src = "./assets/GroundIC_RSE.png"
            }
            else if( type1 === "ice")
            {
                typePic.src = "./assets/IceIC_RSE.png"
            }
            else if( type1 === "poison")
            {
                typePic.src = "./assets/PoisonIC_RSE.png"
            }
            else if( type1 === "psychic")
            {
                typePic.src = "./assets/PsychicIC_RSE.png"
            }
            else if( type1 === "rock")
            {
                typePic.src = "./assets/RockIC_RSE.png"
            }
            else if( type1 === "steel")
            {
                typePic.src = "./assets/SteelIC_RSE.png"
            }
            else if( type1 === "water")
            {
                typePic.src = "./assets/WaterIC_RSE.png"
            }

        



        if(asyncPokeApi.types.length < 2)
        {
            secondTypePic.style.display = "none";
        }
        else
        {
            let type2 = asyncPokeApi.types[1].type.name;
            console.log(type2);
            secondTypePic.style.display = "flex";

            if(type2 === "normal")
            {
                secondTypePic.src = "./assets/NormalIC_RSE.png"
            }
            else if( type2 === "bug")
            {
                secondTypePic.src = "./assets/BugIC_RSE.png"
            }
            else if( type2 === "dark")
            {
                secondTypePic.src = "./assets/DarkIC_RSE.png"
            }
            else if( type2 === "dragon")
            {
                secondTypePic.src = "./assets/DragonIC_RSE.png"
            }
            else if( type2 === "electric")
            {
                secondTypePic.src = "./assets/ElectricIC_RSE.png"
            }
            else if( type2 === "fairy")
            {
                secondTypePic.src = "./assets/Fairy.png"
            }
            else if( type2 === "fighting")
            {
                secondTypePic.src = "./assets/FightingIC_RSE.png"
            }
            else if( type2 === "fire")
            {
                secondTypePic.src = "./assets/FireIC_RSE.png"
            }
            else if( type2 === "flying")
            {
                secondTypePic.src = "./assets/FlyingIC_RSE.png"
            }
            else if( type2 === "ghost")
            {
                secondTypePic.src = "./assets/GhostIC_RSE.png"
            }
            else if( type2 === "grass")
            {
                secondTypePic.src = "./assets/GrassIC_RSE.png"
            }
            else if( type2 === "ground")
            {
                secondTypePic.src = "./assets/GroundIC_RSE.png"
            }
            else if( type2 === "ice")
            {
                secondTypePic.src = "./assets/IceIC_RSE.png"
            }
            else if( type2 === "poison")
            {
                secondTypePic.src = "./assets/PoisonIC_RSE.png"
            }
            else if( type2 === "psychic")
            {
                secondTypePic.src = "./assets/PsychicIC_RSE.png"
            }
            else if( type2 === "rock")
            {
                secondTypePic.src = "./assets/RockIC_RSE.png"
            }
            else if( type2 === "steel")
            {
                secondTypePic.src = "./assets/SteelIC_RSE.png"
            }
            else if( type2 === "water")
            {
                secondTypePic.src = "./assets/WaterIC_RSE.png"
            }
            
        }
        


    });

}

async function GetLocation(url){
    await fetch(url)
    .then(data => data.json())
    .then(data => {
        locationPokeApi = data;
        console.log(locationPokeApi);
        
        if(locationPokeApi.length == 0)
        {
            locationText.textContent = "N/A";
        }
        else
        {
            const str = locationPokeApi[0].location_area.name.replace(/-/g, " ");
            const arr = str.split(" ");
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
            }
            const str2 = arr.join(" ");
        
            locationText.textContent = str2;
        }



    });
}

function removeOptions(element) {
    var i, L = element.options.length - 1;
    for(i = L; i >= 0; i--) {
       element.remove(i);
    }
 }

 async function GetEvolutions(url){
    await fetch(url)
    .then(data => data.json())
    .then(data => {
        evolutionPokeApi = data;
        console.log(evolutionPokeApi);

        let evoChainUrl = evolutionPokeApi.evolution_chain.url;
        GetEvoChain(evoChainUrl);

    });
 }

 async function GetEvoChain(url){
    await fetch(url)
    .then(data => data.json())
    .then(data => {
        evoChainPokeApi = data;
        console.log(evoChainPokeApi);

        let evoChain = [];
        let evoData = evoChainPokeApi.chain;
        
        do {
          let numberOfEvolutions = evoData['evolves_to'].length;  
        
          evoChain.push({
            "species_name": evoData .species.name,
          });
        
          if(numberOfEvolutions > 1) {
            for (let i = 1;i < numberOfEvolutions; i++) { 
              evoChain.push({
                "species_name": evoData.evolves_to[i].species.name,
             });
            }
          }        
        
          evoData = evoData['evolves_to'][0];
        
        } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

        console.log(evoChain);

        evolutionText.textContent = evoChain[0].species_name.toLowerCase().charAt(0).toUpperCase() + evoChain[0].species_name.slice(1);

        if(evoChain[1].species_name)
        {
            evolutionText.textContent += ", " + evoChain[1].species_name.toLowerCase().charAt(0).toUpperCase() + evoChain[1].species_name.slice(1);          
        }

        if(evoChain[2].species_name)
        {
            evolutionText.textContent += ", " + evoChain[2].species_name.toLowerCase().charAt(0).toUpperCase() + evoChain[2].species_name.slice(1);       
        }

        if(evoChain[3].species_name)
        {
            evolutionText.textContent += ", " + evoChain[3].species_name.toLowerCase().charAt(0).toUpperCase() + evoChain[3].species_name.slice(1);      
        }

        if(evoChain[4].species_name)
        {
            evolutionText.textContent += ", " + evoChain[4].species_name.toLowerCase().charAt(0).toUpperCase() + evoChain[4].species_name.slice(1);     
        }

        if(evoChain[5].species_name)
        {
            evolutionText.textContent += ", " + evoChain[5].species_name.toLowerCase().charAt(0).toUpperCase() + evoChain[5].species_name.slice(1);       
        }

        if(evoChain[6].species_name)
        {
            evolutionText.textContent += ", " + evoChain[6].species_name.toLowerCase().charAt(0).toUpperCase() + evoChain[6].species_name.slice(1);      
        }

        if(evoChain[7].species_name)
        {
            evolutionText.textContent += ", " + evoChain[7].species_name.toLowerCase().charAt(0).toUpperCase() + evoChain[7].species_name.slice(1);      
        }

        if(evoChain[8].species_name)
        {
            evolutionText.textContent += ", " + evoChain[8].species_name.toLowerCase().charAt(0).toUpperCase() + evoChain[8].species_name.slice(1);     
        }

        if(evoChain[9].species_name)
        {
            evolutionText.textContent += ", " + evoChain[9].species_name.toLowerCase().charAt(0).toUpperCase() + evoChain[0].species_name.slice(9);       
        }
          

    });
 }

 function addAndRemoveFav(textPassed){

    GetLocalStorage();
    console.log(textPassed);

    if (favorites.includes(textPassed))
    {
        RemoveFromLocalStorage(textPassed);
        pictureStar.src = "./assets/Star 1.png";
    }
    else
    {
        saveToLocalStorageByName(textPassed);
        pictureStar.src = "./assets/Star 2.png";
    }
}

function CreateElements(){
    let favorites = GetLocalStorage();

    favorites.map(person => {
        let img = document.createElement('img')
        img.className = "imageClass";

        // GetSprites(person.toLowerCase());
        img.src = "./assets/Pokeball.png";
        // console.log(img.src);

        let p = document.createElement('p');
        p.textContent = person;
        p.className = "pText";
    
        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'btnDelete';
        deleteBtn.textContent = 'Delete';
        deleteBtn.type = 'button';
        deleteBtn.addEventListener("click", function(){
            RemoveFromLocalStorage(person);
            favoritesBoxInner.removeChild(p);
            favoritesBoxInner.removeChild(deleteBtn);
            favoritesBoxInner.removeChild(img);
        })
    
        favoritesBoxInner.appendChild(img);
        favoritesBoxInner.appendChild(p);
        favoritesBoxInner.appendChild(deleteBtn);
    })


}

// function toggleFavorites(){

// }

async function GetSprites(name){
    console.log(name);
    await fetch("https://pokeapi.co/api/v2/pokemon/" + name)
    .then(data => data.json())
    .then(data => {
        asyncPokeApi2 = data;

        let src1 = asyncPokeApi2.sprites.front_default;

        srcGet = src1;

        console.log(srcGet);

        return srcGet;
    });
}