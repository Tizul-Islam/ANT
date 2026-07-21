import React from 'react';
import { useSiteSettings } from '../config/sitesetting.js';

export default function TermsCon() {
	const settings = useSiteSettings();
	const html = settings?.terms_and_conditions || '';

	return (
		<section className="min-h-[70vh] py-10 px-4 md:px-6">
			<div className="max-w-4xl mx-auto rounded-xl p-6 md:p-8 bg-white shadow">
				<header className="mb-6">
					<h1 className="text-2xl md:text-3xl font-bold text-gray-900">
						Terms & Conditions
					</h1>
				</header>

				<div
				className="text-gray-700 leading-relaxed space-y-4"
				dangerouslySetInnerHTML={{
					__html: html || `
					<p>এই শর্তাবলী ANT (Auto Network Technology) প্ল্যাটফর্ম ব্যবহারের ক্ষেত্রে প্রযোজ্য। সাইটটি ব্যবহার করার মাধ্যমে আপনি নিচের শর্তগুলো মেনে নিচ্ছেন।</p>

					<h3 style="font-weight: 600; margin-top: 16px;">১. সেবার শর্তাবলী</h3>
					<p>ANT প্ল্যাটফর্ম ব্যবহারকারীদের অটো পার্টস ক্রয়, শপ অনুসন্ধান, এবং প্রশিক্ষণ সেবা প্রদান করে। অ্যাকাউন্ট তৈরি করতে সঠিক তথ্য প্রদান করতে হবে এবং অ্যাকাউন্টের নিরাপত্তার দায়িত্ব ব্যবহারকারীর নিজের।</p>

					<h3 style="font-weight: 600; margin-top: 16px;">২. পণ্য ও অর্ডার</h3>
					<p>প্রতিটি পণ্যের মান ও সত্যতা নিশ্চিত করা হয়। তবে অর্ডার দেওয়ার পূর্বে পণ্যের বিবরণ ভালোভাবে পড়ার অনুরোধ করা হচ্ছে। অর্ডার সম্পন্ন হওয়ার পর বাতিলের জন্য ২৪ ঘণ্টার মধ্যে যোগাযোগ করতে হবে।</p>

					<h3 style="font-weight: 600; margin-top: 16px;">৩. রিটার্ন ও রিফান্ড পলিসি</h3>
					<p>পণ্য পাওয়ার ৯০ দিনের মধ্যে ত্রুটিপূর্ণ পণ্য ফেরত দেওয়া যাবে। রিফান্ড প্রক্রিয়া সম্পন্ন হতে ৭-১০ কার্যদিবস সময় লাগতে পারে।</p>

					<h3 style="font-weight: 600; margin-top: 16px;">৪. শপ মালিকদের জন্য</h3>
					<p>শপ মালিকরা শুধুমাত্র নিজেদের শপের পণ্য ও তথ্য পরিচালনা করতে পারবেন। মিথ্যা তথ্য প্রদান বা প্রতারণামূলক কার্যক্রম করলে অ্যাকাউন্ট বন্ধ করা হবে।</p>

					<h3 style="font-weight: 600; margin-top: 16px;">৫. পরিবর্তনের অধিকার</h3>
					<p>ANT যেকোনো সময় এই শর্তাবলী পরিবর্তন করার অধিকার রাখে। পরিবর্তনের পর সাইট ব্যবহার অব্যাহত রাখলে নতুন শর্ত মেনে নেওয়া হয়েছে বলে গণ্য হবে।</p>

					<p style="margin-top: 16px;"><strong>যোগাযোগ:</strong> শর্তাবলী সম্পর্কে কোনো প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন।</p>
					`,
				}}
			/>
			</div>
		</section>
	);
}
