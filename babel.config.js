module.exports = api => {
  api.cache(true);
  return {
    presets: ["babel-preset-folio-dev"]
  };
};
