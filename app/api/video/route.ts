import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Replicate from 'replicate';

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

    const response = await replicate.run(
      'anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351',
      {
        input: {
          fps: 24,
          model: 'xl',
          width: 1024,
          height: 576,
          prompt: `${prompt}, 8k, perfect, award winning`,
          batch_size: 1,
          num_frames: 24,
          init_weight: 0.5,
          guidance_scale: 17.5,
          negative_prompt: 'very blue, dust, noisy, washed out, ugly, distorted, broken',
          remove_watermark: false,
          num_inference_steps: 50
        }
      }
    );

    return NextResponse.json(response);
  } catch (error) {
    console.log('Video generation error: ', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
