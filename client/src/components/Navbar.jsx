import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <Link to="/">My Books</Link>
      <Link to="/upload">Upload Book</Link>
    </nav>
  )
}

export default Navbar