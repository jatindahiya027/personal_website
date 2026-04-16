/**
 * Blog post: Building Electron Apps That Don't Suck
 * Edit this file to update this post's content.
 */
const post = {
  slug:        "building-electron-apps-that-dont-suck",
  title:       "Building Electron Apps That Don't Suck",
  excerpt:     "Electron gets a bad reputation for being slow and memory-hungry. Here's how I built Stag — a snappy, native-feeling desktop app — and what I learned along the way.",
  date:        "2025-01-18",
  readTime:    "8 min read",
  tags:        ["Electron", "JavaScript", "Desktop", "Performance"],
  coverColor:  "linear-gradient(135deg, #1a1916 0%, #3d3a35 100%)",
  content: [
    { type: "p", text: "Every developer who has used Notion, VS Code, or Discord has used an Electron app without realising it. Electron lets you build cross-platform desktop software using web technologies — HTML, CSS, and JavaScript. But with that power comes a reputation: 'It's slow.' 'It eats RAM.' 'It's not a real app.'" },
    { type: "p", text: "I built Stag, a reference image manager for designers and artists, using Electron. Here's what I learned about making it feel fast and native — not like a bloated Chrome tab wearing a trenchcoat." },
    { type: "h2", text: "Why Electron?" },
    { type: "p", text: "The alternative was learning Swift, Objective-C, or C++ to target native APIs. For a solo project with a web-developer background, Electron was the pragmatic choice. The goal was to ship something useful, not to win points for purity." },
    { type: "quote", text: "Build things that matter to you. The technology is a means, not the end.", author: "Something I had to keep reminding myself" },
    { type: "h2", text: "The Performance Traps" },
    { type: "p", text: "Electron's main process and renderer process communicate via IPC (inter-process communication). The biggest mistake beginners make is sending large payloads — like entire image buffers — over IPC on every event. This blocks the main thread and makes the app feel sluggish." },
    { type: "h3", text: "What I did instead" },
    { type: "ul", items: [
      "Store image file paths in the main process, never the buffers themselves",
      "Load thumbnails lazily — only when the image enters the viewport",
      "Use contextBridge to expose a minimal, typed API to the renderer",
      "Batch IPC calls instead of one call per image when loading a folder",
    ]},
    { type: "h2", text: "Making It Feel Native" },
    { type: "p", text: "The UI was built with vanilla CSS and JavaScript — no framework overhead. I used CSS variables extensively so the app could respond to the OS dark/light mode toggle. nativeTheme in Electron gives you the current system theme, and you pipe it to a CSS class on the body element." },
    { type: "code", lang: "js", text: `const { nativeTheme } = require('electron');

nativeTheme.on('updated', () => {
  const theme = nativeTheme.shouldUseDarkColors ? 'dark' : 'light';
  mainWindow.webContents.executeJavaScript(
    \`document.body.setAttribute('data-theme', '\${theme}')\`
  );
});` },
    { type: "h2", text: "The Chrome Extension Side" },
    { type: "p", text: "One of Stag's killer features is the Chrome Extension integration — you drag an image from any webpage into the extension, and it appears in the desktop app instantly. This works via a local WebSocket server running inside Electron. The extension connects to ws://localhost:7788 and sends image data when you drag." },
    { type: "h2", text: "Lessons Learned" },
    { type: "ol", items: [
      "Profile before optimising — most of my assumptions about bottlenecks were wrong",
      "Keep the main process lean; it's the heartbeat of the whole app",
      "Lazy loading images isn't optional in an app that handles hundreds of files",
      "Ship early, even if it's rough — user feedback is more valuable than another week of polish",
    ]},
    { type: "p", text: "Stag is open source on GitHub. If you're building a desktop app with Electron and want to dig into the code, feel free to poke around." },
  ],
};

export default post;
