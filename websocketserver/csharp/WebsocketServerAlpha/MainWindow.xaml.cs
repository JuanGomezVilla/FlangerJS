using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Text.RegularExpressions;
using System.Net;
using System.IO;
using System.Net.Sockets;
using System.Threading;

namespace WebsocketServerAlpha {

    public partial class MainWindow : Window {
        //Servidor y ruta a la carpeta con los archivos del servidor
        WebServer htmlServer = null!;
        List<Socket> currentClients = new List<Socket>();
		TcpListener server  = null!;
        Thread tareaIniciarServidor = null!;
        string pathFolderHTML = null!;
        List<Thread> hilosEjecucion = null!;

        public MainWindow(){
            InitializeComponent();
        }

        void textBoxPortHtmlTextChanged(object sender, EventArgs e){
            buttonStartServer.IsEnabled = enableIfButtonStart();
		}

        void textBoxPortWebsocketTextChanged(object sender, EventArgs e){
            buttonStartServer.IsEnabled = enableIfButtonStart();
		}

        string SendResponse(HttpListenerRequest request){
      	    return File.ReadAllText(pathFolderHTML +"/"+ request.RawUrl);
      	}

        void buttonDefault_Click(object sender, RoutedEventArgs e){
            //Establece los valor por defecto
            textBoxFolderName.Text = "static";
			textBoxPortHtml.Text = "8000";
            textBoxPortWebsocket.Text = "8080";
		}

        void enableTextBoxs(bool enabled = true){
            textBoxPortHostname.IsEnabled = enabled;
            textBoxPortWebsocket.IsEnabled = enabled;
            textBoxPortHtml.IsEnabled = enabled;
            textBoxFolderName.IsEnabled = enabled;
        }

        

        private void NumberValidationTextBox(object sender, TextCompositionEventArgs e){
            //Evita que el usuario escriba datos que no son números
            e.Handled = !Utils.isNumber(e.Text);
        }

        bool enableIfButtonStart(){
            string portWebsocket = textBoxPortWebsocket.Text;
            string portHTML = textBoxPortHtml.Text;

            return (portWebsocket != portHTML) && Utils.isNumber(portWebsocket) && Utils.isNumber(portHTML);
        }

        private void AvoidStringPasting(object sender, DataObjectPastingEventArgs e){

            if (e.DataObject.GetDataPresent(typeof(String))){
                String text = (String) e.DataObject.GetData(typeof(String));
                if (!Utils.isNumber(text))
                {
                    e.CancelCommand();
                }
            }
            else
            {
                e.CancelCommand();
            }
        }

        void buttonStartServer_Click(object sender, RoutedEventArgs e){
            //Cambiar el estado de los botones
            buttonStopServer.IsEnabled = true;
            buttonDefault.IsEnabled = false;
            buttonStartServer.IsEnabled = false;

            //Cambiar el estado de las cajas
            enableTextBoxs(false);

            //Capturar el nombre de la carpeta donde está los archivos HTML, iniciar el servidor
            pathFolderHTML = textBoxFolderName.Text;
            htmlServer = new WebServer(SendResponse, "http://localhost:"+ Convert.ToString(textBoxPortHtml.Text) +"/");
            
            tareaIniciarServidor = new Thread(SocketThreadFunc);
     		tareaIniciarServidor.IsBackground = true;
        	tareaIniciarServidor.Start();
            htmlServer.init();
                   
        }

        void buttonStopServer_Click(object sender, RoutedEventArgs e){
            //Detener el servidor
            htmlServer.stopServer();

            
            tareaIniciarServidor.Interrupt();
			foreach(Thread hilo in hilosEjecucion){
				hilo.Interrupt();
			}
			server.Stop();
            
            buttonDefault.Content = server == null;

            buttonStopServer.IsEnabled = false;
                buttonDefault.IsEnabled = true;
                buttonStartServer.IsEnabled = true;
                enableTextBoxs(true);
            
        }
public bool IsConnected(Socket socket)
		  {
		    try
		    {
		      return !(socket.Poll(1, SelectMode.SelectRead) && socket.Available == 0);
		    }
		    catch (SocketException) { return false; }
		  }
		
