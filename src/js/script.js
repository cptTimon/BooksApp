{
  'use strict';

  const select = {
    wrapper: {
      booksList: '.books-list',
      filters: '.filters',
    },
    templateOf: {
      booksList: '#template-book',
    },
    class: {
      favouriteBook: 'favorite',
      filtered: 'hidden',
    },
    book: {
      bookImage: '',
      currentBook: '.book__image[data-id="book.id"]',
    },
  };

  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),
  };

  const bookListWrapper = document.querySelector(select.wrapper.booksList);
  const filterWrapper = document.querySelector(select.wrapper.filters);
  const favoriteBooks = [];
  const filters = [];

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
  const renderLibrary = function(){
    for(let book of dataSource.books){
      const generatedHTML = templates.booksList(book);
      //const ratingBgc = determineRatingBgc(book.rating);
      const element = utils.createDOMFromHTML(generatedHTML);
      bookListWrapper.appendChild(element);
      /*
      const rating = element.querySelector('.book__rating__fill');
      console.log(ratingBgc);
      console.log(rating.getAttribute("style"));
      rating.getAttribute("style")["background"] = ratingBgc;
      console.log(rating.style);
      */
    }
  };

  const filterBooks = function(){
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

  };
  const initActions = function(){

    bookListWrapper.addEventListener('dblclick', function(event){
      event.preventDefault();
      const clickedElement = event.target.offsetParent;
      console.log(clickedElement);
      console.log(clickedElement.classList.contains('book__image'));

      if(clickedElement.classList.contains('book__image')){
        const id = clickedElement.getAttribute('data-id');
        if(!clickedElement.classList.contains(select.class.favouriteBook)){
          favoriteBooks.push(id);
          clickedElement.classList.add(select.class.favouriteBook);
        } else {
          favoriteBooks.splice(favoriteBooks.indexOf(id), 1);
          clickedElement.classList.remove(select.class.favouriteBook);
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

  };
  renderLibrary();
  initActions();
}
