import { NextResponse } from "next/server";

export function GET() {
  const ics = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:birthday-sayang-2026
DTSTAMP:20250101T000000Z
STATUS:CONFIRMED
CLASS:PUBLIC
DTSTART:20260815T060000Z
DTEND:20260815T100000Z
SUMMARY:Birthday Sayang Celebration
LOCATION:Secret Location
DESCRIPTION:Happy Birthday Sayang! I cannot wait to celebrate this beautiful moment with you. See you soon.
BEGIN:VALARM
TRIGGER:-P1D
ACTION:DISPLAY
DESCRIPTION:Reminder - Happy Birthday Sayang! Today is your day sayang but we will celebrate it tomorrow.
END:VALARM
BEGIN:VALARM
TRIGGER:-P2D
ACTION:DISPLAY
DESCRIPTION:Reminder - Birthday Sayang in 1 day!
END:VALARM
END:VEVENT
END:VCALENDAR`;

  return new NextResponse(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="birthday-sayang-2026.ics"',
      "Cache-Control": "no-cache",
    },
  });
}
