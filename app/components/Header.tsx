import React from 'react'

interface Props {
    title: string;
}


const Header = ({ title = ""}: Props) => {
  return (
    <header className='header'>
        <h2>{title}</h2>
    </header>
  )
}

export default Header