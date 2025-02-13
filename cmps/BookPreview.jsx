
export function BookPreview({ book }) {

    let onSaleclass = book.listPrice.isOnSale ? 'onSale' : ''
    return (
        <article className="book-preview">
            <h2>Title: {book.title}</h2>
            <h4>Book Price: {book.listPrice.amount}$</h4>
            <div className="imgSale">
                <img src="../assets/img/Book.png" alt="book-image" />
                {book.listPrice.isOnSale && <h4 className={`${onSaleclass}`}>On Sale!</h4>}
            </div>
        </article>
    )
}