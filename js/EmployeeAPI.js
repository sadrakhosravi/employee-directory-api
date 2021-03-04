class EmployeeAPI {
  constructor(url) {
    this.url = url;
    this.employees = null;
  }

  /**
   * Gets the API data from the given url.
   * @return {Promise} - Promise data returned by the API.
   */
  async getData() {
    try {
      const employees = await fetch(this.url);
      return await employees.json();
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @return {Array} - Returns the arrays of objects from the getData promise.
   */
  generateEmployees(data) {
    return data.results;
  }

  /**
   * Outputs the selected data from the API to the screen.
   * @param {Array} data - An array of objects containing user's data.
   * @return {Array} - An array of employee objects.
   */
  generateHTML(data) {
    this.employees = data.results;
    this.employees.forEach(employee => {
      let employeeHTML = `
      <div class="card">
          <div class="card-img-container">
              <img class="card-img" src="${employee.picture.large}" alt="${employee.name.first} ${employee.name.last}'s profile picture">
          </div>
          <div class="card-info-container">
              <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
              <p class="card-text">${employee.email}</p>
              <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
          </div>
      </div>
    `;
      employeeGallery.insertAdjacentHTML('beforeend', employeeHTML);
    });

    this.cardClickEvent();
  }

  /**
   * Adds a click event to each employee card for their modal popup.
   */
  cardClickEvent() {
    const employeeCards = document.querySelectorAll('.card');
    employeeCards.forEach(card => {
      card.addEventListener('click', e => {
        this.modalOutput(card);
        console.log('Clicked!', card);
      });
    });
  }

  /**
   * Outputs the modal HTML containing detailed information of the employee.
   * @param {Element} employee - HTML Card element that contains employee's info .
   */
  modalOutput(employee) {
    let fullName = employee.childNodes[3].firstElementChild.textContent;
    fullName = fullName.split(' ');
    const [firstName, lastName] = fullName;
    let modalHTML = '';

    console.log(this.employees);

    //FIX EMPLOYEE PHONE FORMATTING!!!!!
    //Address: Street name and number, state or countrym and postal code
    this.employees.forEach(employee => {
      if (employee.name.first === firstName && employee.name.last === lastName) {
        modalHTML = `
          <div class="modal-container">
            <div class="modal">
              <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
              <div class="modal-info-container">
                  <img class="modal-img" src="${employee.picture.large}" alt="${employee.name.first} ${employee.name.last}'s profile picture">
                  <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                  <p class="modal-text">${employee.email}</p>
                  <p class="modal-text cap">${employee.location.city}</p>
                  <hr>
                  <p class="modal-text">${employee.phone}</p>
                  <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.state}, ${employee.location.postcode} </p>
                  <p class="modal-text">Birthday: 10/21/2015</p>
            </div>
          </div>`;
      }
    });
    employeeGallery.insertAdjacentHTML('afterend', modalHTML);
    this.addModalInteractions();
  }

  /**
   * Adds interactios to the modal that supports closing and navigating.
   */
  addModalInteractions() {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.addEventListener('click', e => {
      console.log(e.target.id);
      if (e.target.classList.contains('modal-container')) {
        e.target.remove();
      }
    });

    modalContainer.childNodes[1].childNodes[1].addEventListener('click', e => {
      modalContainer.remove();
    });
  }

  /**
   * Processes getData fetch promise.
   */
  outputEmployees() {
    this.getData().then(data => this.generateHTML(data));
  }
}
