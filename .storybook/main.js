module.exports = {
  stories: [
    "../packages/folo-values/src/stories/*.stories.@(js|jsx|ts|tsx)",
    "../packages/folo-layout/src/stories/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
};
