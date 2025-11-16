"use client";

import Image from "next/image";
import {
  CalendarPlusSolid,
  SoundHighSolid,
  SoundOffSolid,
} from "iconoir-react";
import { useEffect, useRef, useState } from "react";

import { parisienne } from "@/config/font";
import { Timer } from "@/components/ui/Timer";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const playAudio = () => {
    if (audioRef.current && !hasPlayed) {
      audioRef.current.volume = 0.5;
      audioRef.current.muted = false;
      audioRef.current.play().catch(() => {});
      setHasPlayed(true);
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const handleAddToApple = () => {
    const ics = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:20260815T140000
DTEND:20260815T180000
SUMMARY:Birthday Sayang
LOCATION:Secret Location
DESCRIPTION:A day crafted with intention, wrapped in mystery, and designed to sweep you off your feet.
END:VEVENT
END:VCALENDAR
    `;
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "birthday-sayang.ics";
    link.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const handleClick = () => playAudio();
    window.addEventListener("click", handleClick, { once: true });
    return () => window.removeEventListener("click", handleClick);
  }, [hasPlayed]);

  return (
    <section className="flex flex-col gap-8 p-8 sm:p-16 w-full mx-auto max-w-2xl items-center justify-center text-white">
      <audio autoPlay loop ref={audioRef} src="/Audio/playback.mp3" />

      <button
        onClick={toggleMute}
        className="fixed top-6 sm:top-8 right-6 sm:right-8 z-50 cursor-pointer"
      >
        {isMuted ? (
          <SoundOffSolid className="w-6 h-6 text-[#f6caa9]/50 hover:text-[#f0ad7a]" />
        ) : (
          <SoundHighSolid className="w-6 h-6 hover:text-[#f0ad7a]" />
        )}
      </button>
      <div className="relative w-[40vh] h-[50vh] rounded-3xl overflow-hidden shadow-xl border border-white/10">
        <Image
          fill
          src="/Images/hero-banner.jpg"
          alt=""
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute flex px-2 py-1  left-1/2 -translate-x-1/2 top-4 sm:top-8 items-center justify-center  whitespace-nowrap min-w-max rounded-full border border-white/10 bg-white/10">
          <Timer
            targetDate={new Date("2026-08-15T14:00:00")}
            render={(timeLeft) => {
              if (!timeLeft) return "Celebration Day!";
              const dayText = timeLeft.days === 1 ? "Day" : "Days";
              return `${timeLeft.days} ${dayText} Left`;
            }}
          />
        </div>
        <div className="absolute flex flex-col gap-2 inset-x-0 bottom-4 sm:bottom-8 items-center justify-center">
          <h2 className="text-xl sm:text-2xl font-bold">BIRTHDAY SAYANG</h2>
          <p>Sat, 15 Aug 2026, 2:00 PM</p>
          <p>Secret Location</p>
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
      <div className="flex flex-col sm:flex-row gap-4 w-full items-center justify-center">
        <button className="p-4 w-full max-w-md rounded-full cursor-pointer backdrop-blur-md shadow-xl border border-white/30 bg-white/10 hover:text-[#f0ad7a] hover:border-[#f0ad7a] hover:bg-[#f0ad7a]/5">
          I’m Coming, Sayang!
        </button>

        {/* Add to Apple Calendar or Google Calendar */}
        <a
          href="/api/calendar"
          className="flex p-4 gap-2 items-center justify-center w-full sm:w-auto rounded-full cursor-pointer backdrop-blur-md shadow-xl border border-white/30 bg-white/10 hover:text-[#f0ad7a] hover:border-[#f0ad7a] hover:bg-[#f0ad7a]/5"
        >
          <CalendarPlusSolid className="w-6 h-6" />
          <span className="block sm:hidden">Add To Calendar</span>
        </a>
      </div>
    </section>
  );
}
