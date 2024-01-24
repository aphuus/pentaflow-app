import Image from 'next/image';

interface EmptyProps {
  label: string;
}

export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className=" relative">
        <Image alt="empty" src="/empty.svg" width={200} height={200} />
      </div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
};
