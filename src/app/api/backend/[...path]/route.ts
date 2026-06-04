import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  "https://fitforge-backend-md-ahsan-habibs-projects-f65cbd92.vercel.app";

const BYPASS_SECRET = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

async function handler(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path } = await context.params;
    const pathname = path.join("/");
    const { search } = new URL(req.url);
    const targetUrl = `${BACKEND_URL}/api/${pathname}${search}`;

    // Build clean headers — only forward what the backend needs
    const forwardHeaders: Record<string, string> = {
      "content-type": req.headers.get("content-type") || "application/json",
    };

    // Forward auth token if present
    const authorization = req.headers.get("authorization");
    if (authorization) {
      forwardHeaders["authorization"] = authorization;
    }

    // Inject Vercel deployment protection bypass if configured
    if (BYPASS_SECRET) {
      forwardHeaders["x-vercel-protection-bypass"] = BYPASS_SECRET;
    }

    const init: RequestInit = {
      method: req.method,
      headers: forwardHeaders,
    };

    // Forward body for non-GET/HEAD requests
    if (req.method !== "GET" && req.method !== "HEAD") {
      const bodyText = await req.text();
      if (bodyText) {
        init.body = bodyText;
      }
    }

    const backendRes = await fetch(targetUrl, init);
    const responseText = await backendRes.text();

    // Try to parse as JSON, fall back to plain text
    let responseBody: any;
    try {
      responseBody = JSON.parse(responseText);
    } catch {
      responseBody = {
        success: false,
        message: responseText || "Backend error",
      };
    }

    return NextResponse.json(responseBody, {
      status: backendRes.status,
    });
  } catch (err: any) {
    console.error("[Proxy] Error:", err.message);
    return NextResponse.json(
      {
        success: false,
        message: "Cannot reach backend. Please try again.",
      },
      { status: 502 },
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;
