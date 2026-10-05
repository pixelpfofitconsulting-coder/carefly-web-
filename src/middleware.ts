import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  // ১. Vercel-এ সঠিক হোস্টনেম পাওয়ার জন্য 'host' হেডার চেক করা
  let hostname = req.headers.get('host');

  // যদি কোনো কারণে host না পাওয়া যায়, তবে x-forwarded-host বা url.host ব্যবহার করা
  if (!hostname) {
    hostname = req.headers.get('x-forwarded-host') || url.host;
  }
  
  // পোর্ট নম্বর রিমুভ করা (যেমন: localhost:3000 থেকে 3000 বাদ দেওয়া)
  hostname = hostname.split(':')[0].toLowerCase();

  // ২. মূল ডোমেনগুলো সংজ্ঞায়িত করা (যাতে এগুলোতে সাবডোমেন লজিক কাজ না করে)
  const mainDomains = ['carefly.in', 'www.carefly.in', 'localhost'];
  
  // Vercel-এর ডিফল্ট ডোমেনকেও মূল ডোমেন হিসেবে ধরা
  const isMainDomain = mainDomains.includes(hostname) || hostname.endsWith('.vercel.app');

  // ৩. সাবডোমেন আলাদা করা
  let subdomain: string | null = null;
  
  if (!isMainDomain && hostname.endsWith('.carefly.in')) {
    // উদাহরণ: dr-avik-das.carefly.in থেকে '.carefly.in' বাদ দিলে শুধু 'dr-avik-das' থাকবে
    subdomain = hostname.replace('.carefly.in', '');
  }

  // ৪. রাউটিং লজিক
  // যদি ভ্যালিড সাবডোমেন থাকে এবং সেটি 'www' না হয়, তবে [subdomain] ফোল্ডারে পাঠাবে
  if (subdomain && subdomain !== 'www') {
    return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}${url.search}`, req.url));
  }

  // আর যদি সাবডোমেন না থাকে (অর্থাৎ মূল ডোমেন হয়), তবে স্বাভাবিকভাবে চলবে
  return NextResponse.next();
}

// ৫. Matcher কনফিগারেশন
export const config = {
  matcher: [
    // API, স্ট্যাটিক ফাইল এবং ইমেজগুলোকে বাদ দেওয়া হয়েছে যাতে এগুলো দ্রুত লোড হয়
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};