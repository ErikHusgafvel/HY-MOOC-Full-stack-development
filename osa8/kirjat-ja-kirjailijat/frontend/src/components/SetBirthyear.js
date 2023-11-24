import { useState } from "react"
import { useMutation } from "@apollo/client"

import { EDIT_AUTHOR } from "../mutations"

const BirthyearForm = () => {
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
        <div>
          name{" "}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born{" "}
          <input
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
