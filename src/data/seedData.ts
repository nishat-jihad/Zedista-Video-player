import { Video, Course, Comment } from "../types";

export const getInitialVideos = (): Video[] => {
  const now = Date.now();
  return [
    {
      "embedCode": "<iframe width=\"767\" height=\"431\" src=\"https://www.youtube.com/embed/QWJb6-jFT3w\" title=\"HSC 2026 বাংলা রচনা সাজেশন | মাত্র ৫টি রচনা পড়লেই কি ১০০% কমন?\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
      "title": "HSC 2026 বাংলা রচনা সাজেশন | মাত্র ৫টি রচনা পড়লেই কি ১০০% কমন?",
      "description": "HSC 2026 ব্যাচের সবার জন্য — বাংলা রচনা নিয়ে আর টেনশন নয়! 🎯\nপুরো সিলেবাসের সব রচনা মুখস্থ করা প্রায় অসম্ভব, আর দরকারও নেই। এই ভিডিওতে Shakib Sir (Fahad's Tutorial) সবচেয়ে গুরুত্বপূর্ণ এবং বারবার কমন পড়া এমন ৫ ধরনের রচনা নিয়ে আলোচনা করেছেন, যেগুলো ঠিকভাবে আয়ত্ত করলে অল্প পড়েই বেশি কমন পাওয়া সম্ভব।\nএই ভিডিওতে যা যা পাবে:\n\n✅ HSC 2026 এর জন্য সবচেয়ে সম্ভাবময় ৫টি রচনা\n✅ কোন রচনা আগে পড়বে আর কোনটা পরে — সঠিক প্রায়োরিটি\n✅ পরীক্ষায় ভালো মার্কস পেতে রচনা গুছিয়ে লেখার কৌশল\n✅ শেষ মুহূর্তের প্রস্তুতির স্মার্ট টিপস",
      "channelName": "Rakib's Classroom - HSC",
      "channelLink": "https://www.youtube.com/@Rakibs_HSC",
      "category": "Recent",
      "originalCategory": "Recent",
      "id": "video-1782290744498",
      "createdAt": now - 10 * 60 * 1000, // 10 minutes ago
      "likes": 0,
      "duration": "12:15"
    },
    {
      "embedCode": "<iframe width=\"767\" height=\"431\" src=\"https://www.youtube.com/embed/Rbsj9_40-bA?list=PLi5fEbOt0If7Opn9oYIqxEkWMxFYRpbQZ\" title=\"ICT Chapter 3 Calculator Hacks - ক্যাল্কুলেটরেই সব MCQ! 🔥\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
      "title": "ICT Chapter 3 Calculator Hacks - ক্যাল্কুলেটরেই সব MCQ! 🔥",
      "description": "1:48 - ES/Es Plus\n36:57 - Ex\n1:12:23 - CW\n1:54:21 - MS",
      "channelName": "Rakib's Classroom - HSC",
      "channelLink": "https://www.youtube.com/@Rakibs_HSC",
      "category": "Recent",
      "originalCategory": "Recent",
      "id": "video-1782290612788",
      "createdAt": now - 25 * 60 * 1000, // 25 minutes ago
      "likes": 0,
      "duration": "2:08:45"
    },
    {
      "embedCode": "<iframe width=\"767\" height=\"431\" src=\"https://www.youtube.com/embed/wY9tfRNjzqU?list=PLi5fEbOt0If7Opn9oYIqxEkWMxFYRpbQZ\" title=\"ভেক্টর - Vector - ক্যালকুলেটর হ্যাক্স - 991 ES/ES plus, 991 EX, CW\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
      "title": "ভেক্টর - Vector - ক্যালকুলেটর হ্যাক্স - 991 ES/ES plus, 991 EX, CW",
      "description": "Es plus 1:15\n991 EX 20:24\nCW 34:30\ncommon for all 53:22",
      "channelName": "Rakib's Classroom - HSC",
      "channelLink": "https://www.youtube.com/@Rakibs_HSC",
      "category": "Recent",
      "originalCategory": "Recent",
      "id": "video-1782290559788",
      "createdAt": now - 40 * 60 * 1000, // 40 minutes ago
      "likes": 0,
      "duration": "58:24"
    },
    {
      "embedCode": "<iframe width=\"767\" height=\"431\" src=\"https://www.youtube.com/embed/k7sgHtBWSEM?list=PLi5fEbOt0If7Opn9oYIqxEkWMxFYRpbQZ\" title=\"যোগজীকরণের সব MCQ করে ফেলো ক্যাল্কুলেটরেই - 991 ES/ES plus, 991 EX, CW\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
      "title": "যোগজীকরণের সব MCQ করে ফেলো ক্যাল্কুলেটরেই - 991 ES/ES plus, 991 EX, CW",
      "description": "1:18  অন্টারীকরণ\n4:32 নিদিষ্ট যোগজ\n15:01 assumption method\n 22:52 option test \n26:53 নির্দিষ্ট যোগজ",
      "channelName": "Rakib's Classroom - HSC",
      "channelLink": "https://www.youtube.com/@Rakibs_HSC",
      "category": "Recent",
      "originalCategory": "Recent",
      "id": "video-1782290496208",
      "createdAt": now - 55 * 60 * 1000, // 55 minutes ago
      "likes": 0,
      "duration": "34:12"
    },
    {
      "embedCode": "<iframe width=\"767\" height=\"431\" src=\"https://www.youtube.com/embed/ld0g2bj6esQ?list=PLi5fEbOt0If7Opn9oYIqxEkWMxFYRpbQZ\" title=\"অন্টারীকরণের সব MCQ করে ফেলো ক্যাল্কুলেটরেই - 991 ES/ES plus, 991 EX, CW\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
      "title": "অন্টারীকরণের সব MCQ করে ফেলো ক্যাল্কুলেটরেই - 991 ES/ES plus, 991 EX, CW",
      "description": "15:10 Cw calculator\n53:11 Cw \n1:13:24 Cw\n𝗠𝗼𝗱𝘂𝗹𝘂𝘀 : catalogue > numeric calc> absolute value",
      "channelName": "Rakib's Classroom - HSC",
      "channelLink": "https://www.youtube.com/@Rakibs_HSC",
      "category": "Recent",
      "originalCategory": "Recent",
      "id": "video-1782290422076",
      "createdAt": now - 75 * 60 * 1000, // 1 hour 15m ago
      "likes": 0,
      "duration": "1:18:45"
    },
    {
      "embedCode": "<iframe width=\"767\" height=\"431\" src=\"https://www.youtube.com/embed/QYIw6Pg_VXE?list=PLi5fEbOt0If7Opn9oYIqxEkWMxFYRpbQZ\" title=\"বিপরীত ত্রিকোণমিতির সব MCQ করে ফেলো ক্যাল্কুলেটরেই - 991 ES/ES plus, 991 EX, CW\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
      "title": "বিপরীত ত্রিকোণমিতির সব MCQ করে ফেলো ক্যাল্কুলেটরেই - 991 ES/ES plus, 991 EX, CW",
      "description": "Basics\n1:26 > ES Plus\n4:46 > EX\n6:15 > CW\n\nProblem Solve\n8:02 > conversion\n11:12 \n11:55 > formula\n12:41 \n13:21\n14:06\n18:14\n19:14\n20:30\n22:26\n23:39\n25:36 > Assumption (constant / variable in options)\n33:13\n34:56\n37:17 > Equation Solving \n40:51\n42:53 > Option Test\n50:32\n52:39\n56:26 > Table\n1:02:30 > angle range given",
      "channelName": "Rakib's Classroom - HSC",
      "channelLink": "https://www.youtube.com/@Rakibs_HSC",
      "category": "Recent",
      "originalCategory": "Recent",
      "id": "video-1782290356245",
      "createdAt": now - 105 * 60 * 1000, // 1 hour 45m ago
      "likes": 0,
      "duration": "1:08:15"
    },
    {
      "embedCode": "<iframe width=\"767\" height=\"431\" src=\"https://www.youtube.com/embed/614V4t76tss?list=PLi5fEbOt0If7Opn9oYIqxEkWMxFYRpbQZ\" title=\"বহুপদী সমীকরণের সব MCQ করে ফেলো ক্যাল্কুলেটরেই - 991 ES/ES plus, 991 EX, CW\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
      "title": "বহুপদী সমীকরণের সব MCQ করে ফেলো ক্যাল্কুলেটরেই - 991 ES/ES plus, 991 EX, CW",
      "description": "0:58 -  ES Plus Series\n21:25 - Ex Series\n44:52 - CW Series\n1:09:14 Common For all Calculator",
      "channelName": "Rakib's Classroom - HSC",
      "channelLink": "https://www.youtube.com/@Rakibs_HSC",
      "category": "Recent",
      "originalCategory": "Recent",
      "id": "video-1782290274526",
      "createdAt": now - 135 * 60 * 1000, // 2 hours 15m ago
      "likes": 0,
      "duration": "1:15:40"
    },
    {
      "embedCode": "<iframe width=\"767\" height=\"431\" src=\"https://www.youtube.com/embed/MX1re8Iql0Y?list=PLi5fEbOt0If7Opn9oYIqxEkWMxFYRpbQZ\" title=\"জটীল সংখ্যার সব MCQ করে ফেলো ক্যাল্কুলেটরেই  - 991 ES/ES plus, 991 EX, CW\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
      "title": "জটিল সংখ্যার সব MCQ করে ফেলো ক্যাল্কুলেটরেই - 991 ES/ES plus, 991 EX, CW",
      "description": "0:58 -  ES Plus Series\n21:25 - Ex Series\n34:35 - CW Series\n52:00 Common For all Calculator\n\n44:50 এখানে (CW Calculator) মডুলাস আর আর্গুমেন্ট অন্যভাবেও বের করা যায়। জটিল সংখ্যাটি তুলে EXE তে চাপ দেওয়ার পর Format বাটনে ক্লিক করলে Polar Coord নামে একটা অপশন আসে। ঐখানে চাপ দিলে মডুলাস আর আর্গুমেন্ট একসাথেই এসে পড়ে অন্য ক্যালকুলেটর গুলার মতো। তাহলে আর কষ্ট করে বের করতে হয় না। আর Rectangular Coord এ চাপ দিলে a+bi আকারে আসে।",
      "channelName": "Rakib's Classroom - HSC",
      "channelLink": "https://www.youtube.com/@Rakibs_HSC",
      "category": "Recent",
      "originalCategory": "Recent",
      "id": "video-1782290213569",
      "createdAt": now - 165 * 60 * 1000, // 2 hours 45m ago
      "likes": 0,
      "duration": "56:50"
    },
    {
      "embedCode": "<iframe width=\"767\" height=\"431\" src=\"https://www.youtube.com/embed/ZiquEjEEidY?list=PLi5fEbOt0If7Opn9oYIqxEkWMxFYRpbQZ\" title=\"ত্রিকোণমিতির সব MCQ করে ফেলো ক্যাল্কুলেটরেই  - 991 ES/ES plus, 991 EX, CW\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
      "title": "ত্রিকোণমিতির সব MCQ করে ফেলো ক্যাল্কুলেটরেই - 991 ES/ES plus, 991 EX, CW",
      "description": "Trigonometry Calculator Basics\n0:41 ES plus \n8:19 EX\n12:09 CW\n\nProblem Solve\n17:43\n18:45 > direct value finding\n19:33\n20:06\n20:40\n21:38 > finding value of a different ratio\n22:52\n23:37\n24:21\n26:33 > Category 1 Assumption\n28:40\n29:44\n31:01\n31:39 > Category 2 Assumption\n35:13\n35:21\n36:49 > better avoid assumption\n38:33\n42:20 > Option Test\n44:25 > Assumption + Option Test\n49:58\n52:30\n56:06\n57:43\n58:37 > Properties of Triangle\n1:00:45\n1:02:55 > Calculator Table Basics\n1:12:24 > solving the 31:39 problem using table",
      "channelName": "Rakib's Classroom - HSC",
      "channelLink": "https://www.youtube.com/@Rakibs_HSC",
      "category": "Recent",
      "originalCategory": "Recent",
      "id": "video-1782290152413",
      "createdAt": now - 4 * 60 * 60 * 1000, // 4 hours ago (will age to Old)
      "likes": 0,
      "duration": "1:16:30"
    },
    {
      "embedCode": "<iframe width=\"767\" height=\"431\" src=\"https://www.youtube.com/embed/vqUuah_v9w0?list=PLi5fEbOt0If7Opn9oYIqxEkWMxFYRpbQZ\" title=\"ম্যাট্রিক্স ও নির্ণায়কের সব MCQ করে ফেলো ক্যাল্কুলেটরেই - 991 ES/ES plus, 991 EX, CW\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
      "title": "ম্যাট্রিক্স ও নির্ণায়কের সব MCQ করে ফেলো ক্যাল্কুলেটরেই - 991 ES/ES plus, 991 EX, CW",
      "description": "Fx 991 ES Plus - 1:17\nFx 991 Ex - 15:45\nFx 991 Ex - 29:14\n\nCombined Hacks(Must for all calculator) - 47:34",
      "channelName": "Rakib's Classroom - HSC",
      "channelLink": "https://www.youtube.com/@Rakibs_HSC",
      "category": "Recent",
      "originalCategory": "Recent",
      "id": "video-1782290014411",
      "createdAt": now - 8 * 60 * 60 * 1000, // 8 hours ago (will age to Old)
      "likes": 0,
      "duration": "54:10"
    },
    {
      "embedCode": "<iframe width=\"767\" height=\"431\" src=\"https://www.youtube.com/embed/yO-qpIO6rQU?list=PLi5fEbOt0If7Rky9DdZePw4wNFJVbGxt4\" title=\"এক ক্লাসেই জটিল সংখ্যা ১০০% কাভার - Complex Number | HSC\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
      "title": "এক ক্লাসেই জটিল সংখ্যা ১০০% কাভার - Complex Number | HSC",
      "description": "ক্লাস নোট:\nhttps://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbUtleU9FWWROemR0UVBobnpLVXNJYmRkaG1Vd3xBQ3Jtc0tteVk4MVplWXZUUHFnQnAwQktyMHBSX29laGRfbF9YOFVXVms4LTN6MDBnSFpTdncwOUVRdE5wUm9hYWxMV0FlbTh1bEV6VWphSTl1N1Mxc1dhaUIxMzU1bFRwZG1telg0TUpjUTdlQkJJVVNXVnM1OA&q=https%3A%2F%2Fdrive.google.com%2Fdrive%2Ffolders%2F1lTxIwKoLeLVJz7zLfNDEGqIEJc2KQO5X%3Fusp%3Ddrive_link&v=yO-qpIO6rQU",
      "channelName": "Rakib's Classroom - HSC",
      "channelLink": "https://www.youtube.com/@Rakibs_HSC",
      "category": "Recent",
      "originalCategory": "Recent",
      "id": "video-1782289521009",
      "createdAt": now - 12 * 60 * 60 * 1000, // 12 hours ago (will age to Old)
      "likes": 0,
      "duration": "2:45:15"
    },
    {
      "embedCode": "<iframe width=\"767\" height=\"431\" src=\"https://www.youtube.com/embed/C1OAPt1Q26U?list=PLi5fEbOt0If7Rky9DdZePw4wNFJVbGxt4\" title=\"১ ক্লাসেই যোগাশ্রয়ী প্রোগ্রামিং ১০০% শেষ | HSC 🔥\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
      "title": "১ ক্লাসেই যোগাশ্রয়ী প্রোগ্রামিং ১০০% শেষ | HSC 🔥",
      "description": "ক্লাস নোট:\nhttps://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbVhIUldpMHNkWi1GM016RThVc2RmSDkwZ2lkd3xBQ3Jtc0ttajhNMVZzdEE4SE9uQUV6S2E4QW5hZWFNUUdJTnF4S1d1eEkwM09JYU1ROGhfbWVuVm01eFlhRVpXSWVsdDJkenlDU18zZnJIVmpTOV9TbklsX08yN0lxcnZoTGFNSFhlWGtLc21EMzRCc3Z0UVNKdw&q=https%3A%2F%2Fdrive.google.com%2Ffile%2Fd%2F1lTxIwKoLeLVJz7zLfNDEGqIEJc2KQO5X%3Fusp%3Dsharing&v=C1OAPt1Q26U",
      "channelName": "Rakib's Classroom - HSC",
      "channelLink": "https://www.youtube.com/@Rakibs_HSC",
      "category": "Recent",
      "originalCategory": "Recent",
      "id": "video-1782289427873",
      "createdAt": now - 16 * 60 * 60 * 1000, // 16 hours ago (will age to Old)
      "likes": 0,
      "duration": "1:38:20"
    },
    {
      "embedCode": "<iframe width=\"767\" height=\"431\" src=\"https://www.youtube.com/embed/dxU1TOy9jvM?list=PLi5fEbOt0If7Rky9DdZePw4wNFJVbGxt4\" title=\"বিপরীত ত্রিকোণমিতি - Inverse Trigonometry Oneshot Class!\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
      "title": "বিপরীত ত্রিকোণমিতি - Inverse Trigonometry Oneshot Class!",
      "description": "ক্লাস নোট:\nhttps://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbkhZR2J2OW5Zc29SY2ZpZjlVdHc3QnNhRTRlUXxBQ3Jtc0tsd1JCWXN1cjhuT0pSME9nN2lQd2RBTlhQWE9BaHF5YThGV1VDZGRKNmRRcmhoc0h6Y3Vjdkx5Qmk3Y3ZhS2hreUZaWjNzVjhZVzVRSmtKRUZhcVlQTWQwWF81Zkc1ZldGX3ZBQjlVNzZmZ3Z4MTQxRQ&q=https%3A%2F%2Fdrive.google.com%2Fdrive%2Ffolders%2F1lTxIwKoLeLVJz7zLfNDEGqIEJc2KQO5X%3Fusp%3Ddrive_link&v=dxU1TOy9jvM",
      "channelName": "Rakib's Classroom - HSC",
      "channelLink": "https://www.youtube.com/@Rakibs_HSC",
      "category": "Recent",
      "originalCategory": "Recent",
      "id": "video-1782289339915",
      "createdAt": now - 24 * 60 * 60 * 1000, // 1 day ago (will age to Old)
      "likes": 0,
      "duration": "2:12:40"
    },
    {
      "embedCode": "<iframe width=\"767\" height=\"431\" src=\"https://www.youtube.com/embed/nK0yjjK37cQ?list=PLi5fEbOt0If7GPA9drHO5PKkLY81VE\" title=\"বাংলা ১ম পত্র MCQ ম্যারাথন ক্লাস — সর্বোচ্চ কমন পাওয়ার সম্ভাবনা 🔥|| Omar Faruq Sir\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
      "title": "বাংলা ১ম পত্র MCQ ম্যারাথন ক্লাস — সর্বোচ্চ কমন পাওয়ার সম্ভাবনা 🔥|| Omar Faruq Sir",
      "description": "বাংলা ১ম পত্র MCQ ম্যারাথন ক্লাস — সর্বোচ্চ কমন পাওয়ার সম্ভাবনা || Omar Faruq Sir\n\nএই ক্লাসের কোনো লেকচার শীট নেই। পুরো ক্লাসটা অবশ্যই ভালোভাবে দেখবে এবং মূল বই ও FRB Bangla Compact Series বই থেকে প্র্যাক্টিস করবে।",
      "channelName": "Omar Faruq",
      "channelLink": "https://www.youtube.com/channel/UC05SEy8gbG3D_o_K3dBDyew",
      "category": "Recent",
      "originalCategory": "Recent",
      "id": "video-1782287743188",
      "createdAt": now - 2 * 24 * 60 * 60 * 1000, // 2 days ago (will age to Old)
      "likes": 0,
      "duration": "3:04:10"
    },
    {
      "embedCode": "<iframe width=\"767\" height=\"431\" src=\"https://www.youtube.com/embed/txl2S89xwnw?list=PL4XrhAetwHqHENrGPA9drHO5PKkLY81VE\" title=\"১ ক্লাসেই বাংলা ১ম পত্র (বাংলা সহপাঠ) ১০০% কভার 🔥 — HSC Bangla 1st Paper One Shot | Omar Faruq Sir\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
      "title": "১ ক্লাসেই বাংলা ১ম পত্র (বাংলা সহপাঠ) ১০০% কভার 🔥 — HSC Bangla 1st Paper One Shot | Omar Faruq Sir",
      "description": "বাংলা ১ম পত্র (বাংলা সহপাঠ) ওয়ানশট — ১ ক্লাসেই ১০০% কভার | HSC Bangla 1st Paper One Shot Class | Omar Faruq Sir\n\nক্লাস নোটঃhttps://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbDlGQVJYNVItcUwteEtnODdCODNyRV9pLWo4d3xBQ3Jtc0ttako2OVBNYzFNaG1EdGhMQWp3MFBFRThSVjZWRkxFNDVLS3ZtQ1dqTkhGdzN0T3ZUWG5qVkdaM1gzRjNDbkhFb01yd0VZOTIxbW5lZFptVW1uNVl0dGYyR3RvYklzWGlfWjR2cG1QdEZOQ2k5Q2VEMA&q=https%3A%2F%2Fdrive.google.com%2Ffile%2Fd%2F1Eq3GFK_xNmPjtMlIDIYDFAoU9Kd9IPaV%2Fview%3Fusp%3Ddrivesdk&v=txl2S89xwnw",
      "channelName": "Omar Faruq",
      "channelLink": "https://www.youtube.com/channel/UC05SEy8gbG3D_o_K3dBDyew",
      "category": "Recent",
      "originalCategory": "Recent",
      "id": "video-1782287641873",
      "createdAt": now - 3 * 24 * 60 * 60 * 1000, // 3 days ago (will age to Old)
      "likes": 0,
      "duration": "2:15:30"
    },
    {
      "embedCode": "<iframe width=\"767\" height=\"431\" src=\"https://www.youtube.com/embed/RI1y7DxcT70?list=PL4XrhAetwHqHENrGPA9drHO5PKkLY81VE\" title=\"১ ক্লাসেই ইংরেজি ২য় পত্র ১০০% কমপ্লিট 🔥 — English 2nd Paper One Shot | Mir MD Jalal Sumon Sir\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
      "title": "১ ক্লাসেই ইংরেজি ২য় পত্র ১০০% কমপ্লিট 🔥 — English 2nd Paper One Shot | Mir MD Jalal Sumon Sir",
      "description": "ইংরেজি ২য় পত্র ওয়ানশট — ১ ক্লাসেই ১০০% কভার | English 2nd Paper One Shot Class | Mir MD Jalal Sumon Sir\n\nক্লাস নোটঃhttps://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqa3Y0ZExMWHYwc3hzYnV4OWoxNVhJX2g5OWZWd3xBQ3Jtc0tsYWladFZ5ZnhsUUlhQlhDZHlaSmxVT1Z1UTkybXZLbXpSTndpNlowYUdXOGgzSVBfUzMxcXR4M3dfbGZNNHpOLTNIeWttcGxiSXdENkF5ZktYVVhNMUlnaUJGYnBraXhhYzgtTHJYcGs0bVZlX0ZCcw&q=https%3A%2F%2Fdrive.google.com%2Ffile%2Fd%2F1jpAZ-MxFTnKxmb1A3H5Wxmfm1gpAVlQV%2Fview%3Fusp%3Ddrivesdk&v=RI1y7DxcT70",
      "channelName": "UNLOCK English with Sumon",
      "channelLink": "https://www.youtube.com/channel/UC2fH6o-fzrrSRzJTXevrqeA",
      "category": "Recent",
      "originalCategory": "Recent",
      "id": "video-1782287519385",
      "createdAt": now - 4 * 24 * 60 * 60 * 1000, // 4 days ago (will age to Old)
      "likes": 0,
      "duration": "3:52:15"
    },
    {
      "embedCode": "<iframe width=\"767\" height=\"431\" src=\"https://www.youtube.com/embed/sSWsrnn0qa0?list=PL4XrhAetwHqHENrGPA9drHO5PKkLY81VE\" title=\"১ ক্লাসেই বাংলা ২য় পত্র ১০০% কভার 🔥 — HSC Bangla 2nd Paper One Shot | Omar Faruq Sir\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
      "title": "১ ক্লাসেই বাংলা ২য় পত্র ১০০% কভার 🔥 — HSC Bangla 2nd Paper One Shot | Omar Faruq Sir",
      "description": "বাংলা ২য় পত্র ওয়ানশট — ১ ক্লাসেই ১০০% কভার | Bangla 2nd Paper One Shot Class | Omar Faruq Sir\n\nক্লাস নোটঃhttps://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbHlJNGNmMFhodzY1dVdIU011Z2ZJZ1IzVGdOZ3xBQ3Jtc0tubDc3QjBHb1NMTlktZUppRVJXSEtGZzNkVGc4b1dKek9WaERLbkhwV1JiNkNiaFU1V3lNckFyVFRoSXI4cVpCOWFyUGpVeUpVZzNyaDBGRmxzOWlTUVJHbXBLTkJKWnRONWRNRXQ0dXl2YVBSQVlzbw&q=https%3A%2F%2Fdrive.google.com%2Ffile%2Fd%2F1BrvqvJnuUceiO_tqoIcZ5wwa78nmxfRd%2Fview%3Fusp%3Ddrivesdk&v=sSWsrnn0qa0",
      "channelName": "Omar Faruq",
      "channelLink": "https://www.youtube.com/channel/UC05SEy8gbG3D_o_K3dBDyew",
      "category": "Recent",
      "originalCategory": "Recent",
      "id": "video-1782287431814",
      "createdAt": now - 5 * 24 * 60 * 60 * 1000, // 5 days ago (will age to Old)
      "likes": 0,
      "duration": "2:38:10"
    },
    {
      "embedCode": "<iframe width=\"767\" height=\"431\" src=\"https://www.youtube.com/embed/jegosLHD8vs?list=PL4XrhAetwHqHENrGPA9drHO5PKkLY81VE\" title=\"১ ক্লাসেই ইংরেজি ১ম পত্র ১০০% কমপ্লিট 🔥 — English 1st Paper HSC One Shot | Mir MD Jalal Sumon Sir\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
      "title": "১ ক্লাসেই ইংরেজি ১ম পত্র ১০০% কমপ্লিট 🔥 — English 1st Paper HSC One Shot | Mir MD Jalal Sumon Sir",
      "description": "ইংরেজি ১ম পত্র ওয়ানশট — ১ ক্লাসেই ১০০% কভার | English 1st Paper HSC One Shot Class | Mir MD Jalal Sumon Sir\n\nক্লাস নোটঃhttps://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbmxrblBnSWZyelVpWE5heW5qOWlWMDRoaThEZ3xBQ3Jtc0tsdnBjTkFEbW10dl9ObERLaGhxLUZja0FGaWFxQmFLaUVZTEJwTFZwOFVaR1M2YVFGSk9hZXFZTEJWX3lydG5WNHFNdUNIV1Q1NjdYYkdvRWpySzM0TjB6Rk1KTzMzanRIU2VEdFc0SmdMdjl1Y1ZCaw&q=https%3A%2F%2Fdrive.google.com%2Ffile%2Fd%2F17qn0q4cgU1_ak_DPc2bI_bFYgwcy2fV6%2Fview%3Fusp%3Ddrivesdk&v=jegosLHD8vs",
      "channelName": "UNLOCK English with Sumon",
      "channelLink": "https://www.youtube.com/channel/UC2fH6o-fzrrSRzJTXevrqeA",
      "category": "Recent",
      "originalCategory": "Recent",
      "id": "video-1782287340247",
      "createdAt": now - 6 * 24 * 60 * 60 * 1000, // 6 days ago (will age to Old)
      "likes": 0,
      "duration": "3:14:20"
    },
    {
      "embedCode": "<iframe width=\"767\" height=\"431\" src=\"https://www.youtube.com/embed/L_TDshu8WLs?list=PL4XrhAetwHqHENrGPA9drHO5PKkLY81VE\" title=\"১ ক্লাসেই বাংলা ১ম পত্র (গদ্য+পদ্য) ১০০% কভার 🔥 — HSC Bangla 1st Paper One Shot | Omar Faruq Sir\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
      "title": "১ ক্লাসেই বাংলা ১ম পত্র (গদ্য+পদ্য) ১০০% কভার 🔥 — HSC Bangla 1st Paper One Shot | Omar Faruq Sir",
      "description": "ক্লাস নোটঃ\nhttps://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqa2xUZkk1RUVWcEE2UHZMSldrLTFQRUFSa2E4UXxBQ3Jtc0ttaGpadGtvczB3NmJRNkV5cmFYQ0t0VHQwams1TnU5N2NpRmFUUDVpVmN2SWhLMWQzd3Z2MjUzMXAzNk5DWUg5bmJkSkZ4eTNCbXpLaFVabnFlSUtudEdFdVVqNnVnQWhOZ2ZnWXBKQzYtbW8xZ0hiUQ&q=https%3A%2F%2Fdrive.google.com%2Ffile%2Fd%2F15mpRCxaQYRg3fWrFCOH-G6GgMzabYNCn%2Fview%3Fusp%3Ddrivesdk&v=L_TDshu8WLs",
      "channelName": "Omar Faruq",
      "channelLink": "https://www.youtube.com/channel/UC05SEy8gbG3D_o_K3dBDyew",
      "category": "Recent",
      "originalCategory": "Recent",
      "id": "video-1782287139005",
      "createdAt": now - 7 * 24 * 60 * 60 * 1000, // 7 days ago (will age to Old)
      "likes": 0,
      "duration": "4:28:45"
    },
    {
      "embedCode": "<iframe width=\"767\" height=\"431\" src=\"https://www.youtube.com/embed/JA7J7vMF1hk\" title=\"অন্টারীকরণ HSC🔥CQ Shot Series || Higher Math 1st Paper Chapter 9 | Differentiation\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
      "title": "অন্তরীকরণ HSC🔥CQ Shot Series || Higher Math 1st Paper Chapter 9 | Differentiation",
      "description": "📌Class note : https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqazBsUWhCMTFFejl0Qm1JSGt3MlVFSklOZ3VBUXxBQ3Jtc0trOUJPd0xhYmNKRDBVU0pNTWYxZlhpQUNPTVZLVV9PQTZzcnlnWGRJWDVKV0t1eFlsZUhjZWlOVVNPUlE2SW51azJidnNWZXAwVFRqYnZueXplQ2JwRmd5M1NNWFVvU0x0cHB4U2dpbmlZQnE1MDMwdw&q=https%3A%2F%2Fdrive.google.com%2Ffile%2Fd%2F1asVrUg0Cl8ao82ljf0HrJPE2o_g80pwQ%2Fview%3Fusp%3Dsharing&v=JA7J7vMF1hk\n\nঅন্তরীকরণ  | Higher Math 1st Paper Chapter 9 | Diferentiation | CQ Shot Series",
      "channelName": "Dipit's learning point",
      "channelLink": "https://www.youtube.com/@Dipits_Learning_Point",
      "category": "Recent",
      "originalCategory": "Recent",
      "id": "video-1782286733268",
      "createdAt": now - 8 * 24 * 60 * 60 * 1000, // 8 days ago (will age to Old)
      "likes": 0,
      "duration": "1:12:10"
    },
    {
      "embedCode": "<iframe width=\"767\" height=\"431\" src=\"https://www.youtube.com/embed/DKSpBV109fE\" title=\"১ ক্লাসেই অন্তরীকরণ ১০০% শেষ - Differentiation | HSC\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
      "title": "১ ক্লাসেই অন্তরীকরণ ১০০% শেষ - Differentiation | HSC",
      "description": "ক্লাস নোট:\nhttps://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqazhpajlTWjA2cUJvdEdiQ0d1WUZUVXl2bDUwQXxBQ3Jtc0trUnBHRkhLQk5wYkZsUmZTcF9lUFRWa1hQeGlKSlc0Vm5UZ2Q1TW5XZlZWR1NiZVVwblE1ZUV5Qkp5VmNIckxzUzdEUFlJVUFQS0pQaUNHeXhXSWhSQUtRRWVKbGhQN2JpWkVzNU93Z3paWVVvTFI0cw&q=https%3A%2F%2Fdrive.google.com%2Fdrive%2Ffolders%2F1lTxIwKoLeLVJz7zLfNDEGqIEJc2KQO5X%3Fusp%3Ddrive_link&v=DKSpBV109fE",
      "channelName": "Rakib;s Classroom - HSC",
      "channelLink": "https://www.youtube.com/@Rakibs_HSC",
      "category": "Recent",
      "originalCategory": "Recent",
      "id": "video-1782286421296",
      "createdAt": now - 9 * 24 * 60 * 60 * 1000, // 9 days ago (will age to Old)
      "likes": 0,
      "duration": "2:48:30"
    }
  ];
};

