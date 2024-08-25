import { useContext, useState } from "react";
import logo from "../../assets/freshcart-logo.svg";
import menu from "../../assets/menu.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";
import { WishContext } from "../../Context/WishContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { accessToken, setAccessToken } = useContext(AuthContext);
  const { numOfCartItems } = useContext(CartContext);
  const { wishlistCount } = useContext(WishContext);
  const navigate = useNavigate();
  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function handleLogout() {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-gray-200 p-4 static lg:fixed top-0 end-0 start-0 z-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center flex-col lg:flex-row">
            <div className="flex items-center flex-col lg:flex-row">
              <Link to={""}>
                <img src={logo} alt="Fresh Cart Logo" />
              </Link>

              <span className="lg:hidden">
                <img
                  src={menu}
                  className="w-12 cursor-pointer block"
                  alt="Menu"
                  onClick={toggleMenu}
                />
              </span>
              {accessToken && (
                <ul
                  className={`flex flex-col lg:flex-row items-center ${
                    menuOpen ? "block" : "hidden"
                  } lg:flex`}
                >
                  <li className="my-2 lg:my-0">
                    <NavLink className={"p-2"} to={""}>
                      Home
                    </NavLink>
                  </li>
                  <li className="my-2 lg:my-0">
                    <NavLink className={"p-2"} to={"/products"}>
                      Products
                    </NavLink>
                  </li>
                  <li className="my-2 lg:my-0">
                    <NavLink className={"p-2"} to={"/categories"}>
                      Categories
                    </NavLink>
                  </li>
                  <li className="my-2 lg:my-0">
                    <NavLink className={"p-2"} to={"/brands"}>
                      Brands
                    </NavLink>
                  </li>
                  <li className="my-2 lg:my-0">
                    <NavLink className={"p-2"} to={"/cart"}>
                      <button
                        type="button"
                        className="relative inline-flex items-center p-3 text-sm font-medium text-center rounded-lg  focus:ring-2 focus:outline-none focus:ring-green-400"
                      >
                        <i className="fas fa-cart-shopping text-2xl"></i>
                        <span className="sr-only">Notifications</span>
                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                          {numOfCartItems}
                        </div>
                      </button>
                    </NavLink>
                  </li>
                  <li className="my-2 lg:my-0">
                    <NavLink className={"p-2"} to={"/wishlist"}>
                      <button
                        type="button"
                        className="relative inline-flex items-center p-3 text-sm font-medium text-center rounded-lg  focus:ring-2 focus:outline-none focus:ring-green-400"
                      >
                        <i className="fas fa-heart text-2xl"></i>
                        <span className="sr-only">Notifications</span>
                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                          {wishlistCount}
                        </div>
                      </button>
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>
            <div>
              <ul className={`flex flex-col lg:flex-row items-center lg:flex`}>
                {accessToken ? (
                  <>
                    <li className="my-2 lg:my-0">
                      <Link
                        className={"p-2"}
                        to={"/login"}
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="my-2 lg:my-0">
                      <NavLink className={"p-2"} to={"/login"}>
                        Login
                      </NavLink>
                    </li>
                    <li className="my-2 lg:my-0">
                      <NavLink className={"p-2"} to={"/register"}>
                        Register
                      </NavLink>
                    </li>
                  </>
                )}

                <li className="my-2">
                  <a
                    target="_blank"
                    href="https://facebook.com"
                    className="fab fa-facebook mx-2 hover:text-green-500 hover:transition-all"
                  ></a>
                  <a
                    target="_blank"
                    href="https://twitter.com"
                    className="fab fa-twitter mx-2 hover:text-green-500 hover:transition-all"
                  ></a>
                  <a
                    target="_blank"
                    href="https://youtube.com"
                    className="fab fa-youtube mx-2 hover:text-green-500 hover:transition-all"
                  ></a>
                  <a
                    target="_blank"
                    href="https://instagram.com"
                    className="fab fa-instagram mx-2 hover:text-green-500 hover:transition-all"
                  ></a>
                  <a
                    target="_blank"
                    href="https://tiktok.com"
                    className="fab fa-tiktok mx-2 hover:text-green-500 hover:transition-all"
                  ></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
