import http.server
import socketserver
import os

PORT = 8000

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print(f"🚀 Сервер запущен на http://localhost:{PORT}")
    print("📁 Нажми Ctrl+C для остановки")
    httpd.serve_forever()