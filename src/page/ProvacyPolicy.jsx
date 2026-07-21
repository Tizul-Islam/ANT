import React from 'react';
import { useSiteSettings } from '../config/sitesetting.js';

export default function ProvacyPolicy() {
    const settings = useSiteSettings();
    const html = settings?.privacy_policy || '';


    return (
        <section className="min-h-[70vh] py-10 px-4 md:px-6">
            <div className="max-w-4xl mx-auto rounded-xl p-6 md:p-8 bg-white shadow">
                <header className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Privacy Policy
                    </h1>
                </header>

                <div
                    className="text-gray-700 leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{
                        __html: html || `
                        <p>ANT (Auto Network Technology) আপনার গোপনীয়তাকে সর্বোচ্চ গুরুত্ব দেয়। এই নীতিমালা বর্ণনা করে যে আমরা কীভাবে আপনার ব্যক্তিগত তথ্য সংগ্রহ, ব্যবহার ও সুরক্ষিত করি।</p>

                        <h3 style="font-weight: 600; margin-top: 16px;">১. তথ্য সংগ্রহ</h3>
                        <p>আমরা শুধুমাত্র প্রয়োজনীয় তথ্য সংগ্রহ করি — যেমন নাম, ফোন নম্বর, ইমেইল, ঠিকানা এবং অর্ডার সম্পর্কিত তথ্য। এই তথ্যগুলো আপনার অভিজ্ঞতা উন্নত করতে ও অর্ডার প্রক্রিয়া সম্পন্ন করতে ব্যবহার করা হয়।</p>

                        <h3 style="font-weight: 600; margin-top: 16px;">২. তথ্য ব্যবহার</h3>
                        <p>আপনার তথ্য নিম্নলিখিত কারণে ব্যবহার করা হয়: অর্ডার প্রক্রিয়া ও ডেলিভারি, কাস্টমার সাপোর্ট, প্ল্যাটফর্মের নিরাপত্তা নিশ্চিত করা, এবং প্রাসঙ্গিক অফার ও আপডেট পাঠানো (শুধুমাত্র আপনার সম্মতিতে)।</p>

                        <h3 style="font-weight: 600; margin-top: 16px;">৩. তথ্য শেয়ারিং</h3>
                        <p>আমরা আপনার ব্যক্তিগত তথ্য কোনো তৃতীয় পক্ষের কাছে বিক্রি করি না। শুধুমাত্র ডেলিভারি সার্ভিস প্রদানকারীদের সাথে প্রয়োজনীয় তথ্য শেয়ার করা হয়।</p>

                        <h3 style="font-weight: 600; margin-top: 16px;">৪. QR ও বারকোড স্ক্যানিং</h3>
                        <p>পণ্য যাচাইয়ের জন্য ব্যবহৃত QR/বারকোড স্ক্যানিং ডেটা শুধুমাত্র পণ্যের সত্যতা নিশ্চিত করতে ব্যবহৃত হয়। এই ডেটা কোনো ব্যক্তিগত তথ্যের সাথে সংযুক্ত করা হয় না।</p>

                        <h3 style="font-weight: 600; margin-top: 16px;">৫. নিরাপত্তা</h3>
                        <p>আপনার তথ্য সুরক্ষিত রাখতে আমরা শিল্পমানের এনক্রিপশন ও নিরাপত্তা ব্যবস্থা ব্যবহার করি। তবে ইন্টারনেটে সম্পূর্ণ নিরাপত্তা নিশ্চিত করা সম্ভব নয়।</p>

                        <h3 style="font-weight: 600; margin-top: 16px;">৬. আপনার অধিকার</h3>
                        <p>আপনি যেকোনো সময় আপনার সংরক্ষিত তথ্য দেখতে, সংশোধন করতে বা মুছে দেওয়ার অনুরোধ করতে পারবেন। এজন্য আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন।</p>

                        <p style="margin-top: 16px;"><strong>যোগাযোগ:</strong> গোপনীয়তা নীতি সম্পর্কে কোনো প্রশ্ন থাকলে আমাদের Contact পেজে যোগাযোগ করুন।</p>
                        `
                    }}

                />
            </div>
        </section>
    );
}

