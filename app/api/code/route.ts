import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const instructionMessage: ChatCompletionMessageParam = {
  role: 'system',
  content:
    "Act as a code generator machine. You must only answer markdown code snippets back to me. I'll give you a prompt and you give me the code. You can use code comments for explanations."
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse('OpenAI API Key Not Configured', { status: 500 });
    }

    if (!messages) {
      return new NextResponse('Messages Not Found', { status: 400 });
    }

    const freeTrial = await checkApiLimit();

    if (!freeTrial) {
      return new NextResponse('Free Trial Limit Reached', { status: 403 });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [instructionMessage, ...messages]
    });

    await increaseApiLimit();

    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.log('Code Generation Error: ', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
