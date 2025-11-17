import { NextResponse } from "next/server";

export function GET() {
  // Event details
  const title = encodeURIComponent("Birthday Sayang Celebration");
  const location = encodeURIComponent("Secret Location");
  const details = encodeURIComponent(
    "Happy Birthday Sayang! I cannot wait to celebrate this beautiful moment with you. See you soon."
  );

  // Event time in UTC (Google Calendar expects YYYYMMDDTHHmmssZ)
  const start = "20260815T060000Z";
  const end = "20260815T100000Z";

  // Google Calendar URL
  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}&trp=false&sprop=&sprop=name:`;

  return NextResponse.redirect(googleUrl);
}
