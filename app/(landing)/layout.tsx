const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full bg-gray-950 overflow-auto">
      <div className="mx-auto max-w-screen-xl h-full w-full px-[5%]">{children}</div>
    </main>
  );
};

export default LandingLayout;