		public void SocketThreadFunc(/*object state*/){
			//Comprueba si el texto es un número
			
				
				//Configura el servidor (crea unos clientes con un puerto)
				currentClients = new List<Socket>();
       			server = new TcpListener(IPAddress.Parse("127.0.0.1"), 8080);
       			hilosEjecucion = new List<Thread>();
       			
       			//Inicia el servidor
       			server.Start();
       			
       			//Mensaje de información
       			//appendTextToConsole("Server started at localhost:"+ port.ToString() +"\n", Color.Yellow);
				
       			//Por siempre, escucha ante la creación de nuevas conexiones
       			while(true){
       				//Espera a un nuevo cliente
       				Socket client;
       				try{
       					 client = server.AcceptSocket();
       				} catch(Exception){
       					
       					break;
       				}
	                
	                //Si el cliente se conecta al servidor
	                if(client.Connected){
	                	//El cliente se añade a la lista, y se inicia un proceso de escucha con ese cliente
		            	currentClients.Add(client);
		                Thread nuevoHilo = new Thread(() => Listeners(client));
		                
		                //El hilo se ejecutará en background y lo iniciará
		                nuevoHilo.IsBackground = true;
		                nuevoHilo.Start();
		                hilosEjecucion.Append(nuevoHilo);
	                }                    
            	}
       			
       			//Ya no aceptará más clientes, pero lo que hay que hacer es cerrar la conexión
       			Console.WriteLine("Cerrado");
       			server.Stop();
       			foreach(Socket putoCliente in currentClients){
       				putoCliente.Close();
       			}
			
	    }
		
        
        
        
         void Listeners(Socket client){
			//Un cliente se conecta al servidor
            NetworkStream stream = new NetworkStream(client);
            
            Console.WriteLine("Clientes activos: "+ currentClients.Count());
            try {
            //Por siempre
            while(true){
            	Console.WriteLine("Buenas");
                while (!stream.DataAvailable) ;
                while (client.Available < 3) ; // match against "get"

                byte[] bytes = new byte[client.Available];
                stream.Read(bytes, 0, bytes.Length);
                string s = Encoding.UTF8.GetString(bytes);

                if (Regex.IsMatch(s, "^GET", RegexOptions.IgnoreCase))
                {
                    string swk = Regex.Match(s, "Sec-WebSocket-Key: (.*)").Groups[1].Value.Trim();
                    string swka = swk + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
                    byte[] swkaSha1 = System.Security.Cryptography.SHA1.Create().ComputeHash(Encoding.UTF8.GetBytes(swka));
                    string swkaSha1Base64 = Convert.ToBase64String(swkaSha1);

                    // HTTP/1.1 defines the sequence CR LF as the end-of-line marker
                    byte[] response = Encoding.UTF8.GetBytes(
                        "HTTP/1.1 101 Switching Protocols\r\n" +
                        "Connection: Upgrade\r\n" +
                        "Upgrade: websocket\r\n" +
                        "Sec-WebSocket-Accept: " + swkaSha1Base64 + "\r\n\r\n");

                    stream.Write(response, 0, response.Length);
                }
                else {
                    var text = DecodeMessage(bytes); 
                    var otherClients = currentClients.Where(
                            c => c.RemoteEndPoint != client.RemoteEndPoint
                        ).ToList();

                    if (otherClients.Count > 0)
                    {
                        foreach (var cli in otherClients)
                        {
                            var sendMessage = Utils.EncodeMessageToSend(text);
                            cli.Send(sendMessage);
                        }
                    }
                }
            }
            } catch(Exception){
            	
            }
            client.Close();
        }

         string DecodeMessage(byte[] bytes)
        {
            var secondByte = bytes[1];
            var dataLength = secondByte & 127;
            var indexFirstMask = 2;
            if (dataLength == 126)
                indexFirstMask = 4;
            else if (dataLength == 127)
                indexFirstMask = 10;

            var keys = bytes.Skip(indexFirstMask).Take(4);
            var indexFirstDataByte = indexFirstMask + 4;

            var decoded = new byte[bytes.Length - indexFirstDataByte];
            for (int i = indexFirstDataByte, j = 0; i < bytes.Length; i++, j++)
            {
                decoded[j] = (byte)(bytes[i] ^ keys.ElementAt(j % 4));
            }

            return Encoding.UTF8.GetString(decoded, 0, decoded.Length);
        }

        
	}
    
}
