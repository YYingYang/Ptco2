// modulo App
import Navbar from "./views/components/navbar/Navbar";
import Home from "./views/components/home/Home";
import Footer from "./views/components/footer/Footer";
import Details from "./views/components/details/Details";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App {
  constructor() {
    this.home = new Home();
    this.navbar = new Navbar();
    this.footer = new Footer();
    this.details = new Details();
    this.init();
  }

  /**
   * Inizializzazione
   */
  init() {
    this.initAppDOMElement();
    this.bootstrap();
  }

  /**
   * Handler dell'evento load della pagina principale
   * Esegue il bootstrap dell'applicazione
   */
  bootstrap() {
    window.addEventListener("load", this.render.bind(this));
  }

  /**
   * Ottiene il nodo DOM principale sul quale rendere l'applicazione
   */
  initAppDOMElement() {
    this.app = null || document.getElementById("app");
  }

  /**
   * Metodo di render dell'applicazione principale
   * dove è definito il layout generale dell'applicazione
   */
  render() {
    this.app.innerHTML =
      this.navbar.render() +
      '<div id="home-container">' +
      this.home.render() +
      "</div>" +
      this.footer.render();
    window.onpopstate = (event) => {
      if (document.location.pathname.split("/")[1] === "") {
        document.getElementById("home-container").innerHTML =
          this.home.render();
      }
      if (document.location.pathname.split("/")[1] === "details") {
        this.details.render();
      }
    };
  }
}

const app = new App();
