import { Avatar, AvatarImage } from '@/components/ui/avatar';

const BotAvatar = () => {
  return (
    <Avatar className="h-9 w-9">
      <AvatarImage className="p-1" src="/bot-avatar.svg" />
    </Avatar>
  );
};

export default BotAvatar;
