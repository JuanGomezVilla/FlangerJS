using System;

namespace FJSDeveloper {
	class Program {		
		private static void opcion1(){
			Console.Clear();
			Console.WriteLine("Opción 1");
			Console.ReadKey(true);
		}
		
		
		public static void Main(string[] args){
			//CONFIGURACIONES DE LA VENTANA
			Console.Title = "FJSDeveloper";
			//Console.SetWindowSize(80, 20);
			bool running = true;
			
			//OPCIONES
			string[] opciones = {
				"Create FlangerJS.js",
				"Exit"
			};
			
			
			while(running){
				/Console.Clear();
				Console.WriteLine("================================================");
				Console.WriteLine("                  FJSDeveloper");
				Console.WriteLine("================================================\n");
				for(int i=0; i<opciones.Length; i++){
					Console.WriteLine(" "+ (i+1) +". "+ opciones[i]);
				}
				Console.WriteLine();
				
				//Lectura de datos
				Console.Write(" Press a key to select an option: ");
				string valor = Console.ReadLine();
				
				try {
					int opcion = Int32.Parse(valor);
					
					switch(opcion){
						case 1:
							opcion1();
							break;
						case 2:
							running = false;
							break;
					}
					
				}  catch(Exception error){
					
				}
			}
		}
	}
}