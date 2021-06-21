class Footer {
  static render() {
    return `<footer>
    <div
      class="bg-image hover-overlay ripple shadow-1-strong rounded"
      data-ripple-color="light"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/9/98/Engineering_logo.png"
        class="w-100"
      />
    </div>
    <div
      class="text-center p-4"
      style="background-color: rgba(0, 0, 0, 0.05)"
    >
      © 2021 Copyright:
      <a class="text-reset fw-bold">Engineering.com</a>
    </div>
  </footer>`;
  }
}

export default Footer;
