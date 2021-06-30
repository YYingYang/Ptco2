class Details {
  constructor() {
    this.key = "c4d79d0d1e50bf8bc86b7afbd240e4df";
  }

  render() {
    this.id = document.location.pathname.split("/")[2];
    return `<div class="center">
      <div id="details-container" class="card mb-3" style="width:50%">
      </div>
    </div>`;
  }

  loadData() {
    // get from site information about the movie you want know
    fetch(
      `https://api.themoviedb.org/3/movie/${this.id}?api_key=${this.key}&language=en`
    )
      .then((results) => results.json())
      .then((data) => {
        this.title = data.original_title;
        this.description = data.overview;
        this.img = data.poster_path;
        document.getElementById(
          "details-container"
        ).innerHTML = `
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src=https://www.themoviedb.org/t/p/w600_and_h900_bestv2${this.img} class="img-fluid" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${this.title}</h5>
              <p class="card-text" id="descriptionContainer">${this.description}</p>
              <div>
                <button id="homeBtn" class="btn btn-primary" >Back to Home</button>
                <button id="trailerBtn" class="btn btn-primary detailsBtn">Trailer</button>
                <button id="descriptionBtn" class="btn btn-primary detailsBtn" disabled>Description</button>
              </div>
            </div>
          </div>
        </div>`;
        // get video of the movie(trailer) and add actionListener
        fetch(
          `https://api.themoviedb.org/3/movie/${this.id}/videos?api_key=${this.key}&language=en`
        )
          .then((results) => results.json())
          .then((data) => {
            this.videoId = data.results[0].key;
            this.addActionListener();
          });
      });
  }

  //  actionListener for button back and trailer
  addActionListener() {
    document.getElementById("homeBtn").addEventListener("click", () => {
      window.history.back();
    });
    document.getElementById("trailerBtn").addEventListener("click", () => {
      this.renderTrailer();
    });
    document.getElementById("descriptionBtn").addEventListener("click", () => {
      this.renderDescription();
    });
  }

  renderTrailer() {
    document.getElementById(
      "descriptionContainer"
    ).innerHTML = `<div class="embed-responsive embed-responsive-16by9">
        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${this.videoId}" allowfullscreen></iframe>
        </div>`;
    document.getElementById("trailerBtn").disabled = true;
    document.getElementById("descriptionBtn").disabled = false;
  }

  renderDescription() {
    console.log("2");
    document.getElementById("descriptionContainer").innerHTML =
      this.description;
    document.getElementById("descriptionBtn").disabled = true;
    document.getElementById("trailerBtn").disabled = false;
  }
}
export default Details;
