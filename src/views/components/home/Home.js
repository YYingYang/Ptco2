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
      .getElementById("searchBtn")
      .addEventListener("click", this.search.bind(this));
    document
      .getElementById("showPreferedBtn")
      .addEventListener("click", this.showPreferedList.bind(this));
    let temp = document.getElementById("list").children.length;
    for (let i = 0; i < temp; i++) {
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
    for (let i = 0; i < list.length; i++)
      str += `<div class="col-sm"><div class="card" >
      <img src=https://www.themoviedb.org/t/p/w600_and_h900_bestv2${list[i].img
        } class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${list[i].title}
          <button id="preferedIcon${i}"  class="trasparent" style="float:right;">
          </button>
        </h5>
        <p class="card-text">${list[i].reduceChracter()}</p>
        <div class="btn-holder">
        <button id="detailsBtn${i}" class="btn btn-primary" value="${list[i].id
        }">Details</button>
        </div>
      </div>
      </div></div>`;
    document.getElementById("list").innerHTML = str;
    this.setPreferedClass(list);
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
    // document.getElementById("search").value = "";
  }

  showDetails(event) {
    let path = event.target.value;
    history.pushState("details", "title 1", `/details/${path}`);
    window.dispatchEvent(new Event("popstate"));
  }

  // set class of prefered icon
  setPreferedClass(list) {
    const local = window.localStorage.getItem("preferedMovie");
    for (let i = 0; i < list.length; i++) {
      if (local)
        if (local.includes(list[i].id)) {
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
    }
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
    const idList = window.localStorage.getItem("preferedMovie").split(",");
    let temp = []
    for (let i = 0; i < idList.length - 1; i++) {
      for (let j = 0; j < this.list.length; j++)
        if (idList[i] == this.list[j].id)
          temp.push(this.list[j])
    }
    this.displayCard(temp)
  }

  // add id of movie in locale storage
  addPreferedMovie(id) {
    const key = "preferedMovie";
    let str = window.localStorage.getItem(key);
    id = id + ",";
    if (!str) str = id;
    else if (!str.includes(id)) str = str + id;
    window.localStorage.setItem(key, str);
  }

  // remove id of movie in locale storage
  removerPreferedMovie(id) {
    const key = "preferedMovie";
    let str = window.localStorage.getItem(key);
    id = id + ",";
    if (str.includes(id)) {
      str = str.replace(id, "");
      window.localStorage.setItem(key, str);
    }
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
