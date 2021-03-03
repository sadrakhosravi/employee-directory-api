class EmployeeAPI {
  constructor(url) {
    this.url = url;
  }

  async getData() {
    try {
      const employees = await fetch(this.url);
      return await employees.json();
    } catch (error) {
      console.log(error);
    }
  }

  outputEmployees() {
    this.getData().then(data => this.generateHTML(data));
  }

  generateHTML(data) {
    const employees = data.results;
    console.log(employees);
    employees.forEach(employee => {
      let employeeHTML = `
      <div class="card">
          <div class="card-img-container">
              <img class="card-img" src="${employee.picture.large}" alt="profile picture">
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
}
