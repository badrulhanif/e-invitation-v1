import { NextResponse } from "next/server";

export function GET() {
  const ics = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:20260815T140000
DTEND:20260815T180000
SUMMARY:Birthday Sayang
LOCATION:Secret Location
DESCRIPTION:A day crafted with intention, wrapped in mystery, and designed to sweep you off your feet.
END:VEVENT
END:VCALENDAR`;

  return new NextResponse(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="birthday-sayang.ics"',
    },
  });
}
