// import { carService } from "../services/car.service.js"

const { useState, useEffect } = React


export function BookFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

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
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    // function handleChangePrimitive({ target }) {
    //     const value = target.value
    //     const field = target.name
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    // }

    // function handleTxtChange(ev) {
    //     const value = ev.target.value
    // setFilterByToEdit(prevFilter => ({ ...prevFilter, txt: value }))
    // }

    // function handleMinSpeedChange(ev) {
    //     const value = ev.target.value
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, minSpeed: value }))
    // }

    const { title, maxPrice } = filterByToEdit
    // const { title, minSpeed } = filterByToEdit
    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form>
                <label htmlFor="title">Title</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />

                <label htmlFor="maxPrice">Max Price</label>
                <input onChange={handleChange} value={maxPrice || ''} type="number" name="maxPrice" id="maxPrice" />

                <button>Submit</button>
            </form>
        </section>
    )
}