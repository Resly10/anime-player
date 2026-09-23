const params =
    new URLSearchParams(
        window.location.search
    );


const animeId =
    params.get("id");


let episodeNumber =
    parseInt(
        params.get("episode")
    );


const anime =
    animeData.find(
        item => item.id === animeId
    );


const player =
    document.getElementById(
        "videoPlayer"
    );


const animeTitle =
    document.getElementById(
        "animeTitle"
    );


const episodeTitle =
    document.getElementById(
        "episodeTitle"
    );


const previousButton =
    document.getElementById(
        "previousButton"
    );


const nextButton =
    document.getElementById(
        "nextButton"
    );


const autoNext =
    document.getElementById(
        "autoNext"
    );


const episodeList =
    document.getElementById(
        "watchEpisodeList"
    );


/*
========================================
VALIDASI
========================================
*/


if (!anime) {

    document.body.innerHTML = `
        <main class="container">

            <h1>
                Anime tidak ditemukan.
            </h1>

            <a href="index.html">
                Kembali
            </a>

        </main>
    `;

    throw new Error(
        "Anime tidak ditemukan"
    );

}


/*
========================================
VALIDASI EPISODE
========================================
*/


if (
    isNaN(episodeNumber) ||
    episodeNumber < 1 ||
    episodeNumber > anime.episodes.length
) {

    episodeNumber = 1;

}


/*
========================================
LOAD EPISODE
========================================
*/


function loadEpisode(
    number,
    autoplay = false
) {

    const index =
        number - 1;


    const episode =
        anime.episodes[index];


    if (!episode) {

        return;

    }


    episodeNumber =
        number;


    animeTitle.textContent =
        anime.title;


    episodeTitle.textContent =
        episode.title;


    player.src =
        episode.video;


    player.load();


    /*
    Simpan episode terakhir
    */

    localStorage.setItem(
        `lastEpisode_${anime.id}`,
        episodeNumber
    );


    /*
    Simpan anime terakhir
    */

    localStorage.setItem(
        "lastAnime",
        anime.id
    );


    updateButtons();

    renderEpisodes();


    /*
    Autoplay episode berikutnya
    */

    if (autoplay) {

        const playPromise =
            player.play();


        if (
            playPromise !== undefined
        ) {

            playPromise.catch(
                error => {

                    console.log(
                        "Autoplay diblokir browser:",
                        error
                    );

                }
            );

        }

    }

}


/*
========================================
NEXT
========================================
*/


function nextEpisode() {

    if (
        episodeNumber <
        anime.episodes.length
    ) {

        loadEpisode(
            episodeNumber + 1,
            true
        );

    } else {

        showAnimeFinished();

    }

}


/*
========================================
PREVIOUS
========================================
*/


function previousEpisode() {

    if (
        episodeNumber > 1
    ) {

        loadEpisode(
            episodeNumber - 1,
            true
        );

    }

}


/*
========================================
UPDATE BUTTON
========================================
*/


function updateButtons() {

    previousButton.disabled =
        episodeNumber <= 1;


    nextButton.disabled =
        episodeNumber >=
        anime.episodes.length;

}


/*
========================================
EPISODE LIST
========================================
*/


function renderEpisodes() {

    episodeList.innerHTML = "";


    anime.episodes.forEach(
        episode => {

            const button =
                document.createElement(
                    "button"
                );


            button.textContent =
                `Episode ${episode.number}`;


            button.className =
                "episode-button";


            if (
                episode.number ===
                episodeNumber
            ) {

                button.classList.add(
                    "active"
                );

            }


            button.addEventListener(
                "click",
                () => {

                    loadEpisode(
                        episode.number,
                        true
                    );

                }
            );


            episodeList.appendChild(
                button
            );

        }
    );

}


/*
========================================
VIDEO SELESAI
========================================
*/


player.addEventListener(
    "ended",
    function () {

        console.log(
            "Episode selesai."
        );


        /*
        Cek Auto Next
        */

        if (
            autoNext.checked
        ) {

            /*
            Masih ada episode?
            */

            if (
                episodeNumber <
                anime.episodes.length
            ) {

                nextEpisode();

            } else {

                showAnimeFinished();

            }

        }

    }
);


/*
========================================
TOMBOL NEXT
========================================
*/


nextButton.addEventListener(
    "click",
    function () {

        nextEpisode();

    }
);


/*
========================================
TOMBOL PREVIOUS
========================================
*/


previousButton.addEventListener(
    "click",
    function () {

        previousEpisode();

    }
);


/*
========================================
SELESAI
========================================
*/


function showAnimeFinished() {

    episodeTitle.textContent =
        "Semua episode telah selesai 🎉";


    localStorage.removeItem(
        `lastEpisode_${anime.id}`
    );

}


/*
========================================
LANJUT DARI EPISODE TERAKHIR
========================================
*/


const savedEpisode =
    localStorage.getItem(
        `lastEpisode_${anime.id}`
    );


if (
    !isNaN(
        parseInt(savedEpisode)
    )
) {

    const saved =
        parseInt(savedEpisode);


    /*
    Hanya gunakan saved episode
    jika URL tidak menentukan
    episode secara eksplisit.
    */

    if (
        !params.has("episode")
    ) {

        episodeNumber =
            saved;

    }

}


/*
========================================
MULAI PLAYER
========================================
*/


loadEpisode(
    episodeNumber,
    false
);
