import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY 
});

const handler = async (event) => {

  const imagePrompt = event.body;

  try {
    const response = await openai.images.generate({
      prompt: `No text on the illustration. Create a colorful and magical illustration that perfectly complements ${imagePrompt}`,
      n: 1,
      size: '256x256',
      response_format: 'url' 
    })
   
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: response.data[0].url }),
      
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
