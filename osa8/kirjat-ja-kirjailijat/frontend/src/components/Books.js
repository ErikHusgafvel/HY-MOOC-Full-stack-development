import { useState } from "react"

const Books = ({ show, books, setGenre, genre }) => {
  if (!show) {
    return null
  }

  if (books.loading) {
    return (
      <div>
        <h2>books</h2>
        loading...
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>
      in genre <b>{genre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {genre === "all"
            ? books.data.allBooks.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))
            : books.data.allBooks
                .filter((book) => book.genres.includes(genre))
                .map((a) => (
                  <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                  </tr>
                ))}
        </tbody>
      </table>
      {books.data.allBooks
        .flatMap((book) => book.genres)
        .filter((value, index, array) => array.indexOf(value) === index)
        .map((genre) => {
          return (
            <button key={genre} onClick={() => setGenre(genre)}>
              {genre}
            </button>
          )
        })}
      <button onClick={() => setGenre("all")}>all</button>
    </div>
  )
}

export default Books
