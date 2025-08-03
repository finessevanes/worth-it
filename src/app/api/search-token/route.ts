import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  
  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const searchUrl = new URL('https://api.1inch.dev/token/v1.4/1/search');
    searchUrl.searchParams.append('query', query);
    searchUrl.searchParams.append('limit', '10');

    const response = await fetch(searchUrl.toString(), {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'accept': 'application/json'
      }
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Token not found or not supported' }, { status: 404 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch token data' }, { status: 500 });
  }
}