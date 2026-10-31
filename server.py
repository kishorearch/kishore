"""
Simple local HTTP server to host and preview the NEO•CHURN Dashboard.
Runs on http://localhost:8080 and automatically launches the web browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def start_server():
    os.chdir(DIRECTORY)
    
    # Allow address reuse
    socketserver.TCPServer.allow_reuse_address = True
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}/index.html"
        print("=" * 60)
        print(f" NEO*CHURN REAL-TIME ANALYSIS DASHBOARD RUNNING")
        print(f" URL: {url}")
        print("=" * 60)
        
        # Open in default web browser
        webbrowser.open(url)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer terminated by user.")

if __name__ == "__main__":
    start_server()
