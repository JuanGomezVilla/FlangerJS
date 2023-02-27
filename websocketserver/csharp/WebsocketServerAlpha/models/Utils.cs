using System;
using System.Collections.Generic;
using System.Drawing;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Text.RegularExpressions;
using System.Linq;
using System.Threading.Tasks;

namespace WebsocketServerAlpha {

	public static class Utils {
		public static bool isNumber(string s){
			return Regex.IsMatch(s, @"^\d+$"); //@"[^\d]"
    	}
		
		public static byte[] EncodeMessageToSend(string message){
            byte[] response;
            byte[] bytesRaw = Encoding.UTF8.GetBytes(message);
            byte[] frame = new byte[10];
            var indexStartRawData = -1;
            var length = bytesRaw.Length;

            frame[0] = (byte) 129;
            if (length <= 125){
                frame[1] = (byte)length;
                indexStartRawData = 2;
            } else if (length >= 126 && length <= 65535){
                frame[1] = (byte)126;
                frame[2] = (byte)((length >> 8) & 255);
                frame[3] = (byte)(length & 255);
                indexStartRawData = 4;
            } else {
                frame[1] = (byte)127;
                frame[2] = (byte)((length >> 56) & 255);
                frame[3] = (byte)((length >> 48) & 255);
                frame[4] = (byte)((length >> 40) & 255);
                frame[5] = (byte)((length >> 32) & 255);
                frame[6] = (byte)((length >> 24) & 255);
                frame[7] = (byte)((length >> 16) & 255);
                frame[8] = (byte)((length >> 8) & 255);
                frame[9] = (byte)(length & 255);
                indexStartRawData = 10;
            }

            response = new byte[indexStartRawData + length];
            int i, reponseIdx = 0;
            for (i = 0; i < indexStartRawData; i++){
                response[reponseIdx] = frame[i];
                reponseIdx++;
            }

            for (i = 0; i < length; i++){
                response[reponseIdx] = bytesRaw[i];
                reponseIdx++;
            }

            return response;
        }
		
	}
}
