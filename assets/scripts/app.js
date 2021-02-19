const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
const addMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const listRoot = document.getElementById("movie-list");
const deleteMovieModal = document.getElementById("delete-modal");
const movies = [];

const updateUI = () => {
	if (movies.length === 0) {
		entryTextSection.style.display = "block";
	} else {
		entryTextSection.style.display = "none";
	}
};

const deleteMovie = (movieId) => {
	let movieIndex = 0;
	for (const movie of movies) {
		if (movie.id === movieId) {
			break;
		}
		movieIndex++;
	}

	movies.splice(movieIndex, 1);
	listRoot.children[movieIndex].remove();
	closeMovieDeletionModal();
    updateUI();
};

const closeMovieDeletionModal = () => {
	toggleBackdrop();
	deleteMovieModal.classList.remove("visible");
};

const deleteMovieHandler = (movieId) => {
	deleteMovieModal.classList.add("visible");
	toggleBackdrop();
	const btnCancel = deleteMovieModal.querySelector(".btn--passive");
	let btnYes = deleteMovieModal.querySelector(".btn--danger");

	btnYes.replaceWith(btnYes.cloneNode(true));
	btnYes = deleteMovieModal.querySelector(".btn--danger");

    btnCancel.removeEventListener('click', closeMovieDeletionModal);
	btnCancel.addEventListener("click", closeMovieDeletionModal);
	btnYes.addEventListener("click", deleteMovie.bind(null, movieId));
};

const renderNewMovieElement = (movieObj) => {
	const newMovieElement = document.createElement("li");
	newMovieElement.className = "movie-element";
	newMovieElement.innerHTML = `
        <div class = "movie-element__image">
            <img src = "${movieObj.image}" alt = "${movieObj.title}">
        </div>

        <div class = "movie-element__info">
            <h2>${movieObj.title}</h2>
            <p>${movieObj.rating}/5 stars</p>
        </div>
    `;

	newMovieElement.addEventListener(
		"click",
		deleteMovieHandler.bind(null, movieObj.id)
	);
	listRoot.append(newMovieElement);
};

const toggleBackdrop = () => {
	backdrop.classList.toggle("visible");
};

const toggleMovieModal = () => {
	clearMovieDialogInputs();
	addMovieModal.classList.toggle("visible");
	toggleBackdrop();
};

const clearMovieDialogInputs = () => {
	for (const userInput of userInputs) {
		userInput.value = "";
	}
};

const closeAddMovieDialog = () => {
	toggleMovieModal();
	clearMovieDialogInputs();
};

const addMovieHandler = () => {
	const titleValue = userInputs[0].value;
	const imageUrl = userInputs[1].value;
	const rating = userInputs[2].value;

	if (
		titleValue.trim() === "" ||
		imageUrl.trim() === "" ||
		rating.trim() === "" ||
		+rating < 1 ||
		+rating > 5
	) {
		alert("Please enter valid inputs.");
		return;
	}

	const newMovie = {
		id: Math.random().toString(),
		title: titleValue,
		image: imageUrl,
		rating: rating,
	};

	movies.push(newMovie);
	clearMovieDialogInputs();
	toggleMovieModal();
	// renderNewMovieElement(newMovie.title, newMovie.image, newMovie.rating);
	renderNewMovieElement(newMovie);
	updateUI();
};

startAddMovieButton.addEventListener("click", toggleMovieModal);
cancelAddMovieButton.addEventListener("click", toggleMovieModal);
// cancelAddMovieButton.addEventListener('click', closeAddMovieDialog)
addMovieButton.addEventListener("click", addMovieHandler);
