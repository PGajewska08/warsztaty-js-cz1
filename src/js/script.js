{
  'use strict';
  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      books: '.books-list',
      filters: '.filters',
      bookRatingFill: '.book__rating__fill',
    }
  };

  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const favouriteBooks = [];
  const filters = [];

  class BooksList {
    constructor(){
      const thisBookList = this;
      thisBookList.getElements();
      thisBookList.initActions();
      thisBookList.render();
    }

    initData(){
      this.data = dataSource.books;
    }

    getElements(){
      const thisBooksList = this;
      thisBooksList.dom = {};
      thisBooksList.dom.bookList = document.querySelector(select.containerOf.books);
      thisBooksList.dom.filtersContainer = document.querySelector(select.containerOf.filters);
      thisBooksList.dom.booksContainer = document.querySelector(select.containerOf.books);
    }

    initActions(){
      const thisBooksList = this;
     
      thisBooksList.dom.bookList.addEventListener('dblclick', function(event){
        event.preventDefault();
        const kliknietyElement = event.target; // kliknięty obrazek img
        const KontenerKliknietegoElementu = kliknietyElement.offsetParent;
        const czyZawiera = KontenerKliknietegoElementu.classList.contains('book__image');
        if(czyZawiera){
          const id = KontenerKliknietegoElementu.getAttribute('data-id');
          if(!favouriteBooks.includes(id)){
            KontenerKliknietegoElementu.classList.add('favorite');
            favouriteBooks.push(id);
          }else{
            KontenerKliknietegoElementu.classList.remove('favorite');
            const bookIdToRemove = favouriteBooks.indexOf(id);
            favouriteBooks.splice(bookIdToRemove, bookIdToRemove+1);
          }     
        }
      });
  
      thisBooksList.dom.filtersContainer.addEventListener('click', function(event){
        const kliknietyElement = event.target;
        if(kliknietyElement.tagName == 'INPUT' && kliknietyElement.getAttribute('type') == 'checkbox' && kliknietyElement.getAttribute('name') == 'filter'){
          const value = kliknietyElement.getAttribute('value');
          if(kliknietyElement.checked == true){
            filters.push(value);
            thisBooksList.filterBooks();
          }
          else{
            const id = filters.indexOf(value);
            filters.splice(id,id+1);
            thisBooksList.filterBooks();
          }
        }
      });
    }

    render(){
      const thisBooksList = this;
      for(const data of dataSource.books){
        const ratingBgc = this.determineRatingBgc(data.rating);
        const ratingWidth = data.rating * 10;
        data.ratingBgc = ratingBgc;
        data.ratingWidth = ratingWidth;
        const generatedHTML = templates.book(data);
        const element = utils.createDOMFromHTML(generatedHTML);
        
        thisBooksList.dom.booksContainer.appendChild(element);
      }
    }

    determineRatingBgc(rating){
      let background = '';
      if(rating < 6){
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      }
      if(rating > 6 && rating <= 8){
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      }
      if(rating > 8 && rating <= 9){
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      }
      if(rating > 9){
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return background;
    }

    filterBooks(){
      for(const book of dataSource.books){
        const image = document.querySelector('.book__image[data-id="'+book.id+'"]');
        image.classList.remove('hidden');
        for(const filter of filters){
          let shouldBeHidden = false;
          if(!book.details[filter]){
            shouldBeHidden = true;
            if(shouldBeHidden == true){
              image.classList.add('hidden');
            }
            break;   
          }  
        }
      }
    }
  }

  const app = new BooksList();
}