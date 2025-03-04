import './App.css'
import {Link} from 'react-router-dom'

function App() {

  return (
    <>
      <h1>Home</h1>
      <div className='links'>
          <Link to='/login' className='link'>Login </Link>
          <Link to='/dashboard' className='link'>Dashboard </Link>
          <Link to='/worker-panel' className='link'>Worker-panel </Link>
          <Link to='/material-requests' className='link'>MaterialRequests </Link>
          <Link to='/task-management' className='link'>TaskManagement </Link>
          <Link to='/reports' className='link'>Reports</Link>
      </div>
    </>
  )
}

export default App