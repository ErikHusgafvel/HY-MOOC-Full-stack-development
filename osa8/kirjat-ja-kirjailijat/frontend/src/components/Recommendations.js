import { useState } from "react"

const Recommendations = ({ show, books, me }) => {
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
      <h2>recommendations</h2>
      books in your favorite genre <b>{me.data.me.favoriteGenre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks
            .filter((book) => book.genres.includes(me.data.me.favoriteGenre))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
