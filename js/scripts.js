/*
 * Name: Employee Directory API
 * Description:
 * Project: TeamTreeHouse API Project
 *
 */

const numberOfUsers = 12;
const apiURL = `https://randomuser.me/api/?nat=us&results=${numberOfUsers}`;
const employeeGallery = document.getElementById('gallery');

document.addEventListener('DOMContentLoaded', () => {
  const employee = new EmployeeAPI(apiURL);
  employee.processEmployees();
});
