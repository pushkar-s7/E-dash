import { Link,useNavigate } from 'react-router-dom';

const Nav = () => {
   const navigate = useNavigate();
    const auth = localStorage.getItem("users");

    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }
    return (
        <div>
            { auth ?
                <ul className='nav-ul'>
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/add">Add Product</Link></li>
                    <li><Link to="/update/:id">Update Product</Link></li>
                    <li><Link onClick={logout} to={'/signup'}>Logout ({JSON.parse(auth).name})</Link></li>
                </ul>
                :
                <ul className='nav-ul nav-right'>
                    <>
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                </ul>

            }
        </div>
    )
}
export default Nav;