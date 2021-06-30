// modulo App
import Navbar from "./views/components/navbar/Navbar";
import Home from "./views/components/home/Home";
import Footer from "./views/components/footer/Footer";
import Details from "./views/components/details/Details";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App {
  constructor() {
    this.route = new Map([
      ['', new Home()],
      ['details', new Details()]
    ]);
    this.navbar = new Navbar();
    this.footer = new Footer();
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
      this.route.get("").render() +
      "</div>" +
      this.footer.render();
    this.route.get("").loadData();
    this.addEventListener();
    // window.dispatchEvent(new Event("popstate"));
  }

  addEventListener() {
    window.onpopstate = () => {
      const path = document.location.pathname.split("/")[1]
      console.log(path);
      if (this.route.has(path)) {
        document.getElementById("home-container").innerHTML = this.route.get(path).render();
        console.log("fine render");
        this.route.get(path).loadData();
        console.log("fine carica");
      }
    };
  }
}

const app = new App();
