import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoWhite from '../../assets/images/logo-white.svg';
import { isLoggedIn, removeToken, getUserName, getUserProfile } from '../../auth';
import '../../styles/animation.css';

export default function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const dropdownRef = useRef(null);

  const loggedIn = isLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      setUsername(getUserName());
      setProfileImage(getUserProfile());
    }
  }, [loggedIn]);

  const openDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  }

  const handleLogout = () => {
    removeToken(); 
    navigate('/');
    window.location.reload();
  }

  const handleProtectedLinkClick = (event, path) => {
    if (!loggedIn) {
      event.preventDefault();
      alert("로그인이 필요해요!");
      navigate('/signin');
    } else {
      navigate(path);
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="w-full h-16 fixed top-0 left-0 z-20 py-3 bg-color-blue-main text-white text-xl flex justify-center items-center min-w-[48rem]">
      <div className='w-full flex justify-between items-center px-[128px] gap-12'>
        <Link className="w-14 hover-scale" to="/"><img src={logoWhite} alt='logo' /></Link>
        <div className='flex flex-row justify-between items-center w-full'>
          <div className="flex gap-8">
            <p className='font-cafe24 cursor-pointer hover-scale' 
               onClick={(e) => handleProtectedLinkClick(e, '/problem')}>
              Problem
            </p>
            <Link className='font-cafe24 hover-scale' to="/crew">
              Crew
            </Link>
          </div>

          {loggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <div className="justify-start items-center gap-6 inline-flex cursor-pointer"
                onClick={openDropdown}>
                <div className="justify-start items-center gap-3 flex cursor-pointer">
                  <p className="text-right text-white text-base font-medium cursor-pointer">{username} 님</p>
                </div>
                <img className="w-9 h-9 rounded-full object-cover" src={profileImage} alt="profile"/>
              </div>
              {dropdownVisible && (
                <div className="absolute top-full mt-2 p-4 bg-white opacity-90 border-color-gray-200 flex flex-col justify-start rounded-xl animate-drop-down">
                  <Link className="text-gray-600 text-sm whitespace-nowrap p-2 hover:text-color-blue-main" 
                  to="/myPortfolio">
                    마이 포트폴리오</Link>
                  <Link className="text-gray-600 text-sm whitespace-nowrap p-2 hover:text-color-blue-main" 
                  to="/myPage">
                    마이 페이지</Link>
                  <p className="text-gray-600 text-sm p-2 underline whitespace-nowrap cursor-pointer hover:text-color-blue-main"
                  onClick={handleLogout}>
                    로그아웃</p>
                </div>
              )}
            </div>
          ) : (
            <div className='flex gap-6'>
              <Link className="underline whitespace-nowrap hover-scale" to="/signin">sign in</Link>
              <Link className="whitespace-nowrap hover-scale" to="/signup">sign up</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}