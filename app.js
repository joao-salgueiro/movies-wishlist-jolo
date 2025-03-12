
    
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
    import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

    const firebaseConfig = {
        apiKey: "AIzaSyAFeN6sV287qTpUmLf3Z38mUQHZOCEtYPw",
        authDomain: "jolo-watch-list.firebaseapp.com",
        projectId: "jolo-watch-list",
        storageBucket: "jolo-watch-list.firebasestorage.app",
        messagingSenderId: "21207799209",
        appId: "1:21207799209:web:db8e9fa238d5b13a80a0b8",
        measurementId: "G-QPXZWSQXKS"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const moviesRef = collection(db, "movies");

    //buttons and inputs
    var movieInput = document.getElementById("movie-input");
    var addMovieButton = document.getElementById("add-movie");
    var movieList = document.getElementById("movie-list");


    async function addMovie(movieName) {
        try {
            const q = query(moviesRef, where("name", "==", movieName))
            const querySnapshot = await getDocs(q);

            if(!querySnapshot.empty) {
                alert("This movies already exists in the list");
                return;
            }

            await addDoc(moviesRef, { name: movieName, watched: false });
            loadMovies();
        }
        catch (error){
            console.error('ERRO FOR ADDING A MOVIE', error)
        }
        
    }

    async function loadMovies() {
        const querySnapshot = await getDocs(moviesRef);
        movieList.innerHTML = "";
        querySnapshot.forEach((dc) => {
            const movie = dc.data();
            const movieId = dc.id;
            const listItem = document.createElement("li");
            listItem.textContent = movie.name;

            const watchButton = document.createElement("button");
            watchButton.textContent = movie.watched ? "Watched" : "Mark as Watched";
            watchButton.addEventListener("click", async () => {
                try {
                    const movieDoc = doc(db, "movies", movieId);
                    await updateDoc(movieDoc, { watched: !movie.watched });
                    
                    loadMovies();
                } catch (error) {
                    console.error("Error", error);
                }
            });

            listItem.appendChild(watchButton);
            movieList.appendChild(listItem);
        });
    }


    addMovieButton.addEventListener("click", function()  {
        const movieName = movieInput.value;
        if (movieName === "") {
            alert('Movie name invalid')
            return //stop the code execution in this case
        }
            console.log('Here!!!!@@@ --> ', movieName)

            addMovie(movieName);
            movieInput.value = "";
            var listItem = document.createElement("li");
            listItem.textContent = movieName;
    });

    loadMovies();