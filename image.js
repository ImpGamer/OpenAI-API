import OpenAI from "openai";
import dotenv from 'dotenv'

dotenv.config()
const OPENAI_KEY = process.env.OPENAI_API_KEY

const openai = new OpenAI({
  apiKey: OPENAI_KEY
});

const response = await openai.images.generate({
    model:"dall-e-3",
    prompt: "Gato morado con collar de luna"
})

console.log(`Tu imagen: ${response.data[0].url}`)