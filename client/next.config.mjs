/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "avatars.githubusercontent.com",
      "cdn.pixabay.com",
      "i.pinimg.com",
      "images.unsplash.com",
      "images.hitpaw.com",
      "media.istockphoto.com",
      "via.placeholder.com",
      "encrypted-tbn0.gstatic.com",
      "photosbull.com",
      "cutegirlpic.in",
      "cdn.lazyshop.com",
      "staticg.sportskeeda.com",
      "vsthemes.org",
      "m.media-amazon.com", // <-- added this one
    ],
  },
};

export default nextConfig;
