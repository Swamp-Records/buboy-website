export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <div className="flex w-full max-w-7xl items-center justify-between gap-10 px-6">
        <img
          src="/buboy1.jpg"
          alt="Buboy photo 1"
          className="w-full max-w-[340px] object-contain"
        />
        <img
          src="/buboy2.jpg"
          alt="Buboy photo 2"
          className="w-full max-w-[340px] object-contain"
        />
        <img
          src="/buboy3.jpg"
          alt="Buboy photo 3"
          className="w-full max-w-[340px] object-contain"
        />
      </div>
    </div>
  );
}
