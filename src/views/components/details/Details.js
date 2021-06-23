class Details {
  constructor() {
    this.key = "c4d79d0d1e50bf8bc86b7afbd240e4df";
  }
  render() {
    this.id = document.location.pathname.split("/")[2];

    fetch(
      `https://api.themoviedb.org/3/movie/${this.id}?api_key=${this.key}&language=en`
    )
      .then((results) => results.json())
      .then((data) => {
        // console.log(data);
        this.title = data.original_title;
        this.description = data.overview;
        this.img = data.poster_path;
        // console.log(this);
      });
    fetch(
      `https://api.themoviedb.org/3/movie/${this.id}/videos?api_key=${this.key}&language=en`
    )
      .then((results) => results.json())
      .then((data) => {
        // console.log(data);
        this.videoId = data.results[0].key;
        document.getElementById(
          "home-container"
        ).innerHTML = `<div class="center-text">
          <div class="card mb-3" style="max-width:50%">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img src=https://www.themoviedb.org/t/p/w600_and_h900_bestv2${this.img} class="img-fluid" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${this.title}</h5>
                  <p class="card-text">${this.description}</p>
                  <div class="btn-holder">
                    <button id="backBtn" class="btn btn-primary" value="">Back</button>
                    <button id="trailerBtn" class="btn btn-primary" value="">Trailer</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
      });
    //   console.log(this)
  }
}
export default Details;
