{
  'use strict';

  const select = {
    wrapper: {
      bookList: '.books-list',
      filters: '.filters',
    },
    templateOf: {
      book: '#template-book',
    },
  };

  const classNames = {
    favoriteBook: 'favorite',
    hidden: 'hidden',
    bookImage: 'book__image',
  };

  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  class BooksList {
    constructor(){
      const thisBooksList = this;
      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.renderLibrary();
      thisBooksList.initActions();
    }

    initData(){
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;
    }

    getElements(){
      const thisBooksList = this;
      thisBooksList.bookListWrapper = document.querySelector(select.wrapper.bookList);
      thisBooksList.filterWrapper = document.querySelector(select.wrapper.filters);
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }

    renderLibrary(){
      const thisBooksList = this;
      for(let book of thisBooksList.data){
        const generatedHTML = templates.book(book);
        const element = utils.createDOMFromHTML(generatedHTML);
        thisBooksList.bookListWrapper.appendChild(element);
        /*
        const ratingBgc = determineRatingBgc(book.rating);
        const rating = element.querySelector('.book__rating__fill');
        console.log(ratingBgc);
        console.log(rating.getAttribute("style"));
        rating.getAttribute("style")["background"] = ratingBgc;
        console.log(rating.style);
        */
      }
    }

    filterBooks(){
      const thisBooksList = this;
      for(let book of thisBooksList.data){
        const bookToBeHidden = document.querySelector('.book__image[data-id="' + book.id + '"]');
        let shouldBeHidden = false;
        for(let filterName of thisBooksList.filters){
          if(!book.details[filterName]){
            shouldBeHidden = true;
            break;
          }
        }
        if(shouldBeHidden){
          bookToBeHidden.classList.add(classNames.hidden);
        } else{
          bookToBeHidden.classList.remove(classNames.hidden);
        }
      }
    }

    initActions(){
      const thisBooksList = this;
      thisBooksList.bookListWrapper.addEventListener('dblclick', function(event){
        event.preventDefault();
        const clickedElement = event.target.offsetParent;
        console.log(clickedElement);
        console.log(clickedElement.classList.contains(classNames.bookImage));

        if(clickedElement.classList.contains(classNames.bookImage)){
          const id = clickedElement.getAttribute('data-id');
          if(!clickedElement.classList.contains(classNames.favoriteBook)){
            thisBooksList.favoriteBooks.push(id);
            clickedElement.classList.add(classNames.favoriteBook);
          } else{
            thisBooksList.favoriteBooks.splice(thisBooksList.favoriteBooks.indexOf(id), 1);
            clickedElement.classList.remove(classNames.favoriteBook);
          }
        }
        console.log(thisBooksList.favoriteBooks);
      });
      thisBooksList.filterWrapper.addEventListener('click', function(event){
        const clickedElement = event.target;
        console.log('filters',thisBooksList.filters);
        if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter' ){
          if(clickedElement.checked){
            thisBooksList.filters.push(clickedElement.value);
            thisBooksList.filterBooks();
          } else{
            thisBooksList.filters.splice(thisBooksList.filters.indexOf(clickedElement.value), 1);
            thisBooksList.filterBooks();
          }
        }
        console.log('filters again', thisBooksList.filters);
      });
    }
  }
  const app = new BooksList(); // eslint-disable-line no-unused-vars

  /*const bookListWrapper = document.querySelector(select.wrapper.bookList);
  const filterWrapper = document.querySelector(select.wrapper.filters);
  const favoriteBooks = [];
  const filters = []; */

  /*const determineRatingBgc = function(rating){
    let bgc = '';
    if(rating <6){
      bgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
    }
    if(rating>6 && rating<=8){
      bgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
    }
    if(rating>8 && rating<=9){
      bgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
    }
    if(rating>9){
      bgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
    }
    return bgc;
  }; */

  /*const renderLibrary = function(){
    for(let book of dataSource.books){
      const generatedHTML = templates.booksList(book);
      //const ratingBgc = determineRatingBgc(book.rating);
      const element = utils.createDOMFromHTML(generatedHTML);
      bookListWrapper.appendChild(element);

      const rating = element.querySelector('.book__rating__fill');
      console.log(ratingBgc);
      console.log(rating.getAttribute("style"));
      rating.getAttribute("style")["background"] = ratingBgc;
      console.log(rating.style);

    }
  }; */


  /*const filterBooks = function(){
    for(let book of dataSource.books){
      const bookToBeHidden = document.querySelector('.book__image[data-id="' + book.id + '"]');
      let shouldBeHidden = false;
      for(let filterName of filters){
        if(!book.details[filterName]){
          shouldBeHidden = true;
          break;
        }
      }
      if(shouldBeHidden){
        bookToBeHidden.classList.add('hidden');
      } else {
        bookToBeHidden.classList.remove('hidden');
      }
    }
  }; */
  /*const initActions = function(){

    bookListWrapper.addEventListener('dblclick', function(event){
      event.preventDefault();
      const clickedElement = event.target.offsetParent;
      console.log(clickedElement);
      console.log(clickedElement.classList.contains('book__image'));

      if(clickedElement.classList.contains('book__image')){
        const id = clickedElement.getAttribute('data-id');
        if(!clickedElement.classList.contains(classNames.favoriteBook)){
          favoriteBooks.push(id);
          clickedElement.classList.add(classNames.favoriteBook);
        } else {
          favoriteBooks.splice(favoriteBooks.indexOf(id), 1);
          clickedElement.classList.remove(classNames.favoriteBook);
        }
      }
      console.log(favoriteBooks);
    });

    filterWrapper.addEventListener('click', function(event){
      const clickedElement = event.target;
      console.log('filters',filters);
      if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter' ){
        if(clickedElement.checked){
          filters.push(clickedElement.value);
          filterBooks();
        } else {
          filters.splice(filters.indexOf(clickedElement.value), 1);
          filterBooks();
        }
      }
      console.log('filters ponownie', filters);
    });

  };*/
}
