/*
 * Name: Employee Directory API
 * Description:
 * Project: TeamTreeHouse API Project
 *
 */
'use strict';

const numberOfUsers = 12;
const apiURL = `https://randomuser.me/api/?results=${numberOfUsers}`;

const employeeGallery = document.getElementById('gallery');

// /**
//  * Uses fetch to get random user's data from an API
//  * @param {String} url - API URL Endpoint
//  * @return {Promise} - The resolved promsise
//  */
// const getEmployeeData = async function (url) {
//   try {
//     const employees = await fetch(url);
//     return await employees.json();
//   } catch (error) {
//     console.log(error);
//   }
// };

// const outputEmployees = function () {
//   getEmployeeData(apiURL).then(generateHTML);
// };

// const generateHTML = function (data) {};

document.addEventListener('DOMContentLoaded', () => {
  const employee = new EmployeeAPI(apiURL);
  employee.outputEmployees();
});
