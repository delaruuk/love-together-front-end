import axios from 'axios';
import { getQuestionsByCategory } from '../packages/utils/api-methods';
import fs from 'fs';

axios.get('http://localhost:8080/questions')
  .then(response => {
    // const filtered_questions = response.data.filter((question: { answers: string[] }) => question.answers.length === 0);
    const question_texts = response.data.map((question: { questionText: string[] }) => question.questionText);

    fs.writeFile('questions_fill.txt', question_texts.join('\n'), (err) => {
        if (err)
        {
            console.log(err);
        }
        else{
            console.log('The file was saved!');
        }
  });
})
  .catch(error => {
    console.error(error);
  });