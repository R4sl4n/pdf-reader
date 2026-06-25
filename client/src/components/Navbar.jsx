import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav style={{ 
      background: 'rgba(0,0,0,0.4)', 
      backdropFilter: 'blur(10px)',
      padding: '8px 16px', 
      display: 'flex', 
      alignItems: 'center',
      gap: '8px',
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }}>
      <Link to="/" className="btn btn-dark">My Books</Link>
      <Link to="/upload" className="btn btn-dark">Upload Book</Link>
    </nav>
  )
}

export default Navbar