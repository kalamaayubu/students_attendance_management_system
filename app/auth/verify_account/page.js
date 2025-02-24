import Link from 'next/link'
import React from 'react'

const VerifyAccount = () => {
  return (
    <div className='h-screen flex'>
    <div className='flex flex-col items-center m-auto'>
        <h4 className='text-[1.4rem] font-bold sm:text-[2.0rem'>✅ Account verified successfully</h4>
        <p>You can now <Link href={'/auth/login'} className='text-blue-800 hover:underline'>Login</Link></p>
    </div>
    </div>
  )
}

export default VerifyAccount