'use client';

import React from 'react'
import { motion } from 'framer-motion';
import styles from '../styles';
import { TitleText, TypingText } from '../components';
import StoryForm from '../components/StoryForm';
import { staggerContainer, fadeIn, planetVariants } from '../utils/motion';

export default function Form({ setFeedbackData, aiWaitingResponse }) {

  const [inputValue, setInputValue] = React.useState(null)

  if (inputValue?.mainCharacter && inputValue?.plot) {
    setFeedbackData(inputValue)
  }

  return (
    <section className={`${styles.paddings} relative z-10`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
      >

        <motion.div
          variants={fadeIn('right', 'tween', 0.2, 1)}
          className="flex-[0.75] flex justify-center flex-col"
        >
          {
            inputValue?.mainCharacter && inputValue?.plot ? (
              <div className='flex flex-col'>
                <h4 className='font-bold sm:text-[24px] text-[18px] sm:leading-[32px] leading-[24.32px] text-white'>{aiWaitingResponse}</h4>
                <img
                  src="/arrow-down.svg"
                  alt="arrow down"
                  className="w-[18px] h-[28px] object-contain mt-[28px]"
                />
              </div>
            ) : (
              <>
                <TypingText title="| Generate the story" />
                <TitleText title={<>Generator</>} />
                <div className="mt-[31px] flex flex-col max-w-[370px] gap-[24px]">
                  <StoryForm setInputValue={setInputValue} />
                </div>
              </>
            )
          }
        </motion.div>
        <motion.div
          variants={planetVariants('right')}
          className={`flex-1 ${styles.flexCenter}`}
        >
          <img
            src="/storycreator.jpeg"
            alt="story creator image"
            className="w-[90%] h-[90%] object-contain rounded-[100px]"
          />
        </motion.div>
      </motion.div>
    </section>

  )
}