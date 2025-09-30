import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  // In a real application, you would verify the auth token here
  // For this example, we're just returning a welcome message

  return NextResponse.json(
    {
      status: "success",
      message: "Welcome to your authenticated API endpoint!",
      data: {
        user: {
          name: "Portfolio User",
          role: "admin",
          lastLogin: new Date().toISOString(),
        },
      },
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // In a real application, you'd validate credentials here
    // This is just a mock response

    return NextResponse.json(
      {
        status: "success",
        message: "Authentication successful",
        data: {
          token: "mock-jwt-token",
          user: {
            name: body.email ? `User (${body.email})` : "Portfolio User",
            role: "admin",
          },
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "Invalid request body",
      },
      { status: 400 }
    );
  }
}
