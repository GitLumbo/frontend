module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "inhalink-1995154e4ee2.herokuapp.com",
        port: "",
        pathname: "/media/**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.cache = false;
    return config;
  },
};
