import './App.css'
import {Link} from 'react-router-dom'

function App() {

  return (
    <>
      <h1 className='text-3xl font-bold m-8'>Home</h1>
      <div className='flex justify-around m-8'>
          <Link to='/login' className='bg-blue-500 rounded-full p-3 hover:bg-sky-300'>Login </Link>
          <Link to='/dashboard' className='bg-blue-500 rounded-full p-3 hover:bg-sky-300'>Dashboard </Link>
          <Link to='/worker-panel' className='bg-blue-500 rounded-full p-3 hover:bg-sky-300'>Worker-panel </Link>
          <Link to='/material-requests' className='bg-blue-500 rounded-full p-3 hover:bg-sky-300'>MaterialRequests </Link>
          <Link to='/task-management' className='bg-blue-500 rounded-full p-3 hover:bg-sky-300'>TaskManagement </Link>
          <Link to='/reports' className='bg-blue-500 rounded-full p-3 hover:bg-sky-300'>Reports</Link>
      </div>
    </>
  )
}

export default App