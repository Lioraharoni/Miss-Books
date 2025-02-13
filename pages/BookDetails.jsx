
import { LongTxt } from "../cmps/LongTxt.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    console.log('Details render')

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        console.log('loadBook')
        setBook(null)
        bookService.get(params.bookId)
            .then(setBook) // () => setBook(data => {...data}) ?? 
            .catch(err => {
                console.log('Cannot load book:', err)
            })
    }

    function onBack() {
        navigate('/book')
        // navigate(-1)
    }

    function getReadingLevel()
    {
        if(book.pageCount > 500)
        {
            return 'Serious Reading'
        }
        else if(book.pageCount > 200)
        {
            return 'Decent Reading'
        }
        else
        {
            return 'Light Reading'

        }
    }

    function getDateLevel()
    {
        let currentYear = new Date().getFullYear()
        if(currentYear - book.publishedDate > 10)
            return 'Vintage'
        else if (currentYear - book.publishedDate < 1)
            return 'New'
        else //??
        return ''
    }


    function getPriceClass()
    {
        if(book.listPrice.amount > 150)
            return "expensive"
        else if (book.listPrice.amount < 20)
            return "cheap"

        return ""
    }

    if (!book) return <div className="loader">Loading...</div>

    let bookNum = 10
    let dateLevel = getDateLevel()
    console.log("price class =", getPriceClass());
    

    return(
        <section className="book-details">
            <h2>{book.title}</h2>
            <img src={`../assets/img/BooksImages/${bookNum}.jpg`} alt="book-image" />
            <h2>Description:</h2>
            <LongTxt txt={book.description} length={20}/>
            <h2 className={getPriceClass()}>Price: {book.listPrice.amount}$</h2>
            {book.listPrice.isOnSale && <img className="onSale" src={`../assets/img/onSale.png`} alt="On Sale!" />}
            <h2>Book Level: {getReadingLevel()}</h2>
            {dateLevel && <h2>{dateLevel}</h2>}
            
            <button onClick={onBack}>Back</button>
            {/* <section>
                <button ><Link to={`/car/${car.prevCarId}`}>Prev Car</Link></button>
                <button ><Link to={`/car/${car.nextCarId}`}>Next Car</Link></button>
            </section> */}
        </section>
    )
}