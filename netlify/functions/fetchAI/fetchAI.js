// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2


import OpenAI from 'openai';

// New
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});


const handler = async (event) => {



  try {
    console.log(`ikbeninFETCHAI + ${event.body}`)
     const completion = await openai.completions.create({
        model: 'text-davinci-003',
        prompt: `Generate a short twitter like message to enthusiastically say that you are hyped to create a story for the main character that is given by ${mainCharacter}
        ###
        main character: Zeno
        message: Hi Zeno, I'm going to write a super exciting story about you! Where you will discover new things and do cool stuff. Let's create your story!
        ###
        main character: Max
        message: Hey Max! I'm very excited to create a story about you! In this adventure, you will travel to unique places and have a lot of fun.
        ###
        main character: Patrick
        message: Message: Hi Patrick, I'm super excited to write a story about you! You're going on an adventure and experiencing all sorts of fun things. Let's bring your story to life!
        ###
        main character: ${event.body}
        message: 
        `,
        max_tokens: 100
      })
   
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: completion.choices[0].text }),
      
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
