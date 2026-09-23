const params =
    new URLSearchParams(
        window.location.search
    );


const animeId =
    params.get("id");


const anime =
    animeData.find(
        item => item.id === animeId
    );


const detail =
    document.getElementById(
        "animeDetail"
    );


const episodeList =
    document.getElementById(
        "episodeList"
    );


if (!anime) {

    detail.innerHTML = `
        <h1>Anime tidak ditemukan.</h1>
    `;

} else {

    document.title =
        anime.title + " - Anime Player";


    detail.innerHTML = `

        <div class="detail">

            <img
                src="${anime.cover}"
                alt="${anime.title}"
            >


            <div>

                <h1>
                    ${anime.title}
                </h1>

                <p>
                    ${anime.description}
                </p>

                <p>
                    ${anime.episodes.length}
                    Episode
                </p>

            </div>

        </div>

    `;


    anime.episodes.forEach(
        episode => {

            const button =
                document.createElement("a");


            button.href =
                `watch.html?id=${anime.id}&episode=${episode.number}`;


            button.className =
                "episode-button";


            button.textContent =
                `Episode ${episode.number}`;


            episodeList.appendChild(button);

        }
    );

}
