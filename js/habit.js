(() => {
  const habitsTable = document.getElementById("habits");
  const habits = JSON.parse(localStorage.getItem("habits")) || [];

  function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
  }

  function addHabit(habit) {
    const habitRow = document.createElement("tr");
    const habitNameCell = document.createElement("td");
    habitNameCell.textContent = habit;
    habitRow.appendChild(habitNameCell);

    for (let i = 0; i < 21; i++) {
      const dayCell = document.createElement("td");
      dayCell.classList.add("unchecked");
      dayCell.addEventListener("click", () => toggleDay(i, habitRow));
      habitRow.appendChild(dayCell);
    }

    const deleteCell = document.createElement("td");
    deleteCell.classList.add("delete-habit");
    deleteCell.textContent = "×";
    deleteCell.addEventListener("click", () => deleteHabit(habitRow));
    habitRow.appendChild(deleteCell);

    habitsTable.querySelector("tbody").appendChild(habitRow);
  }

  function deleteHabit(habitRow) {
    const habitName = habitRow.querySelector("td").textContent;
    const habitIndex = habits.findIndex((habit) => habit === habitName);
    habits.splice(habitIndex, 1);
    saveHabits();
    habitRow.remove();
  }

  function toggleDay(dayIndex, habitRow) {
    const dayCell = habitRow.querySelectorAll("td:not(:first-child)")[dayIndex];
    dayCell.classList.toggle("checked");
    dayCell.classList.toggle("unchecked");
    saveHabits();
  }

  function deleteAllHabits() {
    localStorage.removeItem("habits");
    habitsTable.querySelector("tbody").innerHTML = "";
    habits.length = 0;
  }

  habits.forEach((habit) => addHabit(habit));

  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const habitInput = document.getElementById("habit");
    const habit = habitInput.value.trim();

    if (habit) {
      habits.push(habit);
      saveHabits();
      addHabit(habit);
      habitInput.value = "";
    }
  });

  document.getElementById("delete-all").addEventListener("click", () => {
    deleteAllHabits();
  });
})();
