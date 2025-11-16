import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/utils/email";
import { sendEmailTemplate } from "@/utils/email/sendEmailTemplate";
