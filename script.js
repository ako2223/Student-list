//          https://jsonplaceholder.typicode.com
const URL = "http://localhost:8000";
const tbody = document.querySelector(".studentsTable tbody");
const postForm = document.querySelector(".post_form");
const addStudentBtn = document.querySelector(".add_student");
const mtbody = document.querySelector(".mentorsTable tbody");
const mPostForm = document.querySelector(".post_form_mentors");
const addMentorBtn = document.querySelector(".add_mentor");

const getStudents = () => {
  fetch(`${URL}/students`)
    .then((response) => response.json())
    .then((data) => {
      const sortedStudents = data.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      renderStudents(sortedStudents);
    });
};

const getMentors = () => {
  fetch(`${URL}/mentors`)
    .then((response) => response.json())
    .then((data) => {
      const sortedMentors = data.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      renderMentors(sortedMentors);
    });
};

const deleteStudent = (studentID) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(`${URL}/students/${studentID}`, options).then(() => getStudents());
};

const deleteMentor = (mentorID) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(`${URL}/mentors/${mentorID}`, options).then(() => getMentors());
};

const editStudent = (studentID, obj) => {
  let options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };

  fetch(`${URL}/students/${studentID}`, options);
};

const editMentor = (mentorID, obj) => {
  let options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };

  fetch(`${URL}/mentors/${mentorID}`, options);
};

const onEdit = (studentID) => {
  const name = document.querySelector(`input[name=name-${studentID}]`);
  const gender = document.querySelector(`input[name=gender-${studentID}]`);
  const age = document.querySelector(`input[name=age-${studentID}]`);
  const editBtn = document.querySelector(`.editBtn-${studentID}`);

  name.classList.toggle("active");
  gender.classList.toggle("active");
  age.classList.toggle("active");

  if (editBtn.innerHTML === "Edit") {
    name.removeAttribute("disabled");
    gender.removeAttribute("disabled");
    age.removeAttribute("disabled");

    editBtn.textContent = "Save";
  } else {
    name.setAttribute("disabled", true);
    gender.setAttribute("disabled", true);
    age.setAttribute("disabled", true);

    editBtn.textContent = "Edit";
    let obj = {
      name: name.value,
      gender: gender.value,
      age: age.value,
    };
    editStudent(studentID, obj);
  }
};

const onEditM = (mentorID) => {
  const name = document.querySelector(`input[name=name_mentor-${mentorID}]`);
  const gender = document.querySelector(
    `input[name=gender_mentor-${mentorID}]`
  );
  const age = document.querySelector(`input[name=age_mentor-${mentorID}]`);
  const editBtnM = document.querySelector(`.editBtnM-${mentorID}`);

  name.classList.toggle("active");
  gender.classList.toggle("active");

  if (editBtnM.innerHTML === "Edit") {
    name.removeAttribute("disabled");
    gender.removeAttribute("disabled");

    editBtnM.textContent = "Save";
  } else {
    name.setAttribute("disabled", true);
    gender.setAttribute("disabled", true);

    editBtnM.textContent = "Edit";
    let obj = {
      name: name.value,
      gender: gender.value,
    };
    editMentor(mentorID, obj);
  }
};

const renderStudents = (students) => {
  tbody.innerHTML = "";
  students.forEach((student, index) => {
    let tr = `
      <tr>
        <td>${index + 1}</td>
        <td><input type="text" value="${student.name}" name="name-${
      student.id
    }" disabled></td>
        <td><input type="text" value="${student.gender}" name="gender-${
      student.id
    }" disabled></td>
        <td><input type="text" value="${student.age}" name="age-${
      student.id
    }" disabled></td>
        <td>
          <button onclick="deleteStudent(${student.id})">Delete</button>
          <button onclick="onEdit(${student.id})" class="editBtn-${
      student.id
    }">Edit</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += tr;
  });
};

const renderMentors = (mentors) => {
  mtbody.innerHTML = "";
  mentors.forEach((mentor, index) => {
    let tr = `
    <tr>
    <td>${index + 1}</td>
    <td><input type="text" value="${mentor.name}" name="name_mentor-${
      mentor.id
    }"
    }" disabled></td>
    <td><input type="text" value="${mentor.gender}" name="gender_mentor-${
      mentor.id
    }"
    } disabled></td>
    <td>
<button onclick="deleteMentor(${mentor.id})">Delete</button>
<button onclick="onEditM(${mentor.id})" class="editBtnM-${
      mentor.id
    }">Edit</button>
</td>
</tr>
`;
    mtbody.innerHTML += tr;
  });
};

getStudents();
getMentors();

const postNewStudent = (data) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(`${URL}/students`, options).then(() => getStudents());
};

const visibleAddForm = () => {
  if (postForm.classList.contains("active")) {
    const nameValue = document.querySelector("#name").value;
    const genderValue = document.querySelector("#gender").value;
    const ageValue = document.querySelector("#age").value;
    const newStudent = {
      id: new Date().getSeconds(),
      name: nameValue,
      gender: genderValue,
      age: ageValue,
    };
    postNewStudent(newStudent);
  } else {
    postForm.classList.add("active");
  }
};

addStudentBtn.addEventListener("click", (event) => {
  event.preventDefault();
  visibleAddForm();
});

const postNewMentor = (data) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(`${URL}/mentors`, options).then(() => getMentors());
};
const visibleAddFormMentors = () => {
  if (mPostForm.classList.contains("active")) {
    const nameValue = document.querySelector("#name_mentor").value;
    const genderValue = document.querySelector("#gender_mentor").value;
    // const ageValue = document.querySelector("#age_mentor").value;
    const newMentor = {
      id: new Date().getSeconds(),
      name: nameValue,
      gender: genderValue,
    };
    postNewMentor(newMentor);
  } else {
    mPostForm.classList.add("active");
  }
};

addMentorBtn.addEventListener("click", (event) => {
  event.preventDefault();
  visibleAddFormMentors();
});
