import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import path from "path";
// Load in .env 
dotenv.config({ path: path.join(__dirname, "../.env") });

const configuration = new Configuration({
    organization: "org-QgiE99gElGBmgT1GKeatTQ7N",
    apiKey: process.env.OPENAI_API_KEY,
});

console.log(configuration.apiKey);

const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    max_tokens: 7,
    temperature: 0,
  });


// openai.retrieveModel("text-davinci-003")
//     .then(response => 
//         {
//             console.log(response);
//         })
//         .catch(error =>
//             {
//                 console.error(error);
//             });