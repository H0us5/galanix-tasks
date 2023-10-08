document
  .getElementById("searchButton")
  .addEventListener("click", searchUniversities);
document.getElementById("resetButton").addEventListener("click", resetForm);

function searchUniversities() {
  const country = document.getElementById("countryInput").value;

  if (country.trim() === "") {
    return;
  }

  fetch(`http://universities.hipolabs.com/search?country=${country}`)
    .then((response) => response.json())
    .then((data) => {
      const table = document.getElementById("universityTable");
      table.innerHTML = "";
      let counter = 0;
      data.forEach((university, index) => {
        const row = table.insertRow();
        row.insertCell().innerText = index + 1;
        row.insertCell().innerText = university.name;
        row.insertCell().innerText = university.country;
        const websiteCell = row.insertCell();
        websiteCell.innerHTML = `<a href="${university.web_pages[0]}">${university.web_pages[0]}</a>`;
        const checkboxCell = row.insertCell();
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `checkbox_${index}`;
        checkbox.addEventListener("change", updateCounter);
        checkboxCell.appendChild(checkbox);

        const savedData = JSON.parse(localStorage.getItem("universityData"));
        if (savedData && savedData.checkedItems.includes(checkbox.id)) {
          checkbox.checked = true;
          counter++;
        }
      });
      updateCounter();
    })
    .catch((error) => console.error("Помилка:", error));
}

function resetForm() {
  document.getElementById("countryInput").value = "";
  document.getElementById("universityTable").innerHTML = "";
  document.getElementById("counter").innerText = "";
  localStorage.removeItem("universityData");
}

function updateCounter() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const checkedCount = Array.from(checkboxes).filter(
    (checkbox) => checkbox.checked
  ).length;
  document.getElementById("counter").innerText = `Відмічено: ${checkedCount}`;

  const country = document.getElementById("countryInput").value;
  const checkedItems = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map((checkbox) => checkbox.id);
  const data = {
    country: country,
    checkedItems: checkedItems,
  };
  localStorage.setItem("universityData", JSON.stringify(data));
}

window.addEventListener("DOMContentLoaded", () => {
  const savedData = JSON.parse(localStorage.getItem("universityData"));
  if (savedData) {
    document.getElementById("countryInput").value = savedData.country;
    searchUniversities();
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = savedData.checkedItems.includes(checkbox.id);
    });
    updateCounter();
  }
});
