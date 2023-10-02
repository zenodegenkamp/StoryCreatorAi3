'use client';
import { fetchBotReply } from '../pages/api/hello'
import { fetchShortStory } from '../pages/api/hello'
import { fetchUrlForImage } from '../pages/api/hello'
import { fetchImage } from '../pages/api/hello'
import React from 'react'

import { motion } from 'framer-motion';

import styles from '../styles';
import { fadeIn, staggerContainer, zoomIn } from '../utils/motion';

export default function Output(props){

  console.log(props)
  const [aiResponse, setAiResponse] = React.useState(null)
  const [aiStory, setAiStory] = React.useState("")
  const [aiImage, setAiImage] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const mainCharacter = props.FeedbackData?.mainCharacter
  const plot = props.FeedbackData?.plot

 
  // console.log(mainCharacter)
  console.log(loading + " ik ben aan het loaden")
  console.log(mainCharacter + " ik ben de main char")
  console.log(plot + " ik ben de plot")

  if (aiResponse){
    props.setAiWaitingReponse(aiResponse)
  }

  React.useEffect(() => {
      async function fetchData() {
        try {
          if (mainCharacter){
            console.log(mainCharacter)
            const response = await fetchBotReply(mainCharacter);
            setAiResponse(response)
            setLoading(true)
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      fetchData();
    
    }, [mainCharacter]);

  React.useEffect(() => {
      setLoading(true)
  }, [])

  React.useEffect(() => {
      async function fetchStory (){

          try{

            if (mainCharacter && plot){

            
              const shortStory = await fetchShortStory(mainCharacter, props.FeedbackData?.plot)
              setAiStory(shortStory)
              const urlToImage = await fetchUrlForImage(shortStory)
              const image = await fetchImage(urlToImage)
              
              if (image){
                  setAiImage(image)
                  setLoading(false)
              }
          }
          } catch (error) {
              console.error('Error fetching other data:', error)
          }
      }
      if(loading){
          fetchStory()
      }
  }, [loading, mainCharacter, plot])




  return (
    <section className={`${styles.paddings}`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-6`}
    >
      <motion.div
        variants={fadeIn('right', 'tween', 0.2, 1)}
        className="flex-[2] lg:max-w-[700px] flex justify-end flex-col gradient-05 sm:p-8 p-4 rounded-[32px] border-[1px] border-[#6A6A6A] relative"
      >
        <div className="feedback-gradient" />
        <div>
          <h4 className="font-bold sm:text-[32px] text-[26px] sm:leading-[40.32px] leading-[36.32px] text-white">
            {mainCharacter}
          </h4>
          <p className="mt-[8px] font-normal sm:text-[18px] text-[12px] sm:leading-[22.68px] leading-[16.68px] text-white">
            {plot}
          </p>
        </div>

        <p className="mt-[24px] font-normal sm:text-[24px] text-[18px] sm:leading-[45.6px] leading-[39.6px] text-white flex-2">
          {aiStory}
        </p>
      </motion.div>

      <motion.div
        variants={fadeIn('left', 'tween', 0.2, 1)}
        className="relative flex-1 flex justify-center items-center"
      >
        <img
          src={aiImage}
          alt="ai Image"
          className="w-full lg:h-[610px] h-auto min-h-[210px] object-cover rounded-[40px]"
        />

        <motion.div
          variants={zoomIn(0.4, 1)}
          className="lg:block hidden absolute -left-[10%] top-[3%]"
        >
          <img
            src="/stamp.png"
            alt="stamp"
            className="w-[155px] h-[155px] object-contain"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  </section>
  )
}