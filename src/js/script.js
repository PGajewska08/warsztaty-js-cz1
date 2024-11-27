{
  'use strict';
  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      books: '.books-list',
    }
  };

  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const favouriteBooks = [];
  
  function render(){
    for(const data of dataSource.books){
      //console.log('data: ',data);
      const generatedHTML = templates.book(data);
      //console.log(generatedHTML);
      const element = utils.createDOMFromHTML(generatedHTML);
      //console.log('element: ', element);
      const booksContainer = document.querySelector(select.containerOf.books);
      booksContainer.appendChild(element);
    }
  }
  render();

  function initActions(){
    const bookList = document.querySelector(select.containerOf.books);
    //const bookImages = bookList.querySelectorAll('.book__image');
    //console.log(bookImage);
   
    bookList.addEventListener('dblclick', function(event){
      event.preventDefault();
      const kliknietyElement = event.target; // kliknięty obrazek img
      const KontenerKliknietegoElementu = kliknietyElement.offsetParent;
      
      console.log('klikniety element: ', kliknietyElement);
      console.log('kontener elementu: ', KontenerKliknietegoElementu);
      console.log('lista klas kontenera: ', KontenerKliknietegoElementu.classList);
      const czyZawiera = KontenerKliknietegoElementu.classList.contains('.book__image');
      console.log(czyZawiera);
      if(KontenerKliknietegoElementu.classList.contains('.book__image')){
        
        console.log(KontenerKliknietegoElementu);
        const id = KontenerKliknietegoElementu.getAttribute('data-id');
        if(!favouriteBooks.includes(id)){
          this.classList.add('favorite');
          favouriteBooks.push(id);
          console.log(favouriteBooks);
        }else{
          this.classList.remove('favorite');
          const bookIdToRemove = favouriteBooks.indexOf(id);
          favouriteBooks.splice(bookIdToRemove, bookIdToRemove+1);
          console.log(favouriteBooks);
        }     
      }
      else{
        console.log('blad');
      }
    });
  }
  initActions();
  //console.log('Favourites: ', favouriteBooks);
}