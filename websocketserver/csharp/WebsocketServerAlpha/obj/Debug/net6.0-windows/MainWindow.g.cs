﻿#pragma checksum "..\..\..\MainWindow.xaml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "38CC011B289A0269E686014C42703E2EFC9DF424"
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using MaterialDesignThemes.Wpf;
using MaterialDesignThemes.Wpf.Converters;
using MaterialDesignThemes.Wpf.Transitions;
using System;
using System.Diagnostics;
using System.Windows;
using System.Windows.Automation;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Controls.Ribbon;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Markup;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Effects;
using System.Windows.Media.Imaging;
using System.Windows.Media.Media3D;
using System.Windows.Media.TextFormatting;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Shell;
using WebsocketServerAlpha;


namespace WebsocketServerAlpha {
    
    
    /// <summary>
    /// MainWindow
    /// </summary>
    public partial class MainWindow : System.Windows.Window, System.Windows.Markup.IComponentConnector {
        
        
        #line 37 "..\..\..\MainWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBox textBoxPortHostname;
        
        #line default
        #line hidden
        
        
        #line 48 "..\..\..\MainWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBox textBoxPortWebsocket;
        
        #line default
        #line hidden
        
        
        #line 59 "..\..\..\MainWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBox textBoxFolderName;
        
        #line default
        #line hidden
        
        
        #line 69 "..\..\..\MainWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBox textBoxPortHtml;
        
        #line default
        #line hidden
        
        
        #line 126 "..\..\..\MainWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Button buttonDefault;
        
        #line default
        #line hidden
        
        
        #line 135 "..\..\..\MainWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Button buttonStopServer;
        
        #line default
        #line hidden
        
        
        #line 143 "..\..\..\MainWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Button buttonStartServer;
        
        #line default
        #line hidden
        
        private bool _contentLoaded;
        
        /// <summary>
        /// InitializeComponent
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "6.0.14.0")]
        public void InitializeComponent() {
            if (_contentLoaded) {
                return;
            }
            _contentLoaded = true;
            System.Uri resourceLocater = new System.Uri("/WebsocketServerAlpha;component/mainwindow.xaml", System.UriKind.Relative);
            
            #line 1 "..\..\..\MainWindow.xaml"
            System.Windows.Application.LoadComponent(this, resourceLocater);
            
            #line default
            #line hidden
        }
        
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "6.0.14.0")]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Design", "CA1033:InterfaceMethodsShouldBeCallableByChildTypes")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Maintainability", "CA1502:AvoidExcessiveComplexity")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1800:DoNotCastUnnecessarily")]
        void System.Windows.Markup.IComponentConnector.Connect(int connectionId, object target) {
            switch (connectionId)
            {
            case 1:
            this.textBoxPortHostname = ((System.Windows.Controls.TextBox)(target));
            return;
            case 2:
            this.textBoxPortWebsocket = ((System.Windows.Controls.TextBox)(target));
            
            #line 49 "..\..\..\MainWindow.xaml"
            this.textBoxPortWebsocket.AddHandler(System.Windows.DataObject.PastingEvent, new System.Windows.DataObjectPastingEventHandler(this.AvoidStringPasting));
            
            #line default
            #line hidden
            
            #line 50 "..\..\..\MainWindow.xaml"
            this.textBoxPortWebsocket.PreviewTextInput += new System.Windows.Input.TextCompositionEventHandler(this.NumberValidationTextBox);
            
            #line default
            #line hidden
            
            #line 51 "..\..\..\MainWindow.xaml"
            this.textBoxPortWebsocket.TextChanged += new System.Windows.Controls.TextChangedEventHandler(this.textBoxPortWebsocketTextChanged);
            
            #line default
            #line hidden
            return;
            case 3:
            this.textBoxFolderName = ((System.Windows.Controls.TextBox)(target));
            return;
            case 4:
            this.textBoxPortHtml = ((System.Windows.Controls.TextBox)(target));
            
            #line 70 "..\..\..\MainWindow.xaml"
            this.textBoxPortHtml.PreviewTextInput += new System.Windows.Input.TextCompositionEventHandler(this.NumberValidationTextBox);
            
            #line default
            #line hidden
            
            #line 71 "..\..\..\MainWindow.xaml"
            this.textBoxPortHtml.AddHandler(System.Windows.DataObject.PastingEvent, new System.Windows.DataObjectPastingEventHandler(this.AvoidStringPasting));
            
            #line default
            #line hidden
            
            #line 72 "..\..\..\MainWindow.xaml"
            this.textBoxPortHtml.TextChanged += new System.Windows.Controls.TextChangedEventHandler(this.textBoxPortHtmlTextChanged);
            
            #line default
            #line hidden
            return;
            case 5:
            this.buttonDefault = ((System.Windows.Controls.Button)(target));
            
            #line 127 "..\..\..\MainWindow.xaml"
            this.buttonDefault.Click += new System.Windows.RoutedEventHandler(this.buttonDefault_Click);
            
            #line default
            #line hidden
            return;
            case 6:
            this.buttonStopServer = ((System.Windows.Controls.Button)(target));
            
            #line 134 "..\..\..\MainWindow.xaml"
            this.buttonStopServer.Click += new System.Windows.RoutedEventHandler(this.buttonStopServer_Click);
            
            #line default
            #line hidden
            return;
            case 7:
            this.buttonStartServer = ((System.Windows.Controls.Button)(target));
            
            #line 142 "..\..\..\MainWindow.xaml"
            this.buttonStartServer.Click += new System.Windows.RoutedEventHandler(this.buttonStartServer_Click);
            
            #line default
            #line hidden
            return;
            }
            this._contentLoaded = true;
        }
    }
}

