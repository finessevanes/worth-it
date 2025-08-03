import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { address } = await request.json();
  
  if (!address) {
    return NextResponse.json({ error: 'Token address is required' }, { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const response = await fetch('https://api.1inch.dev/price/v1.1/1', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tokens: [address],
        currency: 'USD'
      })
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Unable to fetch price' }, { status: 404 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch price' }, { status: 500 });
  }
}