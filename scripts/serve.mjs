import http from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { resolve, extname, sep } from "node:path";

const root = resolve("out");
if (!existsSync(root)) throw new Error("Run npm run build before npm start.");
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".ttf": "font/ttf",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".xml": "application/xml",
};
const server = http.createServer((request, response) => {
  try {
    const pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    let file = resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(root + sep)) {
      response.writeHead(403).end();
      return;
    }
    if (existsSync(file) && statSync(file).isDirectory())
      file = resolve(file, "index.html");
    const found = existsSync(file) && statSync(file).isFile();
    if (!found) file = resolve(root, "404.html");
    response.writeHead(found ? 200 : 404, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    if (request.method === "HEAD") response.end();
    else createReadStream(file).pipe(response);
  } catch {
    response.writeHead(400).end("Bad request");
  }
});

const startPort = Number.parseInt(process.env.PORT || "3000", 10);
if (!Number.isInteger(startPort) || startPort < 1 || startPort > 65535)
  throw new Error(`Invalid PORT: ${process.env.PORT}`);

function listen(port) {
  const onError = (error) => {
    server.off("listening", onListening);
    if (error.code === "EADDRINUSE" && port < 65535) {
      console.warn(`Port ${port} is in use; trying ${port + 1}…`);
      listen(port + 1);
      return;
    }
    throw error;
  };
  const onListening = () => {
    server.off("error", onError);
    console.log(`Portfolio preview: http://127.0.0.1:${server.address().port}`);
  };

  server.once("error", onError);
  server.once("listening", onListening);
  server.listen(port, "127.0.0.1");
}

listen(startPort);
