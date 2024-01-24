import Image from 'next/image';

export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image alt="logo" src="/spinner.svg" width={200} height={200} />
      </div>
      <p className="text-sm text-muted-foreground">Pentaflow is loading...</p>
    </div>
  );
};
