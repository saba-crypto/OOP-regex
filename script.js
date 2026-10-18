import { config } from "./userConfig.js";
class User {
  name;
  photoUrl;
  isLoggedIn;
  role;
  email;
  config;
  constructor(name, photoUrl, isLoggedIn, role, email, config) {
    this.name = name;
    this.photoUrl = photoUrl;
    this.isLoggedIn = isLoggedIn;
    this.role = role;
    this.email = email;
    this.config = config;
  }
  checkLogin() {
    if (this.isLoggedIn) {
      return true;
    } else {
      return false;
    }
    //ან უბრალოდ return isLoggedIn
  }
  getUserRole() {
    if (!this.role) {
      return;
    }
    if (
      this.role.toLowerCase() === "admin" ||
      this.role.toLowerCase() === "user"
    ) {
      return this.role;
    } else {
      return "unidentified-account";
    }
  }
}

const user1 = new User(
  "saba",
  "https://tinyurl.com/329rdrf5",
  true,
  "user",
  "email@gmail.com",
  config,
);

//logs
// console.log(user1);
// console.log(user1.checkLogin());
// console.log(user1.getUserRole());

renderUserContainer(user1);

class NavBar {
  bgColor;
  position;
  output;
  constructor(bgColor, position, output) {
    this.bgColor = bgColor;
    this.position = position;
    this.output = output;
  }

  getNavBar() {
    if (!this.output) {
      console.error(
        "output element was not provided for rendering navBar or it may be invalid",
      );
      return;
    }
    let outputElement;
    if (this.output === "body") {
      outputElement = document.body;
    } else {
      outputElement = document.querySelector(`.${this.output}`);
    }

    if (!outputElement) {
      console.error(
        "Couldn't render navBar, output element provided is not a valid element",
      );
      return;
    }

    let selectedPosition = "position-left"; //default
    if (
      this.position.toLowerCase() === "top" ||
      this.position.toLowerCase() === "center"
    ) {
      selectedPosition = "position-top";
    } else if (this.position.toLowerCase() === "right") {
      selectedPosition = "position-right";
    }

    outputElement.innerHTML += `
      <aside class="nav-bar ${selectedPosition} hidden" style="background-color: #${this.bgColor || "000000"};">
          <h1>Navigation</h1>
          <nav>
            <ul class="nav-list">
              <li class="nav-list-item">
                <a class="nav-list-item-link" href="#">Home</a>
              </li>
              <li class="nav-list-item">
                <a class="nav-list-item-link" href="#">Checkout</a>
              </li>
              <li class="nav-list-item">
                <a class="nav-list-item-link" href="#">Orders</a>
              </li>
              <li class="nav-list-item">
                <a class="nav-list-item-link" href="#">About us</a>
              </li>
            </ul>
          </nav>
        </aside>
      `;
    const navBarButton = document.querySelector(".toggle-nav-btn");
    if (navBarButton) {
      navBarButton.addEventListener("click", () => {
        document.querySelector(".nav-bar").classList.toggle("hidden");
      });
    }
  }
}

//ფერის მხარდაჭერა არის მხოლოს hexadecimal ფორმატში.
const navBar = new NavBar("000000", "right", "body");
navBar.getNavBar();

function renderUserContainer(user) {
  const userContainer = document.querySelector(".user-container");
  const userRole = user.getUserRole();
  userContainer.classList.add(userRole);
  user.isLoggedIn
    ? userContainer.classList.add("logged-in")
    : userContainer.classList.remove("logged-in");
  userContainer.innerHTML = `
    <img
      class="profile-picture"
      src="${user.photoUrl}"
      alt="user profile picture"
    />
    <div class="user-info">
      <h1 class="user-name">${user.name}</h1>
      <p class="email">${user.email}</p>
      <p class="role">${userRole}</p>
    </div>
  `;
}
