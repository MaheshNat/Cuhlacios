module.exports = {
  name: 'complete',
  description: 'autocompletes a message using the OpenAI API.',
  async execute(message, args, client) {
    console.log('sending to openai api...');
    const m = await message.channel.send('Awaiting response from OpenAI...');
    const gptResponse = await client.openai.complete({
      engine: 'davinci',
      prompt: args.slice(1).join(' '),
      maxTokens: 150,
      temperature: 0.7,
      topP: 1,
      presencePenalty: 0,
      frequencyPenalty: 0,
      bestOf: 1,
      n: 1,
      stream: false,
      //   stop: ['\n', 'testing'],
    });

    if (gptResponse.data.choices[0].text.length === 0) {
      m.edit('gpt did not send a response.');
    } else {
      message.channel.send(gptResponse.data.choices[0].text);
    }
  },
};
