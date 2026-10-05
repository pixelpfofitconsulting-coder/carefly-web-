import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;

  // Next.js-এর স্ট্যাটিক ফাইল ও API-তে মিডলওয়্যার রান করানো বন্ধ করা
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next();
  }
  
  // Vercel-এ সঠিক ডোমেইন পাওয়ার সবচেয়ে ভালো উপায়
  const hostname = req.headers.get('host') || url.hostname;
  const currentHost = hostname.split(':')[0].toLowerCase();

  // মূল ডোমেইনগুলো
  const mainDomains = ['carefly.in', 'www.carefly.in', 'localhost'];
  const isMainDomain = mainDomains.includes(currentHost) || currentHost.endsWith('.vercel.app');

  let subdomain: string | null = null;
  
  if (!isMainDomain && currentHost.endsWith('.carefly.in')) {
    subdomain = currentHost.replace('.carefly.in', '');
  }

  // যদি সাবডোমেন পাওয়া যায়, তবে সেটিকে রিরাইট করবে
  if (subdomain && subdomain !== 'www') {
    return NextResponse.rewrite(new URL(`/${subdomain}${pathname}${url.search}`, req.url));
  }

  return NextResponse.next();
}