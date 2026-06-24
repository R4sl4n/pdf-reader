import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
    <nav style={{ 
      background: 'rgba(0,0,0,0.5)', 
      backdropFilter: 'blur(10px)',
      padding: '16px 24px', 
      display: 'flex', 
      gap: '12px',
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }}>
      <Link to="/" className="btn btn-dark">Книги</Link>
      <Link to="/upload" className="btn btn-dark">Загрузка</Link>
    </nav>
  )
}

export default Navbar