import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  // ব্রাউজার থেকে হোস্টনেম (Host) সংগ্রহ করা এবং লোয়ারকেস করা
  const hostname = req.headers.get('host') || '';

  // পোর্ট নম্বর রিমুভ করা (যেমন: carefly.in:3000 বা localhost:3000)
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

  // যদি রিকোয়েস্টটি মূল ডোমেন, 'www' সাবডোমেন, অথবা সরাসরি লোকালহোস্ট থেকে আসে, 
  // তবে মিডলওয়্যার কোনো বাধা দেবে না, মূল সাইটই লোড হবে।
  if (!subdomain || subdomain === 'www' || currentHost === 'localhost' || currentHost === 'carefly.in') {
    return NextResponse.next();
  }

  // যদি কোনো ডক্টর সাবডোমেন (যেমন: dr-avik-das) পাওয়া যায়, 
  // তখন ব্যাকগ্রাউন্ডে রিকোয়েস্টটি `app/[subdomain]/...` ফোল্ডারে পাঠানো হবে।
  const rewriteUrl = new URL(`/${subdomain}${url.pathname}${url.search}`, req.url);
  
  return NextResponse.rewrite(rewriteUrl);
}

// Config: মিডলওয়্যারটি কোন কোন পাথের জন্য কাজ করবে তা নির্ধারণ করা
export const config = {
  matcher: [
    /*
     * নিচের পাথগুলো বাদে বাকি সব রিকোয়েস্ট মিডলওয়্যারে ঢুকবে:
     * - api (Next.js API routes)
     * - _next/static (স্ট্যাটিক অ্যাসেটস: CSS, JS)
     * - _next/image (ইমেজ অপ্টিমাইজেশন)
     * - favicon.ico (ওয়েবসাইটের আইকন)
     * - যেকোনো ফাইল যার এক্সটেনশন আছে (যেমন: .png, .jpg, .svg, .pdf)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};