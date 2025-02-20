const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM


import { Team } from "./cmps/AboutCmps/Team.jsx"
import { Vision } from "./cmps/AboutCmps/Vision.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { NotFound } from "./cmps/NotFound.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { Home } from "./pages/Home.jsx"


export function App() {

    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main className="main-layout">
                    <Routes>
                        {/* <Route path="/" element={<Navigate to="/home" />} /> */}
                        <Route path="/" element={<Home/>} />
                        {/* <Route path="/home" element={<Home />} /> */}
                        <Route path="/about" element={<AboutUs />} />
                            {/* <Route path="/about/team" element={<Team />} />
                            <Route path="/about/vision" element={<Vision />} /> */}
                        {/* </Route> */}
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                        <Route path="/book/edit/:bookId" element={<BookEdit />} />
                        <Route path="/book/edit" element={<BookEdit />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <UserMsg/>
            </section>
        </Router>
    )
}


/**

<section className="app">
    <AppHeader onSetPage={page => setPage(page)} />

    <main className="main-layout">
        {page === 'home' && <Home />}
        {page === 'about' && <About />}
        {page === 'car' && <CarIndex />}
    </main>
</section>
*/