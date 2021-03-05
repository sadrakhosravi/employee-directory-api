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
   * Sets the employees to the 12 randomly gnerated employee data received from the API.
   * @param {Promise} data - Promise employee data returned from the fetch .thn.
   */
  generateEmployees(data) {
    this.employees = data.results;
  }

  /**
   * Outputs the employee card data from the API to the screen.
   */
  outputEmployees(employees) {
    employeeGallery.innerHTML = '';
    this.generateEmployeeCard(employees);
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
    let modalContent = '';

    this.employees.forEach(employee => {
      if (employee.name.first === firstName && employee.name.last === lastName) {
        modalContent = this.modalHTML(employee);
      }
    });

    employeeGallery.insertAdjacentHTML('afterend', modalContent);
    this.addModalInteractions();
  }

  /**
   * Generates and outputs the employee card HTML.
   * @param {Object} employee - Employee data object.
   */
  generateEmployeeCard(employees) {
    employees.forEach(employee => {
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
  }

  /**
   * Formats employee's phone and DOB and return modal content HTML.
   * @param {Object} employee - Employee data object.
   * @return {String} - Modal content HTML.
   */
  modalHTML(employee) {
    //Replaces special charactes in phone number with a empty string.
    let employeePhone = employee.phone.replace(/[-.,() ]/g, '');
    employeePhone = `(${employeePhone.slice(0, 3)}) ${employeePhone.slice(3, 6)}-${employeePhone.slice(
      6,
      10,
    )}`;

    //Replaces employee's date of birth with the following format MM/DD/YYYY.
    let employeeDOB = employee.dob.date.replace(/[-:]/g, '');
    employeeDOB = `${employeeDOB.slice(4, 6)}/${employeeDOB.slice(6, 8)}/${employeeDOB.slice(0, 4)}`;

    const modalHTML = `
          <div class="modal-container">
            <div class="modal">
              <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
              <div class="modal-info-container">
                  <img class="modal-img" src="${employee.picture.large}" alt="${employee.name.first} ${employee.name.last}'s profile picture">
                  <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                  <p class="modal-text">${employee.email}</p>
                  <p class="modal-text cap">${employee.location.city}</p>
                  <hr>
                  <p class="modal-text">${employeePhone}</p>
                  <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.state}, ${employee.location.postcode} </p>
                  <p class="modal-text">Birthday: ${employeeDOB}</p>
            </div>
          </div>`;

    return modalHTML;
  }

  /**
   * Adds interactios to the modal that supports closing and navigating.
   */
  addModalInteractions() {
    const modalContainer = document.querySelector('.modal-container');
    this.removeModalContainer(modalContainer);
  }

  /**
   * Removes the popup modal on Escape keypress, close button click, or any click
   * outside of the content container.
   * @param {Element} modalContainer
   */
  removeModalContainer(modalContainer) {
    const removeModalContainer = function () {
      modalContainer.remove();
    };
    modalContainer.addEventListener('click', e => {
      if (e.target.classList.contains('modal-container')) {
        removeModalContainer();
      }
    });

    modalContainer.childNodes[1].childNodes[1].addEventListener('click', removeModalContainer);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        removeModalContainer();
      }
    });
  }

  /**
   * Processes getData fetch promise.
   */
  processEmployees() {
    this.getData()
      .then(data => this.generateEmployees(data))
      .then(() => {
        this.outputEmployees(this.employees);
      })
      .then(() => this.search());
  }

  /**
   * Calls addSearchInput and adds functionality to the search.
   */
  search() {
    this.addSearchInput();

    const searchInput = document.querySelector('#search-input');
    const searchForm = document.querySelector('#search');

    searchForm.addEventListener('submit', e => {
      e.preventDefault();
    });

    searchInput.addEventListener('input', e => {
      const searchValLower = e.target.value.toLowerCase();
      const searchedEmployees = [];

      this.employees.forEach(employee => {
        const employeefName = employee.name.first.toLowerCase();
        const employeelName = employee.name.last.toLowerCase();

        if (employeefName.includes(searchValLower) || employeelName.includes(searchValLower)) {
          searchedEmployees.push(employee);
        }
      });
      this.outputEmployees(searchedEmployees);
    });
  }

  /**
   * Generates search input HTML and outputs it to the screen.
   */
  addSearchInput() {
    const searchContainer = document.querySelector('.search-container');
    const searchHTML = `
    <form id="search" action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;

    searchContainer.innerHTML = searchHTML;
  }
}
