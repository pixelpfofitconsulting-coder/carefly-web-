import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  // Vercel-এর প্রক্সির জন্য x-forwarded-host এবং সাধারণ host হেডার চেক করা
  const hostname = req.headers.get('x-forwarded-host') || req.headers.get('host') || '';
  const currentHost = hostname.split(':')[0].toLowerCase();

  let subdomain: string | null = null;

  // প্রোডাকশন (Production) ডোমেন চেক (carefly.in)
  if (currentHost.endsWith('.carefly.in')) {
    subdomain = currentHost.replace('.carefly.in', '');
  } 
  // লোকাল ডেভেলপমেন্ট (Localhost) চেক
  else if (currentHost.endsWith('.localhost')) {
    subdomain = currentHost.replace('.localhost', '');
  }

  // যদি রিকোয়েস্টটি মূল ডোমেন, 'www' সাবডোমেন, অথবা লোকালহোস্ট থেকে আসে
  if (!subdomain || subdomain === 'www' || currentHost === 'localhost' || currentHost === 'carefly.in') {
    return NextResponse.next();
  }

  // ডক্টর সাবডোমেন পাওয়া গেলে ডাইনামিক [subdomain] ফোল্ডারে রিরাইট করা
  const rewriteUrl = new URL(`/${subdomain}${url.pathname}${url.search}`, req.url);
  
  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};