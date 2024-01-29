'use client';

import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { MAX_FREE_TRIALS } from '@/constants';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface FreeCounterProps {
  apiLimitCount: number;
}

export const FreeCounter = ({ apiLimitCount = 0 }: FreeCounterProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apiLimitCount} / {MAX_FREE_TRIALS} Free Generations
            </p>
            <Progress className="h-2" value={(apiLimitCount / MAX_FREE_TRIALS) * 100} />
          </div>
          <Button className="w-full" variant="premium">
            Upgrade
            <Zap className="w-3 h-3 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
