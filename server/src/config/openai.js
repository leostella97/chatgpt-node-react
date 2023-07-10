const fetch = require('node-fetch');

module.exports = class openai{
    static configuration(){
        apiKey: process.env.OPEN_AI_KEY
    }
}

async function gerarTitulo(prompt) {
  const OPEN_AI_KEY = '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';
  const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPEN_AI_KEY}`
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 10, // Número máximo de tokens no título gerado
      temperature: 0.5, // Controla a aleatoriedade dos resultados (valores mais baixos são mais determinísticos)
      n: 1, // Quantidade de títulos a serem gerados
      stop: ['\n'] // Define onde o título deve parar (no final de uma linha)
    })
  });

  const data = await response.json();
  const tituloGerado = data.choices[0].text.trim();
  return tituloGerado;
}

// Exemplo de uso
const prompt = 'Escreva aqui o texto ou contexto que deseja usar como prompt para gerar o título.';
gerarTitulo(prompt)
  .then((titulo) => {
    console.log('Título gerado:', titulo);
  })
  .catch((error) => {
    console.error('Ocorreu um erro:', error);
  });
