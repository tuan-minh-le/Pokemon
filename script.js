document.getElementById('button').onclick = async function afficher() {
    document.getElementById("button").style.display = 'none'
    var template = document.getElementById("card-template");
    for (let i = 1; i <= 100; i+=1) {;
        let clone = document.importNode(template.content, true);

        let img = clone.querySelector("img")
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i}.svg`;
    

        try {
            const species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}/`);
            const data = await species.json();
            console.log(data)

            const types = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
            const data2 = await types.json();
            console.log(data2)

            const name = data.names.length > 4 ? data.names[4].name : "Unknown";

            const type = data2.types.map(type => type.type.name);
            let typeimg = clone.querySelector(".types");
            
            type.forEach(type => {
                const TypeImg = document.createElement('img')
                TypeImg.src = `/images/type_${type}.png`
                TypeImg.alt = type
                typeimg.appendChild(TypeImg)
            });
            
            const newContent = clone.firstElementChild.innerHTML
                                .replace('{{nom}}', name)
                                .replace('{{numero}}', i)
            clone.firstElementChild.innerHTML = newContent
        }
        catch(error){
            console.log(error);
        }
        document.getElementById("div").appendChild(clone);
    }
}
