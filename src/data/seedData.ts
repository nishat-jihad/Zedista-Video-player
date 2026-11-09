import { Video, Course, Comment } from "../types";

/**
 * Bump this string whenever the starter catalog changes. App.tsx compares it with
 * the value saved in the browser and reloads the new catalog when they differ,
 * so people who visited before do not keep seeing the old videos.
 */
export const SEED_VERSION = "2026-11-motivation-v1";

export const getInitialVideos = (): Video[] => {
  const now = Date.now();
  return [
    {
      "embedCode": "https://www.youtube.com/watch?v=7VLfGpO8rIM",
      "title": "জীবন পরিবর্তন করা শ্রেষ্ঠ লেকচার - Best Life Changing Motivational Speech Bangla",
      "description": "সাধারণ মোটিভেশন",
      "channelName": "YouTube",
      "category": "Motivation",
      "originalCategory": "Motivation",
      "id": "video-7VLfGpO8rIM",
      "likes": 0,
      "createdAt": now - 3 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=8QaiTOgbNtI",
      "title": "কথাগুলো একা শুনুন জীবন বদলে যাবে - Best Motivational Speech Bangla",
      "description": "সাধারণ মোটিভেশন",
      "channelName": "YouTube",
      "category": "Motivation",
      "originalCategory": "Motivation",
      "id": "video-8QaiTOgbNtI",
      "likes": 0,
      "createdAt": now - 4 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=BlPn1QwrvoE",
      "title": "চিন্তা পরিবর্তন করলে জীবন পরিবর্তন হয়ে যাবে - Best Motivational Speech Bangla",
      "description": "সাধারণ মোটিভেশন",
      "channelName": "YouTube",
      "category": "Motivation",
      "originalCategory": "Motivation",
      "id": "video-BlPn1QwrvoE",
      "likes": 0,
      "createdAt": now - 5 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=9Rd9svvCshQ",
      "title": "Best Motivational Video Speech in Bangla । Powerful Motivation",
      "description": "সাধারণ মোটিভেশন",
      "channelName": "YouTube",
      "category": "Motivation",
      "originalCategory": "Motivation",
      "id": "video-9Rd9svvCshQ",
      "likes": 0,
      "createdAt": now - 6 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=LNuB8wRweMI",
      "title": "জীবন বদলে দেওয়ার মতো একটি ভিডিও | Sushanta Paul",
      "description": "সাধারণ মোটিভেশন",
      "channelName": "YouTube",
      "category": "Motivation",
      "originalCategory": "Motivation",
      "id": "video-LNuB8wRweMI",
      "likes": 0,
      "createdAt": now - 7 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=Dygw7wr6itQ",
      "title": "৩ মিনিট শোনো জীবন বদলে যাবে - Bangla Motivational Video",
      "description": "সাধারণ মোটিভেশন",
      "channelName": "YouTube",
      "category": "Motivation",
      "originalCategory": "Motivation",
      "id": "video-Dygw7wr6itQ",
      "likes": 0,
      "createdAt": now - 8 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=LidEi7ZOU84",
      "title": "লক্ষ্য যা তোমাকে ঘুমাতে দেয় না - Bangla Motivational Speech",
      "description": "সাধারণ মোটিভেশন",
      "channelName": "YouTube",
      "category": "Motivation",
      "originalCategory": "Motivation",
      "id": "video-LidEi7ZOU84",
      "likes": 0,
      "createdAt": now - 9 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=Cnq18be7lyA",
      "title": "যারা জীবনে সফলতা পেতে চাও - Bangla Life Changing Motivational Speech",
      "description": "সাধারণ মোটিভেশন",
      "channelName": "YouTube",
      "category": "Motivation",
      "originalCategory": "Motivation",
      "id": "video-Cnq18be7lyA",
      "likes": 0,
      "createdAt": now - 10 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=fhlox0OkPnk",
      "title": "সেরা মোটিভেশন গল্প - Life Changing Motivation Story",
      "description": "সাধারণ মোটিভেশন",
      "channelName": "YouTube",
      "category": "Motivation",
      "originalCategory": "Motivation",
      "id": "video-fhlox0OkPnk",
      "likes": 0,
      "createdAt": now - 11 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=KmKosIEMc_A",
      "title": "ঢাকা মেডিকেলে চান্স পাওয়ার গল্প - DMC Admission Motivation",
      "description": "ভর্তি প্রস্তুতি ও মোটিভেশন",
      "channelName": "YouTube",
      "category": "Admission Motivation",
      "originalCategory": "Admission Motivation",
      "id": "video-KmKosIEMc_A",
      "likes": 0,
      "createdAt": now - 12 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=QEkLk4IIrA0",
      "title": "পরীক্ষা আসার আগে অবশ্যই দেখবে! - Exam Time Best Motivational Video for Students",
      "description": "ভর্তি প্রস্তুতি ও মোটিভেশন",
      "channelName": "YouTube",
      "category": "Admission Motivation",
      "originalCategory": "Admission Motivation",
      "id": "video-QEkLk4IIrA0",
      "likes": 0,
      "createdAt": now - 13 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=e0s9xTY_E30",
      "title": "মেডিকেল ভর্তি পরীক্ষায় প্রথম হওয়া কে এই রাফসান?",
      "description": "ভর্তি প্রস্তুতি ও মোটিভেশন",
      "channelName": "YouTube",
      "category": "Admission Motivation",
      "originalCategory": "Admission Motivation",
      "id": "video-e0s9xTY_E30",
      "likes": 0,
      "createdAt": now - 14 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=fObiwtcurKU",
      "title": "জাতীয় মেধায় প্রথম রাফসান রাত জাগতেন না - মেডিকেল ভর্তি প্রস্তুতি",
      "description": "ভর্তি প্রস্তুতি ও মোটিভেশন",
      "channelName": "YouTube",
      "category": "Admission Motivation",
      "originalCategory": "Admission Motivation",
      "id": "video-fObiwtcurKU",
      "likes": 0,
      "createdAt": now - 15 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=953RYwVCkDg",
      "title": "যে রুটিন ফলো করলে মেডিকেলে চান্স হবে",
      "description": "ভর্তি প্রস্তুতি ও মোটিভেশন",
      "channelName": "YouTube",
      "category": "Admission Motivation",
      "originalCategory": "Admission Motivation",
      "id": "video-953RYwVCkDg",
      "likes": 0,
      "createdAt": now - 16 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=jWgXkvl4AoI",
      "title": "যাই পড়ি, ভুলে যাই! পড়া মনে রাখার কৌশল - Dr Shawon Academy",
      "description": "ভর্তি প্রস্তুতি ও মোটিভেশন",
      "channelName": "YouTube",
      "category": "Admission Motivation",
      "originalCategory": "Admission Motivation",
      "id": "video-jWgXkvl4AoI",
      "likes": 0,
      "createdAt": now - 17 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=xKc2VWj66TQ",
      "title": "Productivity ও সময়ের বরকত বাড়াবো কীভাবে?",
      "description": "প্রোডাক্টিভিটি ও টাইম ম্যানেজমেন্ট",
      "channelName": "YouTube",
      "category": "Productivity",
      "originalCategory": "Productivity",
      "id": "video-xKc2VWj66TQ",
      "likes": 0,
      "createdAt": now - 18 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=YAAYiiIFF8Y",
      "title": "Eisenhower Matrix - কাজে ব্যস্ত, কিন্তু প্রোডাক্টিভিটি হচ্ছে না?",
      "description": "প্রোডাক্টিভিটি ও টাইম ম্যানেজমেন্ট",
      "channelName": "YouTube",
      "category": "Productivity",
      "originalCategory": "Productivity",
      "id": "video-YAAYiiIFF8Y",
      "likes": 0,
      "createdAt": now - 19 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=CbrBXGyG0GY",
      "title": "অলস থেকে পরিশ্রমী কীভাবে হবেন | অলসতা দূর করার উপায়",
      "description": "প্রোডাক্টিভিটি ও টাইম ম্যানেজমেন্ট",
      "channelName": "YouTube",
      "category": "Productivity",
      "originalCategory": "Productivity",
      "id": "video-CbrBXGyG0GY",
      "likes": 0,
      "createdAt": now - 20 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=eN83dSLsDF0",
      "title": "অলসতা কাটিয়ে ওঠার ১৫টি সেরা উপায় - How To Overcome Laziness",
      "description": "প্রোডাক্টিভিটি ও টাইম ম্যানেজমেন্ট",
      "channelName": "YouTube",
      "category": "Productivity",
      "originalCategory": "Productivity",
      "id": "video-eN83dSLsDF0",
      "likes": 0,
      "createdAt": now - 21 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=QPFgjwI8LFI",
      "title": "অলসতা দূর করার উপায় - সন্দীপ মাহেশ্বরী (Bangla)",
      "description": "প্রোডাক্টিভিটি ও টাইম ম্যানেজমেন্ট",
      "channelName": "YouTube",
      "category": "Productivity",
      "originalCategory": "Productivity",
      "id": "video-QPFgjwI8LFI",
      "likes": 0,
      "createdAt": now - 22 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=ATdRtfp2-dE",
      "title": "I'm begging you to manage your time (English)",
      "description": "প্রোডাক্টিভিটি ও টাইম ম্যানেজমেন্ট",
      "channelName": "YouTube",
      "category": "Productivity",
      "originalCategory": "Productivity",
      "id": "video-ATdRtfp2-dE",
      "likes": 0,
      "createdAt": now - 23 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=0PesyWdhxTY",
      "title": "একা একা ভালো থাকার উপায়, একাকীত্ব দূর করার উপায়",
      "description": "একাকীত্ব",
      "channelName": "YouTube",
      "category": "Loneliness",
      "originalCategory": "Loneliness",
      "id": "video-0PesyWdhxTY",
      "likes": 0,
      "createdAt": now - 24 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=V2fAZ0WTqzw",
      "title": "একা থাকা চমৎকার একটা ব্যাপার! - সদগুরু (বাংলা)",
      "description": "একাকীত্ব",
      "channelName": "YouTube",
      "category": "Loneliness",
      "originalCategory": "Loneliness",
      "id": "video-V2fAZ0WTqzw",
      "likes": 0,
      "createdAt": now - 25 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=fP7GhEVf4Zs",
      "title": "একাকীত্ব কি সত্যিই খারাপ? | Bangla Emotional Video",
      "description": "একাকীত্ব",
      "channelName": "YouTube",
      "category": "Loneliness",
      "originalCategory": "Loneliness",
      "id": "video-fP7GhEVf4Zs",
      "likes": 0,
      "createdAt": now - 26 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=pxhkwtBqaQw",
      "title": "কিভাবে একাকীত্ব কাটিয়ে উঠবেন? Stop being Lonely",
      "description": "একাকীত্ব",
      "channelName": "YouTube",
      "category": "Loneliness",
      "originalCategory": "Loneliness",
      "id": "video-pxhkwtBqaQw",
      "likes": 0,
      "createdAt": now - 27 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=ZRsS_fKtnsk",
      "title": "কিভাবে একা খুশি থাকা যায় | How to Overcome Loneliness in Bangla",
      "description": "একাকীত্ব",
      "channelName": "YouTube",
      "category": "Loneliness",
      "originalCategory": "Loneliness",
      "id": "video-ZRsS_fKtnsk",
      "likes": 0,
      "createdAt": now - 28 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=gvDFj-qooH8",
      "title": "৬টি উপায় একাকিত্ব কাটিয়ে উঠে একা খুশি থাকার | Bangla Motivational Video",
      "description": "একাকীত্ব",
      "channelName": "YouTube",
      "category": "Loneliness",
      "originalCategory": "Loneliness",
      "id": "video-gvDFj-qooH8",
      "likes": 0,
      "createdAt": now - 29 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=jcCsv4XJ0JY",
      "title": "ব্যর্থতা আপনার জীবনের শেষ নয়! (এই ভিডিও আপনার সব হতাশা দূর করবে)",
      "description": "হতাশা ও ব্যর্থতা",
      "channelName": "YouTube",
      "category": "Disappointment",
      "originalCategory": "Disappointment",
      "id": "video-jcCsv4XJ0JY",
      "likes": 0,
      "createdAt": now - 30 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=kIfynxyDrTI",
      "title": "হতাশা থেকে বের হওয়ার ৫টি কার্যকরী কৌশল",
      "description": "হতাশা ও ব্যর্থতা",
      "channelName": "YouTube",
      "category": "Disappointment",
      "originalCategory": "Disappointment",
      "id": "video-kIfynxyDrTI",
      "likes": 0,
      "createdAt": now - 31 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=MCa6e6o6tNI",
      "title": "হতাশা ও দুশ্চিন্তা থেকে বেরিয়ে আসার উপায় - Motivation Video In Bangla",
      "description": "হতাশা ও ব্যর্থতা",
      "channelName": "YouTube",
      "category": "Disappointment",
      "originalCategory": "Disappointment",
      "id": "video-MCa6e6o6tNI",
      "likes": 0,
      "createdAt": now - 32 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=BZSwqMtnHrQ",
      "title": "ব্যর্থতার থেকে বড় মোটিভেশান আর নেই! - Powerful Motivational Video In Bangla",
      "description": "হতাশা ও ব্যর্থতা",
      "channelName": "YouTube",
      "category": "Disappointment",
      "originalCategory": "Disappointment",
      "id": "video-BZSwqMtnHrQ",
      "likes": 0,
      "createdAt": now - 33 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=NAjpQb6PDp8",
      "title": "অনুপ্রেরণামূলক গল্প - Motivational Story in Bengali",
      "description": "হতাশা ও ব্যর্থতা",
      "channelName": "YouTube",
      "category": "Disappointment",
      "originalCategory": "Disappointment",
      "id": "video-NAjpQb6PDp8",
      "likes": 0,
      "createdAt": now - 34 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=o0ko0yQnC8k",
      "title": "মনের মাঝে হতাশা চলে আসলে কি করবেন?",
      "description": "হতাশা ও ব্যর্থতা",
      "channelName": "YouTube",
      "category": "Disappointment",
      "originalCategory": "Disappointment",
      "id": "video-o0ko0yQnC8k",
      "likes": 0,
      "createdAt": now - 35 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=qkti90_y6IQ",
      "title": "নিজেকে পরিবর্তন করার উপায় - Motivational Video in Bangla",
      "description": "নিজেকে গড়ে তোলা",
      "channelName": "YouTube",
      "category": "Self Improvement",
      "originalCategory": "Self Improvement",
      "id": "video-qkti90_y6IQ",
      "likes": 0,
      "createdAt": now - 36 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=66IK1UkwNl4",
      "title": "নিজেকে যেভাবে ধাপে ধাপে পরিবর্তন করবেন",
      "description": "নিজেকে গড়ে তোলা",
      "channelName": "YouTube",
      "category": "Self Improvement",
      "originalCategory": "Self Improvement",
      "id": "video-66IK1UkwNl4",
      "likes": 0,
      "createdAt": now - 37 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=jJPwbwnKkYU",
      "title": "বদলে ফেলুন নিজেকে - কোচ কামরুল হাসান",
      "description": "নিজেকে গড়ে তোলা",
      "channelName": "YouTube",
      "category": "Self Improvement",
      "originalCategory": "Self Improvement",
      "id": "video-jJPwbwnKkYU",
      "likes": 0,
      "createdAt": now - 38 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=e00jogs5U4k",
      "title": "কিভাবে নিজেকে শৃঙ্খলাপরায়ণ করবেন - Power of Self Discipline",
      "description": "নিজেকে গড়ে তোলা",
      "channelName": "YouTube",
      "category": "Self Improvement",
      "originalCategory": "Self Improvement",
      "id": "video-e00jogs5U4k",
      "likes": 0,
      "createdAt": now - 39 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=D804JAP5brQ",
      "title": "মাত্র ৭ দিনে আপনার জীবন পরিবর্তন করুন! 7 Day Challenge to Change Yourself",
      "description": "নিজেকে গড়ে তোলা",
      "channelName": "YouTube",
      "category": "Self Improvement",
      "originalCategory": "Self Improvement",
      "id": "video-D804JAP5brQ",
      "likes": 0,
      "createdAt": now - 40 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=Mwq53eIcTtQ",
      "title": "এখন সময় নিজেকে পরিবর্তন করার! How to Make your Greatest Comeback",
      "description": "নিজেকে গড়ে তোলা",
      "channelName": "YouTube",
      "category": "Self Improvement",
      "originalCategory": "Self Improvement",
      "id": "video-Mwq53eIcTtQ",
      "likes": 0,
      "createdAt": now - 41 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=mCMbGUstW6U",
      "title": "নিজেকে পরিবর্তন করার ৩টি Secret উপায় - Bangla Motivational Video",
      "description": "নিজেকে গড়ে তোলা",
      "channelName": "YouTube",
      "category": "Self Improvement",
      "originalCategory": "Self Improvement",
      "id": "video-mCMbGUstW6U",
      "likes": 0,
      "createdAt": now - 42 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=ktspzVatcX8",
      "title": "Surah Ar-Rahman (Full) - Mishary Alafasy",
      "description": "কুরআন তিলাওয়াত (সূরা)",
      "channelName": "YouTube",
      "category": "Surah",
      "originalCategory": "Surah",
      "id": "video-ktspzVatcX8",
      "likes": 0,
      "createdAt": now - 43 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=ieHCmmiYKIQ",
      "title": "Surah 02 - Al Baqarah - Mishary Rashid Alafasy",
      "description": "কুরআন তিলাওয়াত (সূরা)",
      "channelName": "YouTube",
      "category": "Surah",
      "originalCategory": "Surah",
      "id": "video-ieHCmmiYKIQ",
      "likes": 0,
      "createdAt": now - 44 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=9h2ud0FUGrs",
      "title": "সূরা আল মুলক - Recitation with Bangla Translation",
      "description": "কুরআন তিলাওয়াত (সূরা)",
      "channelName": "YouTube",
      "category": "Surah",
      "originalCategory": "Surah",
      "id": "video-9h2ud0FUGrs",
      "likes": 0,
      "createdAt": now - 45 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=AwQVwjJeo68",
      "title": "Surah Mulk | Full Recitation with Bengali Translation",
      "description": "কুরআন তিলাওয়াত (সূরা)",
      "channelName": "YouTube",
      "category": "Surah",
      "originalCategory": "Surah",
      "id": "video-AwQVwjJeo68",
      "likes": 0,
      "createdAt": now - 46 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=xm9OiXWGTXE",
      "title": "সূরা ইয়াসীন বাংলা অর্থসহ - Surah Yasin With Bangla Translation",
      "description": "কুরআন তিলাওয়াত (সূরা)",
      "channelName": "YouTube",
      "category": "Surah",
      "originalCategory": "Surah",
      "id": "video-xm9OiXWGTXE",
      "likes": 0,
      "createdAt": now - 47 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=vl85f9M5liY",
      "title": "হৃদয় জুড়ানো তেলাওয়াত। সুরা ইয়াসিন। বাংলা অনুবাদ সহ",
      "description": "কুরআন তিলাওয়াত (সূরা)",
      "channelName": "YouTube",
      "category": "Surah",
      "originalCategory": "Surah",
      "id": "video-vl85f9M5liY",
      "likes": 0,
      "createdAt": now - 48 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=YLkXsn98tLE",
      "title": "Surah Al-Waqi'ah with Bangla translation - Mishari Al Afasy",
      "description": "কুরআন তিলাওয়াত (সূরা)",
      "channelName": "YouTube",
      "category": "Surah",
      "originalCategory": "Surah",
      "id": "video-YLkXsn98tLE",
      "likes": 0,
      "createdAt": now - 49 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=JLR-A1CRrk8",
      "title": "Most heart touching recitation of Surah Waqiah",
      "description": "কুরআন তিলাওয়াত (সূরা)",
      "channelName": "YouTube",
      "category": "Surah",
      "originalCategory": "Surah",
      "id": "video-JLR-A1CRrk8",
      "likes": 0,
      "createdAt": now - 50 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=Io0WdUNVZPc",
      "title": "Surah Al-Kahf with Bangla translation - Mishari Al Afasy",
      "description": "কুরআন তিলাওয়াত (সূরা)",
      "channelName": "YouTube",
      "category": "Surah",
      "originalCategory": "Surah",
      "id": "video-Io0WdUNVZPc",
      "likes": 0,
      "createdAt": now - 51 * 24 * 60 * 60 * 1000
    },
    {
      "embedCode": "https://www.youtube.com/watch?v=Rjo1MueB6-I",
      "title": "সূরা আল কাহফ - আবেগময় তেলাওয়াত, বাংলা অনুবাদসহ",
      "description": "কুরআন তিলাওয়াত (সূরা)",
      "channelName": "YouTube",
      "category": "Surah",
      "originalCategory": "Surah",
      "id": "video-Rjo1MueB6-I",
      "likes": 0,
      "createdAt": now - 52 * 24 * 60 * 60 * 1000
    }
  ];
};

