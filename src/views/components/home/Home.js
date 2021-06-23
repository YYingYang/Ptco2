class Home {
  constructor() {
    this.key = "c4d79d0d1e50bf8bc86b7afbd240e4df";
  }

  render() {
    this.loadMovie();
    return `<br />
    <h1 class="center" id="title">
      Selezione dei film
    </h1>
    <!-- search bar and button -->
    <form class="d-flex" id="search-form">
      ${this.showSearch()}
    </form>
    <br />
    <!-- list of film / result of reseach -->
    <div id="list" class="row"></div>`;
  }

  showSearch() {
    return `<input id="search" class="form-control me-2" placeholder="Search" aria-label="Search"/>
    <button class="btn btn-outline-success">Search</button>`;
  }

  loadMovie() {
    //request to the site for the movies data/list
    const req = fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${this.key}&language=en&page=1`
    )
      .then((results) => results.json())
      .then((data) => {
        this.list = [];
        for (var i = 0; i < data.results.length; i++) {
          this.list.push(
            new Movie(
              data.results[i].original_title,
              data.results[i].overview,
              data.results[i].poster_path,
              data.results[i].id,
              i
            )
          );
        }
        this.displayCard(this.list);
      });
  }

  //  actionListener for button of details and search bar
  addActionListener() {
    document
      .getElementById("search-form")
      .addEventListener("submit", this.search.bind(this));
    let temp = document.getElementById("list").children.length;
    for (let i = 0; i < temp; i++)
      document
        .getElementById(`detailsBtn${i}`)
        .addEventListener("click", this.showDetails.bind(this));
  }

  // insert card with movie data
  displayCard(list) {
    let str = "";
    for (let i = 0; i < list.length; i++)
      str += `<div class="col-sm"><div class="card" >
      <img src=https://www.themoviedb.org/t/p/w600_and_h900_bestv2${
        list[i].img
      } class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${list[i].title}</h5>
        <p class="card-text">${list[i].reduceChracter()}</p>
        <div class="btn-holder">
        <button id="detailsBtn${i}" class="btn btn-primary" value="${
        list[i].id
      }">Details</button>
        </div>
      </div>
      </div></div>`;
    document.getElementById("list").innerHTML = str;
    this.addActionListener();
  }

  // craete a list of movie => result of search by title
  search(event) {
    event.preventDefault();
    let str = document.getElementById("search").value;
    let temp = [];
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].title.toLowerCase().includes(str.toLowerCase()))
        temp.push(this.list[i]);
    }
    if (temp.length == 0)
      document.getElementById("list").innerHTML = "Nothing found";
    else {
      document.getElementById("list").innerHTML = "";
      this.displayCard(temp);
    }
    document.getElementById("search").value = "";
  }

  showDetails(event) {
    let path = event.target.value;
    history.pushState("details", "title 1", `/details/${path}`);
    window.dispatchEvent(new Event("popstate"));
  }
}

class Movie {
  constructor(title, description, img, id, pos) {
    this.title = title;
    this.description = description;
    this.img = img;
    this.id = id;
    this.pos = pos;
  }
  movieToString() {
    let str =
      this.title + ", " + this.description + ", " + this.date + ", " + this.img;
    return str;
  }

  reduceChracter() {
    const max = 200;
    return this.description.slice(0, max) + "...";
  }
}
export default Home;
