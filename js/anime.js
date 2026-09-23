const animeContainer =
    document.getElementById("animeContainer");

const searchInput =
    document.getElementById("searchInput");


function displayAnime(list) {

    animeContainer.innerHTML = "";

    if (list.length === 0) {

        animeContainer.innerHTML = `
            <div class="no-result">
                Anime tidak ditemukan.
            </div>
        `;

        return;
    }


    list.forEach(anime => {

        const card =
            document.createElement("div");

        card.className = "anime-card";


        card.innerHTML = `

            <a href="anime.html?id=${anime.id}">

                <div class="anime-image">

                    <img
                        src="${anime.cover}"
                        alt="${anime.title}"
                    >

                </div>


                <div class="anime-info">

                    <h3>
                        ${anime.title}
                    </h3>

                    <p>
                        ${anime.episodes.length}
                        Episode
                    </p>

                </div>

            </a>

        `;


        animeContainer.appendChild(card);

    });

}


displayAnime(animeData);


searchInput.addEventListener(
    "input",
    function () {

        const keyword =
            searchInput.value
                .toLowerCase()
                .trim();


        const filtered =
            animeData.filter(anime =>
                anime.title
                    .toLowerCase()
                    .includes(keyword)
            );


        displayAnime(filtered);

    }
);
