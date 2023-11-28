import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Login from "./components/Login"
import Recommendations from "./components/Recommendations"
import { useApolloClient, useQuery } from "@apollo/client"

import { ALL_AUTHORS, ALL_BOOKS, ME } from "./queries"

const App = () => {
  const [page, setPage] = useState("authors")
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(
    localStorage.getItem("library-user-token")
      ? localStorage.getItem("library-user-token")
      : null
  )
  const [genre, setGenre] = useState("all")
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const me = useQuery(ME)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("authors")
  }

  const handleClick = (genreToChange) => {
    setGenre(genreToChange)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={() => logout()}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors
        show={page === "authors"}
        authors={authors}
        errorMessage={errorMessage}
        setError={notify}
      />

      <Books
        show={page === "books"}
        books={books}
        setGenre={handleClick}
        genre={genre}
      />

      <Login
        show={page === "login"}
        errorMessage={errorMessage}
        setToken={setToken}
        notify={notify}
        setPage={setPage}
      />

      <NewBook
        show={page === "add"}
        errorMessage={errorMessage}
        setError={notify}
      />

      <Recommendations show={page === "recommend"} books={books} me={me} />
    </div>
  )
}

export default App
