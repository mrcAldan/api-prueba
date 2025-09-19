const { body, validationResult } = require('express-validator');
const utils = require('./utils.js');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    return res.json({ res: 'Index' });
});

app.post('/text/process',
    body('text')
        .isString().withMessage('El campo text debe ser un texto')
        .notEmpty().withMessage('El campo text no puede estar vacío'),
    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const data = req.body;
        const text = data.text;

        let finalText = utils.text_process(text);
        
        return res.status(200).json({ result: finalText });
    });

app.post('/text/transform',
    body('text')
        .isString().withMessage('El campo text debe ser un texto')
        .notEmpty().withMessage('El campo text no puede estar vacío'),
    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const data = req.body;
        const text = data.text;

        let alternatingCaps = utils.alternating_caps(text);
        let vowelReplacement = utils.vowel_replacement(text);
        let uniqueWords = utils.unique_words(text);

        return res.status(200).json({
            alternating_caps: alternatingCaps,
            vowel_replacement: vowelReplacement,
            unique_words: uniqueWords
        });

    });


app.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
});