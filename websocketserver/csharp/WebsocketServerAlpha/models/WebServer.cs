using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.IO;

namespace WebsocketServerAlpha {
    public class WebServer {
        private readonly HttpListener listener = new HttpListener();
        private readonly Func < HttpListenerRequest, string > _responderMethod;

        public WebServer(IReadOnlyCollection < string > prefixes, Func < HttpListenerRequest, string > method) {
            if (!HttpListener.IsSupported) throw new NotSupportedException("Needs Windows XP SP2, Server 2003 or later.");
            if (prefixes == null || prefixes.Count == 0) throw new ArgumentException("URI prefixes are required");
            if (method == null) throw new ArgumentException("responder method required");

            foreach(var prefix in prefixes) {
                listener.Prefixes.Add(prefix);
            }

            _responderMethod = method;
            listener.Start();
        }

        public WebServer(Func < HttpListenerRequest, string > method, params string[] prefixes): this(prefixes, method) {}

        public void init() {
            ThreadPool.QueueUserWorkItem(o => {
                try {
                    while (listener.IsListening) {
                        ThreadPool.QueueUserWorkItem(c => {
                            var ctx = c as HttpListenerContext;
                            try {
                                if (ctx == null) return;

                                var rstr = _responderMethod(ctx.Request);
                                var buf = Encoding.UTF8.GetBytes(rstr);
                                ctx.Response.ContentLength64 = buf.Length;
                                ctx.Response.OutputStream.Write(buf, 0, buf.Length);
                            } catch {
                                
                            } finally {
                                // always close the stream
                                if (ctx != null) ctx.Response.OutputStream.Close();
                            }
                        }, listener.GetContext());
                    }
                } catch (Exception){}
            });
        }

        public void stopServer() {
            listener.Stop();
            listener.Close();
        }
    }
}