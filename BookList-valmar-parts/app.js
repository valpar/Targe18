const form = document.querySelector('#task-form')
const titleInput = document.querySelector('#title')
const authorInput = document.querySelector('#author')
const bookList = document.querySelector('.collection')
const filter = document.querySelector('#filter')
const clearBtn = document.querySelector('.clear-tasks')

const addTask = (event) => {
    
	event.preventDefault()

	if (titleInput.value === '' || authorInput.value === '') {
		alert('Make sure title and author are written!')
		return
	}

	//create li element
	const li = document.createElement('li')
	const pTitle = document.createElement('p')
	const pAuthor = document.createElement('p')
	li.className = 'collection-item'
	pTitle.className = 'title'
	pAuthor.className = 'author'
	li.appendChild(pTitle).appendChild(document.createTextNode(titleInput.value))
	li.appendChild(pAuthor).appendChild(document.createTextNode(authorInput.value))

	const removeLink = document.createElement('a')
	removeLink.className = 'delete-item secondary-content'
	removeLink.innerHTML = 'X'
	removeLink.setAttribute('style', 'cursor:pointer;')
	li.appendChild(removeLink)

	//add li to ul.collection
	bookList.appendChild(li)

	//store book in local storage
	const book = {
		title: titleInput.value,
		author: authorInput.value
	}

	storeInLocalStorage(book);

	//clear inputs
	titleInput.value = '';
	authorInput.value = '';
    
}

/**
 * Storing books in localstorage
 */
const storeInLocalStorage = (book) => {

	//declare an array to read from local storage
	let books;

	if(localStorage.getItem('books') === null) {

		books = []

	} else {

		books = JSON.parse(localStorage.getItem('books'))

	}

	//add book to local storage
	books.push(book)
	localStorage.setItem('books', JSON.stringify(books))

}

/**
 * Gets books from localstorage and displays on screen
 */
const getBooks = () => {

	let books;

	if(localStorage.getItem('books') === null) {

		books = [];

	} else {

		books = JSON.parse(localStorage.getItem('books'));

	}

	books.forEach((book, index) => {
		//create li element
		const li = document.createElement('li')
		const pTitle = document.createElement('p')
		const pAuthor = document.createElement('p')
		li.className = 'collection-item'
		pTitle.className = 'title'
		pAuthor.className = 'author'
		li.appendChild(pTitle).appendChild(document.createTextNode(book.title))
		li.appendChild(pAuthor).appendChild(document.createTextNode(book.author))
		li.setAttribute('data-index', index)

		const removeLink = document.createElement('a')
		removeLink.className = 'delete-item secondary-content'
		removeLink.innerHTML = 'X'
		removeLink.setAttribute('style', 'cursor:pointer;')
		li.appendChild(removeLink)

		//add li to ul.collection
		bookList.appendChild(li)

	});

}

/**
 *Removes book from list and localstorage
 */
const removeFromLocalStorage = (bookIndex) => {

	let books;

	if(localStorage.getItem('books') === null){

		books =  [];

	} else {

		books = JSON.parse(localStorage.getItem('books'));

	}

	books.splice(bookIndex, 1)	

	localStorage.setItem('books', JSON.stringify(books));

}

const removeBook = (event) => {

	if(event.target.classList.contains('delete-item')) {
			
		if(confirm('Are you sure?')) {

			event.target.parentElement.remove()
			removeFromLocalStorage(event.target.parentElement.getAttribute('data-index'))

		}

	}

}

/**
 * Filter Books
 */

function filterBooks(event) {

	const text = event.target.value.toLowerCase();

	document.querySelectorAll('.collection-item').forEach(book => {

		const bookValue = book.firstChild.textContent;

		if (bookValue.toLowerCase().indexOf(text) != -1) {

			book.style.display = 'grid';

		} else {

			book.style.display = 'none';

		}

	});

}

/**
 * Clear bookList of items and clear localStorage
 */

const clearBooksFromLocalStorage = () => {

	localStorage.clear();

}

const clearBooks = () => {
	
	while (bookList.firstChild) {

		bookList.removeChild(bookList.firstChild);

	}

	clearBooksFromLocalStorage();
}

const loadEventListeners = () => {
		
	document.addEventListener('DOMContentLoaded', getBooks);
	form.addEventListener('submit', addTask)
	bookList.addEventListener('click', removeBook)
	clearBtn.addEventListener('click', clearBooks);
	filter.addEventListener('keyup', filterBooks);
    
}

loadEventListeners()