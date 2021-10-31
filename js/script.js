/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/**
 * Global Constant that limits the number of students displayed on each page.
 * Saved as a global constant to make it easier to change number of students to be displayed.
 */
const STUDENTS_PER_PAGE = 9;

/**
 * Summary: showPage function creates and inserts 9 students and displays student information to the page.
 *
 * Description: showPage function displays 9 students on the page from the list of student data depending on the page selected.
 *
 * @param {object[]} list (data)
 * @param {number} page (defaults to page 1)
 */
function showPage(list, page) {
  const startIndex = page * STUDENTS_PER_PAGE - STUDENTS_PER_PAGE;
  const endIndex = page * STUDENTS_PER_PAGE;

  const studentList = document.querySelector(".student-list");
  studentList.innerHTML = "";

  function createStudent(student) {
    const studentLI = document.createElement("li");
    studentLI.className = "student-item cf";

    const studentDetailsDIV = document.createElement("div");
    studentDetailsDIV.className = "student-details";
    const avatar = document.createElement("img");
    avatar.className = "avatar";
    avatar.src = student.picture.thumbnail;
    avatar.alt = "Profile Picture";
    studentDetailsDIV.appendChild(avatar);
    const name = document.createElement("h3");
    name.textContent = `${student.name.first} ${student.name.last}`;
    studentDetailsDIV.appendChild(name);
    const email = document.createElement("span");
    email.className = "email";
    email.textContent = student.email;
    studentDetailsDIV.appendChild(email);
    studentLI.appendChild(studentDetailsDIV);

    const joinedDetailsDIV = document.createElement("div");
    joinedDetailsDIV.className = "joined-details";
    const dateJoined = document.createElement("span");
    dateJoined.className = "date";
    dateJoined.textContent = `Joined ${student.registered.date}`;
    joinedDetailsDIV.appendChild(dateJoined);
    studentLI.appendChild(joinedDetailsDIV);
    studentList.appendChild(studentLI);
  }

  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      createStudent(list[i]);
    }
  }
}

/**
 *
 * Summary: addPagination function creates and inserts page number buttons to the bottom of the page with an event listener that changes the student data displayed based on the page number that was clicked.
 *
 * Description: calls showPage() at the end passing in list and page number clicked.
 *
 * @param {Array of Objects} list (data)
 *
 */
function addPagination(list) {
  const numberOfPages = Math.ceil(list.length / STUDENTS_PER_PAGE);
  const linkListUL = document.querySelector(".link-list");
  linkListUL.innerHTML = "";
  for (let i = 1; i <= numberOfPages; i++) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = i;
    li.appendChild(button);
    linkListUL.appendChild(li);
  }
  linkListUL.firstElementChild.firstElementChild.className = "active";
  linkListUL.addEventListener("click", (e) => {
    if (e.target.type === "button") {
      const buttonLiCollection = linkListUL.children;
      for (let i = 0; i < buttonLiCollection.length; i++) {
        buttonLiCollection[i].firstElementChild.className = "";
      }
      e.target.className = "active";
      showPage(list, e.target.textContent);
    }
  });
}

/**
 * Extra Credit
 */

const header = document.querySelector(".header");

function searchBar(list) {
  const label = document.createElement("label");
  label.htmlFor = "search";
  label.className = "student-search";
  const span = document.createElement("span");
  span.textContent = "Search by name";
  label.appendChild(span);
  const input = document.createElement("input");
  input.id = "search";
  input.placeholder = "Search by name...";
  label.appendChild(input);
  const button = document.createElement("button");
  button.type = "button";
  const img = document.createElement("img");
  img.src = "img/icn-search.svg";
  img.alt = "Search icon";
  button.appendChild(img);
  label.appendChild(button);
  header.appendChild(label);

  function liveSearch(search) {
    search = search.toUpperCase();
    const newList = [];
    for (let i = 0; i < list.length; i++) {
      let fullName = `${list[i].name.first.toUpperCase()} ${list[
        i
      ].name.last.toUpperCase()}`;
      if (fullName.includes(search)) {
        newList.push(list[i]);
      }
    }
    if (newList.length > 0) {
      showPage(newList, 1);
      addPagination(newList);
    } else {
      const noResutls = document.createElement("h4");
      noResutls.textContent = "No results found";
      const studentList = document.querySelector(".student-list");
      studentList.innerHTML = "";
      studentList.appendChild(noResutls);
      const linkListUL = document.querySelector(".link-list");
      linkListUL.innerHTML = "";
    }
  }
  input.addEventListener("keyup", () => {
    liveSearch(input.value);
  });
  button.addEventListener("click", () => {
    liveSearch(input.value);
  });
}

/**
 * Function calls to initialize data on the page. Defaults to page #1
 */
showPage(data, 1);
addPagination(data);
searchBar(data);
