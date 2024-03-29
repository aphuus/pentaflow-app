import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Replicate from 'replicate';

import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!replicate) {
      return new NextResponse('Replicate API Key Not Configured', { status: 401 });
    }

    if (!prompt) {
      return new NextResponse('Messages Not Found', { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const subscription = await checkSubscription();

    if (!freeTrial && !subscription) {
      return new NextResponse('Free Trial Limit Reached', { status: 403 });
    }

    const response = await replicate.run(
      'riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05',
      {
        input: {
          prompt_a: prompt,
          denoising: 0.75,
          num_inference_steps: 50
        }
      }
    );

    if (!subscription) {
      await increaseApiLimit();
    }

    return NextResponse.json(response);
  } catch (error) {
    console.log('Music Generation Error: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
