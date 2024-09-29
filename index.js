import OpenAI from "openai";
import dotenv from 'dotenv'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

dotenv.config()
const OPENAI_KEY = process.env.OPENAI_API_KEY

const openai = new OpenAI({
  apiKey: OPENAI_KEY
});

main()


function main() {
  function askQuestion() {
    rl.question("Ingrese un mensaje (Ingresa q para salir): ", async (message) => {
      if (message === 'q') {
        console.log("Gracias por usar!");
        rl.close();
        return; // Salir de la recursión
      }

      try {
        const messageResponse = await getAI_response(message);
        console.log(messageResponse + "\n");
      } catch (error) {
        console.error("Error al obtener la respuesta:", error);
      }
      
      // Volver a preguntar
      askQuestion();
    });
  }

  askQuestion(); // Iniciar el proceso
}

async function getAI_response(message) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      //Array de historial de mensajes usuario-bot
      {
        "role": "system",
        "content": [
          {
            "type": "text",
            "text": "Actua como compañero de trabajo serio"
          }
        ]
      },
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": message
          }
        ]
      }
    ],
    temperature: 1,
    max_tokens: 280,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      "type": "text"
    },
  });

  return response.choices[0].message.content
}