const notecontainer = document.querySelector(".note-container");
const button = document.querySelector(".btn");
let counter = 0;

// Load notes from local storage when the page loads
window.addEventListener('load', () => {
  const savedNotes = localStorage.getItem('notes');
  if (savedNotes) {
    notecontainer.innerHTML = savedNotes;
    initializeDeleteListeners(); // Initialize delete listeners for the loaded notes
  }
});
button.addEventListener('click', () => {
  counter++;
  const div = document.createElement("div");
  div.innerHTML = `
    <p contenteditable="true" class="input-box">
      <img src="./images/delete.png" id="image" alt="">
    </p>
  `;
  
  const deleteImage = div.querySelector("#image");
  deleteImage.addEventListener('click', () => {
    div.remove();
    saveNotesToLocalStorage(); // Save updated notes to local storage
  });

  if (counter === 3) {
    alert("This occurs only 3 times");
    button.disabled = true;
  }

  notecontainer.appendChild(div);
  saveNotesToLocalStorage(); // Save new note to local storage
});

function saveNotesToLocalStorage() {
  const notesHTML = notecontainer.innerHTML;
  localStorage.setItem('notes', notesHTML);
}

function initializeDeleteListeners() {
  const deleteImages = document.querySelectorAll("#image");
  deleteImages.forEach(deleteImage => {
    deleteImage.addEventListener('click', () => {
      deleteImage.parentElement.parentElement.remove();
      saveNotesToLocalStorage();
    });
  });
}


