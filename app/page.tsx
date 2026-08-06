"use client";

import { SoundHighSolid, SoundOffSolid } from "iconoir-react";
import { useEffect, useRef, useState } from "react";

import { parisienne } from "@/config/font";
import { Timer } from "@/components/ui/Timer";

const UNLOCK_EVENTS = [
  "pointerdown",
  "mousedown",
  "touchstart",
  "touchend",
  "click",
  "keydown",
  "wheel",
  "scroll",
] as const;

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const isMutedRef = useRef(false);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextMuted = !audio.muted;
    audio.muted = nextMuted;
    isMutedRef.current = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted && audio.paused) {
      audio.play().catch(() => {});
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.5;

    let unlocked = false;

    const removeUnlockListeners = () => {
      UNLOCK_EVENTS.forEach((event) =>
        window.removeEventListener(event, handleUnlock)
      );
    };

    const tryPlay = async () => {
      if (isMutedRef.current) return false;

      audio.muted = false;
      try {
        await audio.play();
        return true;
      } catch {
        return false;
      }
    };

    // Fallback: the browser blocked autoplay, so start on the first gesture.
    function handleUnlock() {
      if (unlocked) return;
      void tryPlay().then((ok) => {
        if (!ok) return;
        unlocked = true;
        removeUnlockListeners();
      });
    }

    const addUnlockListeners = () => {
      UNLOCK_EVENTS.forEach((event) =>
        window.addEventListener(event, handleUnlock, { passive: true })
      );
    };

    // Force autoplay on landing.
    void tryPlay().then((ok) => {
      if (ok) {
        unlocked = true;
        return;
      }
      addUnlockListeners();
    });

    // Resume if the tab was backgrounded or the OS paused playback.
    const handleVisibility = () => {
      if (document.visibilityState !== "visible") return;
      if (isMutedRef.current || !audio.paused) return;
      void tryPlay();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      removeUnlockListeners();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <section className="flex flex-col gap-8 p-4 sm:py-16 my-8 sm:my-0 w-full mx-auto max-w-2xl items-center justify-center text-white">
      <audio
        autoPlay
        loop
        playsInline
        preload="auto"
        ref={audioRef}
        src="/Audio/playback.mp3"
      />

      <button
        onClick={toggleMute}
        className="fixed top-6 sm:top-8 right-6 sm:right-8 z-50 cursor-pointer"
      >
        {isMuted ? (
          <SoundOffSolid className="w-6 h-6 text-[#f6caa9]/50 hover:text-[#c49a7a]" />
        ) : (
          <SoundHighSolid className="w-6 h-6 hover:text-[#c49a7a]" />
        )}
      </button>
      <div className="relative w-full sm:w-[60vh] h-[40vh] rounded-3xl overflow-hidden shadow-xl border border-white/10">
        <video
          autoPlay
          muted
          loop
          playsInline
          src="/Videos/backdrop-video.mp4"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute flex px-2 py-1  left-1/2 -translate-x-1/2 top-4 sm:top-8 items-center justify-center whitespace-nowrap min-w-max rounded-full border border-white/10 bg-white/10">
          <Timer
            targetDate={new Date("2026-08-15T14:00:00")}
            render={(timeLeft) => {
              if (!timeLeft) return "Celebration Day!";
              const dayText = timeLeft.days === 1 ? "Day" : "Days";
              return `${timeLeft.days} ${dayText} Left`;
            }}
          />
        </div>
        <div className="absolute flex flex-col gap-0 inset-x-0 bottom-4 sm:bottom-8 items-center justify-center">
          <h2 className="text-xl sm:text-2xl font-bold">BIRTHDAY SAYANG</h2>
          <p>Sat, 15 Aug 2026, 12:00 PM</p>
        </div>
      </div>
      <div className="space-y-4 text-center">
        <h2
          className={`${parisienne.className} text-4xl sm:text-6xl italic font-bold`}
        >
          My Sweetest One
        </h2>
        <p>
          A day crafted with intention, wrapped in mystery, and designed to
          sweep you off your feet.
        </p>
        <p className="italic text-white/50">
          Every moment has been made just for you
        </p>
      </div>
      <div className="grid gap-4 w-full rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-4 items-center"><p className="shrink-0 sm:w-20 sm:text-left text-white/50">12:00PM</p><div className="flex flex-col gap-0 text-center sm:text-left"><p className="italic text-[#c49a7a]">First location</p><p>Lunch at Bambool Hills</p></div></div>
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-4 items-center"><p className="shrink-0 sm:w-20 sm:text-left text-white/50">2:00PM</p><div className="flex flex-col gap-0 text-center sm:text-left"><p className="italic text-[#c49a7a]">Second location</p><p>Sighseeing at Bukit Tunku</p></div></div>
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-4 items-center"><p className="shrink-0 sm:w-20 sm:text-left text-white/50">3:30PM</p><div className="flex flex-col gap-0 text-center sm:text-left"><p className="italic text-[#c49a7a]">Third Location</p><p>Farming at Bangsar / Farm Fresh at UPM / Picnic at Putrajaya</p></div></div>
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-4 items-center"><p className="shrink-0 sm:w-20 sm:text-left text-white/50">5:00PM</p><div className="flex flex-col gap-0 text-center sm:text-left"><p className="italic text-[#c49a7a]">Forth Location</p><p>Cafe hunting & chill</p></div></div>
      </div>
    </section>
  );
}
