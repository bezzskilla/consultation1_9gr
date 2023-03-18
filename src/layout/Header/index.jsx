import { NavLink, useNavigate } from 'react-router-dom'
import './index.css'
import { Search } from '../../components/Search/index'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../../redux/slices/user'

export const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector(state => state.user)

  const handleExit = () => {
    dispatch(removeUser())
    navigate('/signin')
  }


  return <header className='wrapper'>
    <div className='logo'>Logo</div>

    {token && <Search />}

    <div>
      <NavLink to="/products" className={({ isActive }) =>
        isActive ? "active" : ""
      } >
        Продукты
      </NavLink>
      <NavLink to="/user/me" className={({ isActive }) =>
        isActive ? "active" : ""
      } >
        Личный кабинет
      </NavLink>


      {token && <button onClick={handleExit}>Выход</button>}
    </div>
  </header>
}
