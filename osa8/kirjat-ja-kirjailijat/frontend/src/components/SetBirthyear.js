import { useState } from "react"
import { useMutation } from "@apollo/client"

import { EDIT_AUTHOR } from "../mutations"

const BirthyearForm = ({ authors }) => {
  const [name, setName] = useState("")
  const [year, setYear] = useState("")

  const [changeYear] = useMutation(EDIT_AUTHOR)

  const submit = async (event) => {
    event.preventDefault()

    changeYear({ variables: { name, setBornTo: Number(year) } })

    setName("")
    setYear("")
  }

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        name
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.data.allAuthors.map((author) => (
            <option key={author.name} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <div>
          born{" "}
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default BirthyearForm
