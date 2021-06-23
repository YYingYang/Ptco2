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
        document.getElementById("home-container").innerHTML = `<div><h1>${this.title}</h1></div><div class="container-fluid">
        <img src=https://www.themoviedb.org/t/p/w600_and_h900_bestv2${this.img} class="float-left" alt="...">
        <span>
          <h3>${this.description}</h3>
        </span>
        <div/>`
      });
      console.log(this)
     
  }
}
export default Details;
