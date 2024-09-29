import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import dotenv from 'dotenv'

dotenv.config()
const API_KEY = process.env.OPENAI_API_KEY


const openAi = new OpenAI({
    apiKey: API_KEY
});

//Lugar donde se guardara el archivo de audio
const speechFile = path.resolve('./speech.mp3')

async function main() {
    const mp3 = await openAi.audio.speech.create({
        model:"tts-1",
        voice:"nova",
        input:"Hello everyone! I hope you're fine"
    })

    console.log(speechFile)
    const buffer = Buffer.from(await mp3.arrayBuffer())
    await fs.promises.writeFile(speechFile,buffer)
}
main()