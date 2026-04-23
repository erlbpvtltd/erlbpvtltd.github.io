import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setshowLogin}) => {

  const [menu, setMenu] = useState("home")

  const navigate = useNavigate();

  const {getTotalAmount, token, setToken} = useContext(StoreContext)

  const LogOut = () => {
    setToken("")
    localStorage.removeItem('token')
    navigate('/')
  }

  const navItems = [
    { label: "home",       href: "/",              type: "link",  target: "home"      },
    { label: "menu",       href: "#explore-menu",  type: "anchor", target: "menu"     },
    { label: "mobile-app", href: "#app-download",  type: "anchor", target: "mobile-app"},
    { label: "contact-us", href: "#footer",        type: "anchor", target: "contact-us"},
  ]

  return (
    <div className='navbar py-[20px] flex justify-between items-center'>

      {/* Logo */}
      <Link to='/'>
        <img src={assets.logo} alt="logo" className='logo w-[50px]' />
      </Link>

      {/* Nav Links — each item gets a staggered fade-in via inline style */}
      <ul className="navbar-option flex justify-center items-center gap-[20px] text-[18px] text-[#49557e]">
        {navItems.map(({ label, href, type, target }, i) =>
          type === "link" ? (
            <Link
              key={label}
              to={href}
              onClick={() => setMenu(target)}
              className={menu === target ? "active" : ""}
              style={{ animation: `slideDown 0.5s ${0.08 * (i + 1)}s cubic-bezier(0.16,1,0.3,1) both` }}
            >
              {label}
            </Link>
          ) : (
            <a
              key={label}
              href={href}
              onClick={() => setMenu(target)}
              className={menu === target ? "active" : ""}
              style={{ animation: `slideDown 0.5s ${0.08 * (i + 1)}s cubic-bezier(0.16,1,0.3,1) both` }}
            >
              {label}
            </a>
          )
        )}
      </ul>

      {/* Right side */}
      <div className="navbar-right flex justify-center items-center gap-6">

        {/* Search icon */}
        <img src={assets.search_icon} alt="search" className="cursor-pointer" />

        {/* Cart */}
        <div className='navbar-search-icon relative'>
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="basket" />
          </Link>
          <div className={
            getTotalAmount() === "0.00"
              ? ""
              : 'dot absolute top-[-8px] right-[-7px] bg-[tomato] min-w-[10px] min-h-[10px] rounded-[5px]'
          }></div>
        </div>

        {/* Auth */}
        {!token ? (
          <button
            onClick={() => setshowLogin(true)}
            className='sign-in text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
          >
            Sign in
          </button>
        ) : (
          <div className='navbar-profile cursor-pointer'>
            <img src={assets.profile_icon} alt="profile" />
            <ul className='nav-profile-dropdown'>
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={LogOut}>
                <img src={assets.logout_icon} alt="logout" />
                <p>LogOut</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
