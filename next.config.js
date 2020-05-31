const { WEB } = process.env

module.exports = {
  webpack: (config) =>
    Object.assign(config, {
      target: WEB === 'true' ? undefined : 'electron-renderer',
    }),
}
