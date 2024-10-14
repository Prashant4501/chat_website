import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='flex felx-col justify-center items-center mix-w-full mx-auto'>
      <div className=' w-full p-6 flex rounded-lg shadow-lg
                   bg-gray-600 bg-clip-padding backdrop:filter
                    backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-bold text-center text-gray-600'>Login
          <span className='ml-1 text-gray-600'>Chatters</span>
          <form className='felx felx-col'>
            <div>
              <label className='label p-2' >
                <span className='font-bold text-xl label-text text-gray-950'>Email:</span></label>

              <input type="email"
                id='email'
                required
                className='text-xl bg-white'
                placeholder='Enter username'
              />
            </div>
            <div>
              <label className='label p-2'>
                <span className='font-bold text-xl label-text text-gray-950'>Password:</span>
              </label>

              <input type="password"
                id='password'
                required
                className='text-xl bg-white'
                placeholder='Enter password'
              />
            </div>
            <button type='submit'
              className='bg-black px-1 py-1 mr-1 mt-1 rounded-lg text-xl
  hover:bg-gray-500 hover:scale-105 w-auto self-center'>Login</button>
          </form>
          <div className='pt-2'>
            <p className=' text-sm font-semibold
            text-gray-800'>
              Don't have an account? <Link to={'/signup'}>
              <span className='text-gray-950 font-bold underline cursor-pointer
              hover:text-green-950'>Register Now!</span>
              </Link>
            </p>
          </div>
        </h1>

      </div>
    </div>
  )
}
export default Login
