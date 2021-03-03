/*
 * Name: Employee Directory API
 * Description:
 * Project: TeamTreeHouse API Project
 *
 */

const numberOfUsers = 12;
const apiURL = `https://randomuser.me/api/?results=${numberOfUsers}`;
const employeeGallery = document.getElementById('gallery');
const employeeCards = document.querySelectorAll('.card');

document.addEventListener('DOMContentLoaded', () => {
  const employee = new EmployeeAPI(apiURL);
  employee.outputEmployees();
});

console.log(employeeCards);
employeeCards.forEach(card => {
  card.addEventListener('click', e => {
    console.log(e.target, 'Card clicked');
  });
});
