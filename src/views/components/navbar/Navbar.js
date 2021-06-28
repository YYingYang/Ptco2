class Navbar {
  render() {
    return `<header>
    <div class="container-fluid">
      <img src="./src/assets/logo.png" alt="" class="logo" />
      <p>
        Cinema
        <button type="button" class="btn btn-secondary">Access</button>
        <button type="button" class="btn btn-secondary">Registrer</button>
      </p>
    </div>
  </header>`;
  }
}

export default Navbar;
