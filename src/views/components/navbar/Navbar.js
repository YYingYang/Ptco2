class Navbar {
  static render() {
    return `<header>
    <div class="container-fluid">
      <img src="./src/assets/logo.png" alt="" class="logo" />
      <p>
        Cinema
        <button type="button" class="btn btn-secondary">Accedi</button>
        <button type="button" class="btn btn-secondary">Registrati</button>
      </p>
    </div>
  </header>`;
  }
}

export default Navbar;
