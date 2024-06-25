import React from 'react'

interface Props {
    title: string;
}


const Header = ({ title }: Props) => {
  return (
    <header className='py-4 my-4 mx-10 text-2xl flex items-center justify-center border-b'>
        <h2>{title}</h2>
    </header>
  )
}

export default Header