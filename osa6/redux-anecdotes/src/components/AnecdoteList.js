import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { invokeNotification, deprecateNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()


  const voteAction = (id) => {
    dispatch(vote(id))
    const anecdote = anecdotes.find(n => n.id === id)
    dispatch(invokeNotification(`you voted \'${anecdote.content}\'`))
    setTimeout(() => {
      dispatch(deprecateNotification('it doesnt matter what a user sends here'))
    }, 5000)
  }



  return (
    <div>
      {anecdotes
        .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => voteAction(anecdote.id)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
    )
}

export default AnecdoteList