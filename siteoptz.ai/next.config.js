module.exports = {
  turbopack: {
    root: __dirname
  },
  async redirects() {
    return [
      {
        source: '/dashboard',
        has: [
          {
            type: 'host',
            value: 'optz.siteoptz.ai',
          },
        ],
        destination: 'https://siteoptz.ai/dashboard',
        permanent: false,
      },
      {
        source: '/dashboard/:path*',
        has: [
          {
            type: 'host',
            value: 'optz.siteoptz.ai',
          },
        ],
        destination: 'https://siteoptz.ai/dashboard/:path*',
        permanent: false,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'optz.siteoptz.ai',
          },
        ],
        destination: 'https://siteoptz.ai/:path*',
        permanent: false,
      },
    ]
  },
}