export const getInitialCourses = (): Course[] => {
  return [
    {
      id: "course-motivation",
      name: "Motivation",
      description: "সাধারণ মোটিভেশন",
      videoIds: ["video-7VLfGpO8rIM", "video-8QaiTOgbNtI", "video-BlPn1QwrvoE", "video-9Rd9svvCshQ", "video-LNuB8wRweMI", "video-Dygw7wr6itQ", "video-LidEi7ZOU84", "video-Cnq18be7lyA", "video-fhlox0OkPnk"],
      createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000
    },
    {
      id: "course-admission-motivation",
      name: "Admission Motivation",
      description: "ভর্তি প্রস্তুতি ও মোটিভেশন",
      videoIds: ["video-KmKosIEMc_A", "video-QEkLk4IIrA0", "video-e0s9xTY_E30", "video-fObiwtcurKU", "video-953RYwVCkDg", "video-jWgXkvl4AoI"],
      createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000
    },
    {
      id: "course-productivity",
      name: "Productivity",
      description: "প্রোডাক্টিভিটি ও টাইম ম্যানেজমেন্ট",
      videoIds: ["video-xKc2VWj66TQ", "video-YAAYiiIFF8Y", "video-CbrBXGyG0GY", "video-eN83dSLsDF0", "video-QPFgjwI8LFI", "video-ATdRtfp2-dE"],
      createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000
    },
    {
      id: "course-loneliness",
      name: "Loneliness",
      description: "একাকীত্ব",
      videoIds: ["video-0PesyWdhxTY", "video-V2fAZ0WTqzw", "video-fP7GhEVf4Zs", "video-pxhkwtBqaQw", "video-ZRsS_fKtnsk", "video-gvDFj-qooH8"],
      createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000
    },
    {
      id: "course-disappointment",
      name: "Disappointment",
      description: "হতাশা ও ব্যর্থতা",
      videoIds: ["video-jcCsv4XJ0JY", "video-kIfynxyDrTI", "video-MCa6e6o6tNI", "video-BZSwqMtnHrQ", "video-NAjpQb6PDp8", "video-o0ko0yQnC8k"],
      createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000
    },
    {
      id: "course-self-improvement",
      name: "Self Improvement",
      description: "নিজেকে গড়ে তোলা",
      videoIds: ["video-qkti90_y6IQ", "video-66IK1UkwNl4", "video-jJPwbwnKkYU", "video-e00jogs5U4k", "video-D804JAP5brQ", "video-Mwq53eIcTtQ", "video-mCMbGUstW6U"],
      createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000
    },
    {
      id: "course-surah",
      name: "Surah Collection",
      description: "কুরআন তিলাওয়াত (সূরা)",
      videoIds: ["video-ktspzVatcX8", "video-ieHCmmiYKIQ", "video-9h2ud0FUGrs", "video-AwQVwjJeo68", "video-xm9OiXWGTXE", "video-vl85f9M5liY", "video-YLkXsn98tLE", "video-JLR-A1CRrk8", "video-Io0WdUNVZPc", "video-Rjo1MueB6-I"],
      createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000
    }
  ];
};

export const getInitialComments = (): Comment[] => {
  return [];
};
