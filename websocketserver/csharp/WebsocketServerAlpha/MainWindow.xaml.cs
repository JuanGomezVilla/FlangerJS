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

namespace WebsocketServerAlpha {

    public partial class MainWindow : Window {
        //Servidor y ruta a la carpeta con los archivos del servidor
        WebServer htmlServer = null!;
        string pathFolderHTML = null!;

        public MainWindow(){
            InitializeComponent();
        }

        void buttonDefault_Click(object sender, RoutedEventArgs e){
            //Establece los valor por defecto
            textBoxFolderName.Text = "static";
			textBoxPortHtml.Text = "8000";
            textBoxPortWebsocket.Text = "8080";
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
            htmlServer.init();
        }

        string SendResponse(HttpListenerRequest request){
      	    return File.ReadAllText(pathFolderHTML +"/"+ request.RawUrl);
      	}

        void enableTextBoxs(bool enabled = true){
            textBoxPortHostname.IsEnabled = enabled;
            textBoxPortWebsocket.IsEnabled = enabled;
            textBoxPortHtml.IsEnabled = enabled;
            textBoxFolderName.IsEnabled = enabled;
        }

        void buttonStopServer_Click(object sender, RoutedEventArgs e){
            //Detener el servidor
            htmlServer.stopServer();

            //Cambiar el estado de los botones
            buttonStopServer.IsEnabled = false;
            buttonDefault.IsEnabled = true;
            buttonStartServer.IsEnabled = true;

            //Cambia el estado de las cajas
            enableTextBoxs(true);
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

        void textBoxPortHtmlTextChanged(object sender, EventArgs e){
            buttonStartServer.IsEnabled = enableIfButtonStart();
		}

        void textBoxPortWebsocketTextChanged(object sender, EventArgs e){
            buttonStartServer.IsEnabled = enableIfButtonStart();
		}
    }
}
