'use client';

import { motion } from 'framer-motion'
import { TypingText } from '../components';

import styles from '../styles'
import {fadeIn, staggerContainer} from '../utils/motion'

const About = () => (
  <section id="aboutUs" className={`${styles.paddings} relative z-10 `}>

    <div className='gradient-02 z-0'></div>
    <motion.div 
    variants={staggerContainer} 
    initial='hidden' 
    whileInView="show" 
    viewport={{once: false, amount: 0.25}}
    className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText 
      title="| About StoryCreator AI"
      textStyles="text-center"
      />

      <motion.p
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
      >
        Imagine your children embarking on journeys to distant galaxies, enchanting kingdoms, or even worlds that exist only in dreams. With AI Story Creator, we bring those dreams to life. Our intelligent algorithms weave words, characters, and adventures in ways you never thought possible, resulting in unique, captivating, and heartwarming stories that will fuel your children's imagination.
      </motion.p>

      <motion.img
        variants={fadeIn('up', 'tween', 0.5, 1)}
        src="/arrow-down.svg"
        alt="arrow down"
        className="w-[18px] h-[28px] object-contain mt-[28px]"
      />
    </motion.div>
  </section>
);

export default About;
