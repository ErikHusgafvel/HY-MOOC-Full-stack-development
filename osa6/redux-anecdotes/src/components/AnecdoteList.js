import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()


  const voteAction = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(setNotification(`you voted \'${anecdote.content}\'`, 5))
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
              <button onClick={() => voteAction(anecdote)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
    )
}

export default AnecdoteList