export const getInitialCourses = (): Course[] => {
  return [
    {
      id: "course-hsc-math",
      name: "HSC Math Tricks & Hacks",
      description: "Quick calculator shortcut strategies and core comprehensive syllabus guide videos on Higher Math.",
      videoIds: ["video-1782290559788", "video-1782290496208", "video-1782290422076", "video-1782290356245", "video-1782290274526", "video-1782290213569", "video-1782290152413", "video-1782290014411", "video-1782286733268", "video-1782286421296"],
      createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000 // 30 days ago
    },
    {
      id: "course-hsc-humanities-science",
      name: "HSC Bangla & English Preparation",
      description: "Full syllabus review, suggestion matrices, and writing hacks for HSC candidates.",
      videoIds: ["video-1782290744498", "video-1782287743188", "video-1782287641873", "video-1782287519385", "video-1782287431814", "video-1782287340247", "video-1782287139005"],
      createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000 // 30 days ago
    }
  ];
};

export const getInitialComments = (): Comment[] => {
  return [
    {
      id: "comment-1",
      videoId: "video-1782290612788",
      username: "Areeb",
      text: "This calculator shortcut trick is exceptionally helpful for ICT examinations! Saving this for revision.",
      createdAt: Date.now() - 5 * 60 * 1000 // 5 minutes ago
    }
  ];
};
