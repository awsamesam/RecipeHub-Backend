/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // أي طلب يبدأ بـ /api
        destination: "http://localhost:5000/api/:path*", // سيتم توجيهه إلى سيرفر الـ Express (تأكد من تعديل البورت 5000 إذا كان مختلفاً لديك)
      },
    ];
  },
};

module.exports = nextConfig;
