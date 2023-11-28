import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Login from "./components/Login"
import { useApolloClient, useQuery } from "@apollo/client"

import { ALL_AUTHORS, ALL_BOOKS } from "./queries"

const App = () => {
  const [page, setPage] = useState("authors")
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
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

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
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

      <Books show={page === "books"} books={books} />

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
    </div>
  )
}

export default App
