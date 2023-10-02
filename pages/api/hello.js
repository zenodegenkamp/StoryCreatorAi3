// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { process } from '/env';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});


export async function fetchBotReply(mainCharacter) {

    const response = await openai.completions.create({
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
        main character: ${mainCharacter}
        message: 
        `,
        max_tokens: 100
      })
      return response.choices[0].text

}

export async function fetchShortStory(mainCharacter, plot) {

  const response = await openai.completions.create({
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
  return response.choices[0].text
}




export async function fetchUrlForImage(shortStory) {

  const response = await openai.completions.create({
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
  return response.choices[0].text

}

export async function fetchImage(imagePrompt){
  const response = await openai.images.generate({
    prompt: `No text on the illustration. Create a colorful and magical illustration that perfectly complements ${imagePrompt}`,
    n: 1,
    size: '256x256',
    response_format: 'url' 
  })

  return response.data[0]?.url
  
}


export async function fetchStory(mainCharacter, plot) {

  const response = await openai.completions.create({
    model: 'text-davinci-003',
    prompt: `
    Generate an enchanting children's story that can be read before bedtime.
    The story should suit the main character ${mainCharacter} and the plot ${plot}.
    Ensure that the story is child-friendly with a comforting and positive tone. Use simple and understandable language suitable for young listeners. Divide the text into 5 parts, each with its own topic and suitable for creating a corresponding image. Let your creativity run wild and create a story that sparks the imagination of children! Here are some examples of similar stories:
    ###
    Main Character: Zeno
    Plot: Zeno discovers a magical garden full of adventure.
    Story: 
    Part 1: Introduction and Setting
    Zeno was a curious boy who lived on the outskirts of the village. He loved adventure, and his eyes sparkled when he thought of the night sky.
    
    Part 2: The Enchanting Beginning
    One day, while playing in his backyard, Zeno saw a shimmering stone. When he touched the stone, a secret gate opened to a beautiful garden he had never seen before.
    
    Part 3: Magical Friends
    In the garden, Zeno met talking animals and joyful elves. They told him about their secret adventures and invited Zeno to join them on a journey.
    
    Part 4: Enchanting Challenges
    To maintain the garden's enchantment, Zeno had to complete some tasks. He had to water flowers with rainbow water and build a tower from stones and sticks.
    
    Part 5: A Magical Ending
    After many days of adventure and friendship, Zeno spent one last night in the magical garden. He gazed at the sparkling stars and knew that the memories of this enchanting adventure would stay with him forever.
    
    ###
    Main Character: Max
    Plot: Max embarks on an exciting journey to the stars.
    Story: 
    Part 1: Introduction and Setting
    Max was a cheerful boy who gazed at the stars every night. He lived in a house with a large window overlooking the night sky.
    
    Part 2: The Journey Begins
    One night, a sparkling star appeared, seeming to draw closer. Max decided to follow the star and was taken on a journey through space.
    
    Part 3: Friends in Space
    Along the way, Max met friendly extraterrestrial beings with sparkling eyes and funny sounds. They shared their stories and showed Max how they danced among the stars.
    
    Part 4: The Radiant Challenge
    To return home, Max had to complete a heroic task. He had to return a lost star to the heart of the Milky Way, where it would shine brighter than ever before.
    
    Part 5: A Starry Night to Remember
    With the star back in its place, Max returned to Earth. He fell asleep with memories of the enchanting journey to the stars, knowing that the night sky was full of mysteries waiting for him.
    
    ###
    Main Character: Patrick
    Plot: Patrick embarks on an enchanting forest adventure
    
    Part 1: Introduction and Setting
    Patrick was a curious boy who lived on the edge of an enchanting forest. He loved the sounds of singing birds and rustling leaves.
    
    Part 2: The Enchanting Beginning
    One sunny morning, Patrick found a mysterious map leading to a secret place deep in the forest. He followed the path and discovered a magical gate.
    
    Part 3: Friends of the Forest
    In the forest, Patrick met talking animals and playful fairies. They invited him to join their games and learn the secrets of the forest.
    
    Part 4: Enchanting Challenges
    To protect the enchanting forest, Patrick had to complete three tasks: build a rainbow bridge over a babbling stream, sing a song that made the trees dance, and restore a sparkling fountain.
    
    Part 5: A Magical Ending
    After a day full of adventure, Patrick returned home with a heart full of joy and stories to share. He fell asleep with the melodies of the enchanting forest still in his ears, knowing that adventures can be found everywhere if you are curious.
    
    ###
    Main Character: ${mainCharacter}
    plot: ${plot}

    part 1:

    part 2:

    part: 3

    part 4:

    part 5:

    `,
    max_tokens: 200,
    temperature: 0.7
  })
  return response.choices[0].text


}


export async function fetchImages(){


}