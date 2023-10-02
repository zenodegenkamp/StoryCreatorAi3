'use client';

import { motion } from 'framer-motion'

import styles from '../styles'
import { navVariants } from '../utils/motion'

const Menu = () => (

  <div className='hidden md:flex flex gap-9 text-[16px] leading-[22px] text-white cursor-pointer sm text-base sm:text-sm md:text-md lg:text-lg xl:text-xl'>
    <p><a href="/">Home</a></p>
    <p><a href="/#aboutUs">About</a></p>
    <p><a href="/#explore">Explore</a></p>
    <p><a href="/#getStarted">Get Started</a></p>
  </div>
)
export default function Navbar(){

  return (
  <motion.nav
    variants={navVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
    <div className='absolute w-[35%] inset-0 gradient-01' />
    <div className={`${styles.innerWidth} mx-auto flex justify-between items-center gap-8`}>
    <h2 className='font-extrabold text-[24px] leading-[30px] text-white'>
        StoryCreator AI

      </h2>
    <Menu />
     <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"><a href="/storyCreator">Create magic</a></button>

    </div>
  </motion.nav>
);
}
  

