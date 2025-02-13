
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const { bookId } = useParams()
    console.log("BookEdit bookId", {bookId});
    
    useEffect(() => {
        if (bookId) loadBook()
    }, [bookId])

    function loadBook() {
        setIsLoading(true)
        bookService.get(bookId)
            .then((bookToEdit) => {
                setBookToEdit(bookToEdit)
                console.log("book to edit=", bookToEdit);
                

            })
            .catch(err => {
                console.log('Cannot load book:', err)
            })
            .finally(() => setIsLoading(false))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(bookToSave => {
                console.log(`Book (${bookToSave.id}) Saved!`)
            })
            .catch(err => {
                console.log('Cannot save book:', err)
            })
            .finally(() => navigate('/book'))
    }


    function handleChange({ target }) {
        let { value, name: field } = target
        switch (target.type) {
            case 'range':
            case 'number':
                value = +target.value
                break
            case 'checkbox':
                value = target.checked
                break
        }
        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }

    function handlePriceChange({ target }) {
        let { value, name: field } = target

        console.log("value=", value, "field=", field, "target=", target);
        console.dir(target)
        let listPrice ={}
        listPrice = bookToEdit.listPrice
        listPrice[target.name] = value

        // switch (target.name) {
        //     case 'amount':
        //         listPrice = bookToEdit.listPrice
        //         listPrice.amount = value
        //         break;
        //     case 'isOnSale':
        //         listPrice = bookToEdit.listPrice
        //         listPrice.isOnSale = value
        //         break;
        // }
        setBookToEdit((prevBook) => ({ ...prevBook, "listPrice" : listPrice }))
    }



    const loadingClass = isLoading ? 'loading' : ''
    return (
        <section className={`book-edit ${loadingClass}`}>
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            {bookId && bookToEdit && <img src={bookToEdit.thumbnail} alt="book-edit-image" />}
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title:</label>
                <input value={bookToEdit.title} onChange={handleChange} type="text" name="title" id="title" />

                <label htmlFor="subtitle">Subtitle:</label>
                <input value={bookToEdit.subtitle} onChange={handleChange} type="text" name="subtitle" id="subtitle" />

                <label htmlFor="description">Description:</label>
                <textarea rows="5" cols="80" value={bookToEdit.description} onChange={handleChange} type="text" name="description" id="description"></textarea>

                <label htmlFor="amount">Price</label>
                <input value={bookToEdit.listPrice.amount} onChange={handlePriceChange} type="number" name="amount" id="amount" /> 

                <label htmlFor="isOnSale">On Sale:</label>
                <input value={bookToEdit.listPrice.isOnSale} onChange={handlePriceChange} type="checkbox" name="isOnSale" id="isOnSale" /> 

                <section className="btns flex">
                    <button>Save</button>
                    <button type="button" className="back-btn" ><Link to="/book">Back</Link></button>
                </section>
            </form>
        </section>
    )

}