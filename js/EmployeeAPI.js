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
  }

  modalOutput() {}

  /**
   * Calls the "generateHTML" method on the response promise returned by the API
   */
  outputEmployees() {
    this.getData().then(data => this.generateHTML(data));
  }
}
