import { Settings } from 'lucide-react';

import Heading from '@/components/heading';
import { checkSubscription } from '@/lib/subscription';
import SubscriptionButton from '@/components/subscription-button';

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div>
      <Heading
        title="Settings"
        description="Manage your account settings."
        icon={Settings}
        iconColor="text-primary"
        bgColor="bg-primary/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPro ? 'You are currently on Pro plan.' : 'You are currently on Free plan.'}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
};

export default SettingsPage;
