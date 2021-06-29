class Home {
  constructor() {
    this.key = "c4d79d0d1e50bf8bc86b7afbd240e4df";
  }

  render() {
    this.loadMovie();
    return `<br />
    <h1 class="center" id="title">
      Selection of Movie
    </h1>
    <!-- search bar and button -->
    <div class="d-flex" id="search-form">
      ${this.showSearch()}
      <button id ="showPreferedBtn" class="btn btn-outline-success">Prefered</button>
    </div>  
    <br />
    <!-- list of movie / result of reseach -->
    <div id="list" class="row"></div>`;
  }

  showSearch() {
    return `<input id="search" class="form-control me-2" placeholder="Search" aria-label="Search"/>
    <button id ="searchBtn" class="btn btn-outline-success">Search</button>`;
  }

  loadMovie() {
    //request to the site for the movies data/list
    const req = fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${this.key}&language=en&page=1`
    )
      .then((results) => results.json())
      .then((data) => {
        this.list = [];
        data.results.forEach(element => {
          this.list.push(
            new Movie(
              element.original_title,
              element.overview,
              element.poster_path,
              element.id,
            )
          )
        });
        this.displayCard(this.list);
      });
  }

  //  actionListener for button of details and search bar
  addActionListener() {
    document
      .getElementById("searchBtn")
      .addEventListener("click", this.search.bind(this));
    document
      .getElementById("showPreferedBtn")
      .addEventListener("click", this.showPreferedList.bind(this));
    for (let i = 0; i < document.getElementById("list").children.length; i++) {
      document
        .getElementById(`detailsBtn${i}`)
        .addEventListener("click", this.showDetails.bind(this));
      document
        .getElementById(`preferedIcon${i}`)
        .addEventListener("click", this.showPrefered.bind(this));
    }
  }

  // insert card with movie data
  displayCard(list) {
    let str = "";
    list.forEach((element, index) => {
      str += `<div class="col-sm"><div class="card" >
      <img src=https://www.themoviedb.org/t/p/w600_and_h900_bestv2${element.img
        } class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${element.title}
          <button id="preferedIcon${index}"  class="trasparent" style="float:right;">
          </button>
        </h5>
        <p class="card-text">${element.reduceChracter()}</p>
        <div class="btn-holder">
        <button id="detailsBtn${index}" class="btn btn-primary" value="${element.id
        }">Details</button>
        </div>
      </div>
      </div></div>`;
    });
    document.getElementById("list").innerHTML = str;
    this.setPreferedClass(list);
    this.addActionListener();
  }

  // craete a list of movie => result of search by title
  search(event) {
    event.preventDefault();
    const str = document.getElementById("search").value;
    const temp = [];
    this.list.forEach(element => {
      if (element.title.toLowerCase().includes(str.toLowerCase()))
        temp.push(element);
    })
    if (temp.length == 0)
      document.getElementById("list").innerHTML = "Nothing found";
    else {
      document.getElementById("list").innerHTML = "";
      this.displayCard(temp);
    }
    // document.getElementById("search").value = "";
  }

  showDetails(event) {
    const path = event.target.value;
    history.pushState("details", "title 1", `/details/${path}`);
    window.dispatchEvent(new Event("popstate"));
  }

  // set class of prefered icon
  setPreferedClass(list) {
    const local = window.localStorage.getItem("preferedMovie");
    list.forEach((element, i) => {
      if (local)
        if (local.includes(element.id)) {
          document.getElementById(`preferedIcon${i}`).classList.add("selected");
        } else {
          document
            .getElementById(`preferedIcon${i}`)
            .classList.add("notSelected");
        }
      else
        document
          .getElementById(`preferedIcon${i}`)
          .classList.add("notSelected");
    })

  }

  // change prefered icon
  showPrefered(event) {
    /**
     * @type {HTMLElement}
     */
    const btn = event.target;
    const id = document.getElementById(
      `detailsBtn${btn.id.split("preferedIcon")[1]}`
    ).value;
    if (btn.classList.contains("notSelected")) {
      btn.classList.remove("notSelected");
      btn.classList.add("selected");
      this.addPreferedMovie(id);
    } else {
      btn.classList.remove("selected");
      btn.classList.add("notSelected");
      this.removerPreferedMovie(id);
    }
  }

  // show prefered movie list
  showPreferedList(event) {
    const idList = JSON.parse(window.localStorage.getItem("preferedMovie"));
    const temp = [];
    idList.forEach(id => {
      this.list.forEach(element => {
        if (id == element.id)
          temp.push(element)
      })
    })
    this.displayCard(temp)
  }

  // add id of movie in locale storage
  addPreferedMovie(id) {
    const key = "preferedMovie";
    let str = JSON.parse(window.localStorage.getItem(key));
    if (!str) str = [id];
    else if (!str.includes(id)) str.push(id);
    window.localStorage.setItem(key, JSON.stringify(str));
  }

  // remove id of movie in locale storage
  removerPreferedMovie(id) {
    const key = "preferedMovie";
    const str = JSON.parse(window.localStorage.getItem(key));
    if (str.indexOf(id) != -1) {
      str.splice(str.indexOf(id), 1);
      window.localStorage.setItem(key, JSON.stringify(str));
    }
  }
}

class Movie {
  constructor(title, description, img, id) {
    this.title = title;
    this.description = description;
    this.img = img;
    this.id = id;
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
