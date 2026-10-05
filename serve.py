"""Preview the site locally with clean addresses, the same way GitHub Pages serves it.

    python serve.py          ->  http://localhost:8000
    python serve.py 8080     ->  http://localhost:8080

/design serves design.html, /resume serves resume.html, and so on.
"""
import http.server
import os
import sys
from urllib.parse import urlsplit, urlunsplit


class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def send_head(self):
        parts = urlsplit(self.path)
        local = self.translate_path(parts.path)
        if not os.path.exists(local) and os.path.isfile(local + ".html"):
            self.path = urlunsplit(("", "", parts.path + ".html", parts.query, ""))
        return super().send_head()


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    print(f"Previewing sandarika.com at http://localhost:{port}  (Ctrl+C to stop)")
    http.server.ThreadingHTTPServer(("127.0.0.1", port), CleanURLHandler).serve_forever()
