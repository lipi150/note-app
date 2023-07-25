const btn=document.querySelector('.btn');

const updateLS =()=>{
    const textAreaData= document.querySelectorAll('textarea');
    const notes =[];
    textAreaData.forEach((note)=>{
        return notes.push(note.value);
    });
    localStorage.setItem('notes',JSON.stringify(notes));
}

const addNewNote=(text="")=>{

    const print= document.querySelector('.print');
    const note= document.createElement('div');
    note.classList.add('note');

    const htmlData =`
    <div class="main">
    <div class="back-textarea ${text?"":"hidden"}"></div>
    <textarea class="${text?"hidden":""}"></textarea>
      <div class="icons">
         <button class="edit">  <i class="fa-solid fa-pen-to-square "></i></button>
          <button class="delete"><i class="fa-sharp fa-solid fa-trash "></i></button>
      </div>
  </div>
    `;

    note.insertAdjacentHTML('afterbegin',htmlData);
    print.appendChild(note);

    const edit = note.querySelector('.edit');
    const trash = note.querySelector('.delete');
    const textarea = note.querySelector('textarea');
    const backTextarea = note.querySelector('.back-textarea');

trash.addEventListener('click',()=>{
    note.remove();
    updateLS();
});

textarea.value=text;
backTextarea.innerHTML=text;



edit.addEventListener('click',()=>{
    backTextarea.classList.toggle('hidden');
    textarea.classList.toggle('hidden');

  
});

textarea.addEventListener('change',(event)=>{
    const value = event.target.value;
    backTextarea.innerHTML=value;
    updateLS();
})

};

const notes =JSON.parse(localStorage.getItem('notes'));

if (notes){
    notes.forEach((note)=>addNewNote(note));
}


btn.addEventListener('click',()=>addNewNote());