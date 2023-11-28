import BirthyearForm from "./SetBirthyear"
import Notify from "./Notify"

const Authors = ({ show, authors, errorMessage, setError }) => {
  if (!show) {
    return null
  }

  if (authors.loading) {
    return (
      <div>
        <h2>authors</h2>
        loading...
      </div>
    )
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthyearForm authors={authors} setError={setError} />
    </div>
  )
}

export default Authors
