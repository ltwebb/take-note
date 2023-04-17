const noteListDiv = document.querySelector('.note-list');
let noteID = 1;
function Note(id, title, content){
    this.id = id;
    this.title = title;
    this.content = content;
}

// all eventlisteners
function eventListeners(){
    document.addEventListener('DOMContentLoaded', displayNotes);
    document.getElementById('add-note-btn').addEventListener('click', addNewNote);
    noteListDiv.addEventListener('click', deleteNote);
    document.getElementById('delete-all-btn').addEventListener('click', deleteAllNotes);
}

eventListeners();

// get items form storage
function getDataFromStorage(){
    return localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
}

// add a new note in the list
function addNewNote(){
    const noteTitle = document.getElementById('note-title'),
          noteContent = document.getElementById('note-content');
    if(validateInput(noteTitle, noteContent)){
        let notes = getDataFromStorage();
        let noteItem = new Note(noteID, noteTitle.value, noteContent.value);
        noteID++;
        notes.push(noteItem);
        createNote(noteItem);
        // saving in the local storage
        localStorage.setItem('notes', JSON.stringify(notes));
        noteTitle.value = "";
        noteContent.value = "";
    }
}

// input validation
function validateInput(title, content){
    if(title.value !== "" && content.value !== ""){
        return true;
    } else {
        if(title.value === "") title.classList.add('warning');
        if(content.value === "") content.classList.add('warning');
    }
    setTimeout(() => {
        title.classList.remove('warning');
        content.classList.remove('warning');
    }, 1500);
}

// create a new note div and add styles
function createNote(noteItem){
    const div = document.createElement('div');
    div.style.backgroundColor ='#faf5ff';
    div.style.borderRadius ='12px';
    div.style.padding='12px';
    div.style.boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px';
    div.style.marginBottom = '8px';
    div.classList.add('note-item');
    div.setAttribute('data-id', noteItem.id);
    div.innerHTML = `
    
        <h3 class="font-normal text-2xl text-purple-700">${noteItem.title}</h3>
        <p class="text-md tracking-wide mb-2">${noteItem.content}</p>
        <button type = "button" class = "btn delete-note-btn mt-4 bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600">
        <span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" class="w-6 h-6 mb-2 inline">
        <path stroke-linecap="round" stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
</span>
         Remove Item
        </button>
        
       
                
    `;
    noteListDiv.appendChild(div);
}


// display all notes from the local storage
function displayNotes(){
    let notes = getDataFromStorage();
    if(notes.length > 0){
        noteID = notes[notes.length - 1].id;
        noteID++;
    } else {
        noteID = 1;
    }
    notes.forEach(item => {
        createNote(item);
    });
}

// delete a note 
function deleteNote(e){
    if(e.target.classList.contains('delete-note-btn')){
        //console.log(e.target.parentElement);
        e.target.parentElement.remove(); // removing from DOM
        let divID = e.target.parentElement.dataset.id;
        let notes = getDataFromStorage();
        let newNotesList = notes.filter(item => {
            return item.id !== parseInt(divID);
        });
        localStorage.setItem('notes', JSON.stringify(newNotesList));
    }
}

// delete all notes
function deleteAllNotes(){
    localStorage.removeItem('notes');
    let noteList = document.querySelectorAll('.note-item');
    if(noteList.length > 0){
        noteList.forEach(item => {
            noteListDiv.removeChild(item);
        });
    }
    noteID = 1; // resetting noteID to 1
}