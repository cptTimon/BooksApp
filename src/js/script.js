{
  'use strict';

  const select = {
    wrapper: {
      booksList: '.books-list',
    },
    templateOf: {
      booksList: '#template-book',
    },
    class: {
      favouriteBook: 'favorite',
    },
    book: {
      bookImage: ''
    },
  };

  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),
  };

  const bookListWrapper = document.querySelector(select.wrapper.booksList);
  const allBooks = [];
  const favoriteBooks = [];

  const renderLibrary = function(){
    for(let book of dataSource.books){
      const generatedHTML = templates.booksList(book);

      const element = utils.createDOMFromHTML(generatedHTML);

      bookListWrapper.appendChild(element);
      allBooks.push(element);
    }
  };
  console.log(allBooks);

  const initActions = function(){

    const booksList = document.querySelector('.books-list');
    booksList.addEventListener('dblclick', function(event){
      event.preventDefault();
      const clickedElement = event.target;
      console.log(clickedElement);
      console.log(clickedElement.classList.contains('book__image'));

      if(clickedElement.classList.contains('book__image')){
        const id = clickedElement.getAttribute('data-id');
        if(!clickedElement.classList.contains(select.class.favouriteBook)){
          favoriteBooks.push(id);
          clickedElement.classList.add(select.class.favouriteBook);
          console.log('dodalem ksiazke!');
        } else {
          favoriteBooks.splice(favoriteBooks.indexOf(id), 1);
          clickedElement.classList.remove(select.class.favouriteBook);
        }
      }
    })
   /* for(let book of allBooks){
      const bookCover = book.querySelector('.book__image');
      console.log(bookCover);

      bookCover.addEventListener('dblclick', function(event){
        event.preventDefault();
        const id = bookCover.getAttribute('data-id');
        if(!bookCover.classList.contains(select.class.favouriteBook)){
          favoriteBooks.push(id);
          bookCover.classList.add(select.class.favouriteBook);
          console.log('dodalem ksiazke!');
        } else {
          favoriteBooks.splice(favoriteBooks.indexOf(id), 1);
          bookCover.classList.remove(select.class.favouriteBook);
        }
        console.log('Favorite Books', favoriteBooks);
      })
    } */
  }
  renderLibrary();
  initActions();
}
