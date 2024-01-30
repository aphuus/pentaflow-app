'use client';

import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import TypewriterComponent from 'typewriter-effect';
import { Button } from './ui/button';
import { Zap } from 'lucide-react';

const LandingHero = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="text-white font-semibold py-36 text-center space-y-6 flex items-center flex-col">
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl space-y-2 md:space-y-4 font-bold ">
        <h1>The Best AI Tools For</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-primary-primary to-blue-600">
          <TypewriterComponent
            options={{
              strings: [
                'Chatbot Conversation.',
                'Photo Generation.',
                'Video Generation.',
                'Coding Assistant.',
                'Music Generation.'
              ],
              autoStart: true,
              loop: true
            }}
          />
        </div>
      </div>
      <div className="max-w-3xl">
        <div className="text-md md:text-lg font-light text-muted-foreground">
          Create content using the power of AI and be more productive, efficient and powerful. With
          Pentaflow you can create content for your social media, blogs, websites and more.
        </div>
      </div>
      <div>
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
          <Button size="lg" variant="premium" className="md:text-md p-2 md:p-4">
            Start Creating For Free
            <Zap className="w-4 h-4 fill-white ml-2" />
          </Button>
        </Link>
      </div>
      <div className="text-xs text-muted-foreground/60 md:text-sm font-medium">
        No credit card required. Cancel anytime.
      </div>
    </div>
  );
};

export default LandingHero;
