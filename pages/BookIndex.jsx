import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { showErrorMsg } from "../services/event-bus.service.js";

const { useEffect, useState } = React
const { Link } = ReactRouterDOM



export function BookIndex() {

console.log("Book Index ");

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then( (data) =>{
                setBooks(data)
                console.log("loadBooks", data)
            })                          
            .catch(err => {
                console.log('Cannot get books:', err)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
                showSuccessMsg(`Book ${bookId} successfully removed`)

            })
            .catch(err => {
                console.log('Cannot remove book:', err)
                showErrorMsg(`Failed to remove book ${bookId}`)
            })
    }

    function onSetFilter(filterBy) {
        // console.log('filterBy:', filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!books) return <div className="loader">Loading...</div>
    return (
        <section className="book-index">
            <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <Link to="/book/edit">Add Book</Link>
            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />
        </section>
    )

}