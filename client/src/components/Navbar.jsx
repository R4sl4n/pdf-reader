import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  // выход из аккаунта
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/auth')
  }

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
      <div style={{ marginLeft: 'auto' }}>
        <button className="btn btn-dark" onClick={logout}>Logout</button>
      </div>
    </nav>
  )
}

export default Navbar