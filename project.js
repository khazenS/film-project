const form = document.getElementById("film-form");
const titleElement = document.getElementById("title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

// UI nesnesini başlatma
const ui = new UI();
// event listeners
eventListeners();
//storage nesne başlatma 
const storage = new Storage();
function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    })
    cardBody.addEventListener("click",deletefilm);
    clear.addEventListener("click",clearAllFilms);
    

}
function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;
    if(title === "" || director === "" || url=== ""){
        ui.displayMassages("Tüm alanları doldurunuz...","danger");
    }
    else{
        const newFilm = new Film(title,director,url);
        ui.displayMassages("Başarıyla eklendi...","succes");
        ui.addFilmToUI(newFilm); // Arayüze ekleme
        storage.addFilmToStorage(newFilm);
        
        
    }
    ui.cleatInputs(titleElement,directorElement,urlElement); //input temizleme
    
    
    
    
    
    
    
    e.preventDefault();
}
function deletefilm (e){
    if(e.target.id  === "delete-film"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        
    }
}
function clearAllFilms (e){
    ui.clearAllFilmsFromUI();
    storage.clearAllFilmsFromStorage();
}
