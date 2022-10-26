# Builder.io SEO Review Plugin

Plugin for extracting and processing html content of iframed preview areas within Builder.io platform.

The plugin sends the extracted iframe content, sends it to the SEO Review Tools API (https://api.seoreviewtools.com/) for real-time analysis based on the users' keyword input.

The plugin then displays the SEO data organised and visually clear.

## Installation

- `npm install`
- `npm run start`

Now the plugin will be running on `http://localhost:1268/plugin.system.js`

- Go to your Builder account settings, and add the local plugin to your list of plugins:

```
http://localhost:1268/plugin.system.js?pluginId=@builder.io/plugin-example-seo-review
```

\*\*\* Notice the pluginId param in the path above, it's necessary to save the plugin settings.
