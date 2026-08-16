import React from 'react';
import uber from '../assets/uber.png';
import bg from '../assets/uber-bg.png';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Home = () => {
  const navigate = useNavigate();
  const { user, captain, logoutUser, logoutCaptain } = useUser();

  const handleLogout = () => {
    if (user) {
      logoutUser();
    } else if (captain) {
      logoutCaptain();
    }
    navigate('/');
  };

  if (user || captain) {
    return (
      <div
        className='flex h-screen w-full flex-col justify-between bg-cover bg-center pt-5'
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className='flex items-center justify-between px-6'>
          <img className='w-14' src={uber} alt='Uber Logo' />
          <button
            onClick={handleLogout}
            className='rounded-md bg-black px-6 py-2 text-lg font-semibold text-white hover:bg-gray-800'
          >
            Logout
          </button>
        </div>

        <div className='bg-white px-6 pb-8 pt-4'>
          <h2 className='mb-4 text-3xl font-bold'>
            {user ? 'Welcome Rider' : 'Welcome Driver'}
          </h2>
          <p className='text-lg text-gray-600'>
            {user ? 'Ready for a ride?' : 'Ready to drive?'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className='flex h-screen w-full flex-col justify-between bg-cover bg-center pt-5'
      style={{ backgroundImage: `url(${bg})` }}
    >
      <img className='ml-5 w-18' src={uber} alt='Uber Logo' />

      <div className='bg-white px-6 pb-8 pt-4'>
        <h2 className='text-3xl font-bold'>Get Started With Uber</h2>

        <Link
          to='/login'
          className='mt-4 flex w-full items-center justify-center rounded-md bg-black py-3 text-xl font-semibold text-white'
        >
          Continue as Rider
        </Link>

        <Link
          to='/captain-login'
          className='mt-3 flex w-full items-center justify-center rounded-md border border-black bg-white py-3 text-xl font-semibold text-black'
        >
          Continue as Driver
        </Link>
      </div>
    </div>
  );
};

export default Home;