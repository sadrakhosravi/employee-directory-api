/*
 * Name: Employee Directory API
 * Description: Gets 12 random generated user from random user API and displays them to the page with
 * modal that shows the details of that user.
 * Project: TeamTreeHouse API Project
 *
 */

const numberOfUsers = 12;
const apiURL = `https://randomuser.me/api/?nat=us&results=${numberOfUsers}`;
const employeeGallery = document.getElementById('gallery');

document.addEventListener('DOMContentLoaded', () => {
  const employees = new EmployeesAPI(apiURL);
  employees.processEmployees();
});
