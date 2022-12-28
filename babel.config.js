module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
      [
        "module-resolver",
        {
          alias: {
            "db/*": ["src/db/*"],
      "theme/*": ["src/theme/*"],
      "components/*": ["src/components/*"],
      "constants/*": ["src/constants/*"],
      "i18n/*": ["src/i18n/*"],
      "hooks/*": ["src/hooks/*"],
      "navigation/*": ["src/navigation/*"],
      "screens/*": ["src/screens/*"]
          },
        },
      ],
      "react-native-reanimated/plugin"
    ],
  };
};
