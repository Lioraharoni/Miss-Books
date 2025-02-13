const {useState} = React

export function LongTxt({txt, length = 100}) {

    const [isFullText, setIsFullText]= useState(false)
    let isLong = txt.length > length



    function handleShowChange()
    {
        setIsFullText(prevIsFullText => !prevIsFullText)

    }

    function getCurrentTxtToDisplay()
    {
        console.log("isFullText", isFullText)
        console.log("isLong", isLong);
        
        if(!isFullText)
        {
            return txt.substring(0, length)
        }
        return txt
    }

    return (
        <section className="long-txt">
            <div className="txt-showing">
                <p>
                    {getCurrentTxtToDisplay()}
                </p>
                {isLong && !isFullText && <button onClick={() => handleShowChange()}>Show more</button>}
                {isLong && isFullText && <button onClick={() => handleShowChange()}>Show less</button>}
            </div>
        </section>       
    )
}