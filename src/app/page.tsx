import Header from "@/components/Header";
import VideoOptions from "@/components/VideoOptions";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-[100dvh] flex flex-col bg-black/5">
      <Header />

      <div className="p-5 bg-white absolute rounded-xl bottom-3 md:bottom-[56px] md:left-auto left-3 right-3 md:right-[56px] md:min-w-[700px] h-[65dvh] md:h-[65dvh]">
        <VideoOptions />
      </div>

      <Image
        src="/3dCharacter.webp"
        alt="illustration"
        width={230}
        height={370}
        className="absolute z-10 hidden md:block bottom-0 left-20 pointer-events-none"
      />
      <div className="flex-1 bg-gradient-to-r from-[#3E3D42] to-[#161616]"></div>
    </main>
  );
}
