import React from 'react'
import Link from 'next/link'
import { Quicksand } from 'next/font/google'

const quickSand = Quicksand({ subsets: ['latin'], weight: ['300', '400', '500', '700']})


const CMSNavbar = () => {
  return (
    <div className='flex justify-between items-center py-1 px-5 font-bold'>
         <Link href="/">
          <div className={`${quickSand.className}`}>Bombarda</div>
        </Link>
    </div>
  )
}

export default CMSNavbar