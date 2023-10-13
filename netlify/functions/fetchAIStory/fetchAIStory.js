import OpenAI from 'openai';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY 
});


const handler = async (event) => {
  try {

    const body = JSON.parse(event.body);


    const mainCharacter = body.mainCharacter;
    const plot = body.plot;


    const completion = await openai.completions.create({
        model: 'text-davinci-003',
        prompt: `Generate an enchanting story for children that can be read before bedtime.
    
        The story should align with the main character ${mainCharacter} and the plot ${plot}. Ensure that the story is geared towards children and has a comforting, positive tone. Use simple and understandable language suitable for young listeners. Create a short story, similar in length to a tweet. Let your creativity flow and craft a tale that sparks the imagination of children! Here are some examples of similar stories:
    
        ###
        main character: Zeno
        Plot: Zeno discovers a magical garden full of adventure.
        story: In a quiet village, there lived a boy named Zeno, known for his endless curiosity and sparkling smile. One sunny day, while playing amidst the colorful flowers, Zeno stumbled upon a hidden path. This path led him to a magical garden, unlike anything he had ever seen. The garden was adorned with glittering butterflies, chatty birds, and secret corners waiting to be explored. Zeno embarked on an extraordinary adventure, filled with new friends and enchanting creatures. Each day brought new discoveries, and his heart danced with wonder.
        ###
        main character: Max
        Plot: Max embarks on an exciting journey to the stars
        story: Meet Max, a young dreamer whose fascination with the twinkling stars knew no bounds. One fateful night, a brilliant star descended from the sky, beckoning Max to follow. With a heart full of courage, Max embarked on an extraordinary journey through the velvety night sky. Along the way, he encountered cheerful moon beings, graceful comets, and friendly planets, all of whom welcomed him with open arms. Max learned that even in the darkest night, dreams could light the way.
        ###
        main character: Patrick
        Plot: Patrick goes on a magical forest adventure
        story: In a whimsical forest, there lived a young boy named Patrick, his heart brimming with boundless adventure. One sunny morning, Patrick stumbled upon a mysterious flute, its melody more enchanting than any he had ever heard. The flute led him deeper into the forest, where he met talking trees, mischievous elves, and babbling brooks. Together with his newfound forest friends, Patrick embarked on a magical adventure, unveiling nature's hidden secrets and surprising wonders.
        ###
    
        main character: ${mainCharacter}
        plot: ${plot}
        story: 
        `,
        max_tokens: 200,
        temperature: 0.7
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
