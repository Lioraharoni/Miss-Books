import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'BOOK_DB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => 
        {
            console.log("query filterby=", filterBy);
            console.log("books", books)
            if (filterBy.title) {
                console.log("query filterby TITLE=", filterBy);
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }

            if (filterBy.maxPrice) {
                books = books.filter(book => book.listPrice.amount <= filterBy.maxPrice)
            }
            console.log("query books =", books);
            
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        // .then(_setNextPrevCarId)
}

function remove(bookId) {
    console.log("bookService remove book ", bookId);
    
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', listPrice = {amount:'', currencyCode: "EUR", isOnSale: false}) {
    return { title, listPrice }
}


function getDefaultFilter() {
    // return { title: '', price: '' }
    return { title: '', maxPrice:''}
}


// function _setNextPrevCarId(car) {
//     return query().then((cars) => {
//         const carIdx = cars.findIndex((currCar) => currCar.id === car.id)
//         const nextCar = cars[carIdx + 1] ? cars[carIdx + 1] : cars[0]
//         const prevCar = cars[carIdx - 1] ? cars[carIdx - 1] : cars[cars.length - 1]
//         car.nextCarId = nextCar.id
//         car.prevCarId = prevCar.id
//         return car
//     })
// }

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = _createDemoBooks()
        saveToStorage(BOOK_KEY, books)
    }
}

// function _createCar(vendor, speed = 250) {
//     const car = getEmptyCar(vendor, speed)
//     car.id = makeId()
//     return car
// }

function _createDemoBooks() {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    const books = []
    for (let i = 0; i < 20; i++) {
        const book = {
        id: utilService.makeId(),
        title: utilService.makeLorem(2),
        subtitle: utilService.makeLorem(4),
        authors: [
        utilService.makeLorem(1)
        ],
        publishedDate: utilService.getRandomIntInclusive(1950, 2024),
        description: utilService.makeLorem(20),
        pageCount: utilService.getRandomIntInclusive(20, 600),
        categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
        thumbnail: `http://coding-academy.org/books-photos/${i+1}.jpg`,
        language: "en",
        listPrice: {
            amount: utilService.getRandomIntInclusive(80, 500),
            currencyCode: "EUR",
            isOnSale: Math.random() > 0.7
            }
        }
        books.push(book)
    }
    console.log('books', books)
    return books
    }