import socket
import threading
import SocketServer

class ThreadedTCPRequestHandler(SocketServer.StreamRequestHandler):

    def handle(self):
        self.wfile.write("Stop.\nWho would cross the Bridge of Death must answer me\nthese questions three, ere the other side he see.\n")

        self.wfile.write("What... is your name?\n")
        name = self.rfile.readline().strip()

        self.wfile.write("What... is your quest?\n")
        quest = self.rfile.readline().strip()

        if "arthur" in name.lower():
            self.wfile.write("What... is the air-speed velocity of an unladen swallow?\n")
        elif "robin" in name.lower():
            self.wfile.write("What... is the capital of Assyria?\n")
        else:
            self.wfile.write("What... is your favourite colour?\n")
        last_answer = self.rfile.readline().strip()

        self.wfile.write("Alright. Off you go.\n")

class ThreadedTCPServer(SocketServer.ThreadingMixIn, SocketServer.TCPServer):
    pass

if __name__ == "__main__":
    HOST, PORT = "localhost", 1975

    server = ThreadedTCPServer((HOST, PORT), ThreadedTCPRequestHandler)
    ip, port = server.server_address

    # Start a thread with the server -- that thread will then start one
    # more thread for each request
    server_thread = threading.Thread(target=server.serve_forever)
    # Don't exit the server thread when the main thread terminates
    server_thread.daemon = False
    server_thread.start()
