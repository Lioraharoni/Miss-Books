import { BookPreview } from "./BookPreview.jsx";
const { Link } = ReactRouterDOM

export function BookList({ books, onRemoveBook }) {

    const ulAttributes = {
        title: 'Some Pop Up',
        className: 'book-list'
    }
    
    return (
        <ul {...ulAttributes}>
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        <button onClick={() => onRemoveBook(book.id)}> Remove</button>
                        <Link to={`/book/${book.id}`}><button>Details</button></Link>
                        <Link to={`/book/edit/${book.id}`}><button>Edit</button></Link>
                    </section>
                </li>
            )}
        </ul>
    )
}