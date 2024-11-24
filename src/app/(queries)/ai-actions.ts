'use server';

import { generateText, streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';
import { z } from 'zod';

export async function getSuggestions(input: string) {
  'use server';

  const stream = createStreamableValue();

  const { partialObjectStream } = await streamObject({
    model: openai('gpt-4-turbo'),
    system: ` You complete the word with a list of 5 items that can be found in a supermarket, 
              and add an emoji that illustrates the item at the beginning of each one. If the word includes a quantity in units or weight or liters, add that quantity to the item.
            `,
    prompt: input,
    output: 'array',
    schema: z.string(),
  });

  for await (const partialObject of partialObjectStream) {
    stream.update(partialObject);
  }

  stream.done();

  console.log(stream.value);

  return { object: stream.value };
}

export async function addEmoji(input: string) {
  const { text } = await generateText({
    model: openai('gpt-4-turbo'),
    system: 'Add an emoji at the beginning of the word describing it',
    prompt: input,
  });
  
  console.log(text);
  return text;
}