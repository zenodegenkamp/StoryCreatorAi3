'use client';

import { motion } from 'framer-motion';
import { socials } from '../constants';

import styles from '../styles';
import { footerVariants } from '../utils/motion';
const Footer = () => (
  <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
    <div className="footer-gradient" />
    <div className={`${styles.innerWidth} mx-auto flex flex-col gap-2`}>
      <div className="flex items-center justify-between flex-wrap gap-5">
        <h4 className="font-bold md:text-[64px] text-[44px] text-white">
          Start your Journey
        </h4>
        <button type="button" class="flex items-center h-fit py-6 px-8 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-normal text-[24px] rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 rounded-[32px] gap-[12px]"><a className='text-[24px]' href="/storyCreator">Create magic</a></button>
      </div>

      <div className='flex flex-col'>
        <div className="mb-[50px] h-[2px] bg-white opacity-10" />
      </div>
      <div className="flex flex-row flex-wrap justify-between">
      <h4 className="font-extrabold text-[24px] text-white">
            StoryCreator AI
          </h4>
          <p className="font-normal text-[14px] text-white opacity-50">
            Copyright © 2023 Zeno Degenkamp. All rights reserved.
          </p>

          <div className="flex gap-4">
            {socials.map((social) => (
              <img
                key={social.name}
                src={social.url}
                alt={social.name}
                className="w-[24px] h-[24px] object-contain cursor-pointer"
              />
            ))}
          </div>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
