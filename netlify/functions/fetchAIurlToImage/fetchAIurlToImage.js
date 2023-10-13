import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY 
});

const handler = async (event) => {

  const shortStory = event.body;

  try {
     const completion = await openai.completions.create({
        model: 'text-davinci-003',
        prompt: `
        Generate a description for an image that illustrates the enchanting story created earlier.
        The image should align with the story ${shortStory}.
    
        ### 
        Short Story: In a magical forest, Mia discovers a mysterious door leading to a world full of colors and joy.
        Image Prompt: No text in the image. Imagine stepping through an enchanting door and witnessing a splendid landscape, with colorful trees and friendly animals greeting you. Mia stands in awe as the magical world unfolds before her.
        ###
        Short Story: During an enchanting night, Liam travels on the back of a star to a realm filled with dreams and adventures.
        Image Prompt: No text in the image. Picture yourself floating through the nighttime sky on the back of a radiant star. Stars twinkle around you as you enter a world of shimmering dreams. Liam smiles as he explores the realm of adventures.
        ### 
        Short Story: ${shortStory}
        Image Prompt:
        `,
        max_tokens: 200,
        temperature: 0.8
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
