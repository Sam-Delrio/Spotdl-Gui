import { useState, useRef, useEffect } from "react";
import { Download, Link2, Folder, Music, FolderOpen, CheckCircle2, History, ChevronDown, ChevronUp, Trash2, Clock } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Progress } from "./components/ui/progress";
import { toast, Toaster } from "sonner@2.0.3";

interface DownloadHistoryItem {
  id: string;
  url: string;
  title: string;
  path: string;
  timestamp: number;
  status: "completed" | "failed";
}

export default function App() {
  const [url, setUrl] = useState("");
  const [downloadPath, setDownloadPath] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string>("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadStatus, setDownloadStatus] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [downloadHistory, setDownloadHistory] = useState<DownloadHistoryItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cargar historial desde localStorage al iniciar
  useEffect(() => {
    const savedHistory = localStorage.getItem('pavotify-history');
    if (savedHistory) {
      setDownloadHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Guardar historial cuando cambie
  useEffect(() => {
    localStorage.setItem('pavotify-history', JSON.stringify(downloadHistory));
  }, [downloadHistory]);

  const addToHistory = (url: string, path: string, status: "completed" | "failed") => {
    const newItem: DownloadHistoryItem = {
      id: Date.now().toString(),
      url,
      title: extractTitleFromUrl(url),
      path,
      timestamp: Date.now(),
      status
    };
    setDownloadHistory(prev => [newItem, ...prev].slice(0, 50)); // Mantener solo las últimas 50
  };

  const extractTitleFromUrl = (url: string): string => {
    // Extraer título de la URL de Spotify
    const match = url.match(/track\/([a-zA-Z0-9]+)/);
    if (match) return `Track ${match[1].substring(0, 8)}`;
    return "Canción sin título";
  };

  const clearHistory = () => {
    setDownloadHistory([]);
    toast.success("Historial limpiado");
  };

  const deleteHistoryItem = (id: string) => {
    setDownloadHistory(prev => prev.filter(item => item.id !== id));
  };

  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Ahora";
    if (minutes < 60) return `Hace ${minutes}m`;
    if (hours < 24) return `Hace ${hours}h`;
    return `Hace ${days}d`;
  };

  const handleFolderSelect = async () => {
    // Por ahora, usar siempre el selector de archivos del navegador
    // En la versión de Tauri, esto se reemplazará con el diálogo nativo
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Obtener la ruta de la carpeta desde el primer archivo
      const path = files[0].webkitRelativePath.split('/')[0];
      setSelectedFolder(path);
      setDownloadPath(path);
      toast.success(`Carpeta seleccionada: ${path}`);
    }
  };

  const handleDownload = async () => {
    if (!url || !downloadPath) {
      toast.error("Por favor ingresa una URL y selecciona una carpeta");
      return;
    }

    setIsDownloading(true);
    setDownloadProgress(0);
    setDownloadStatus("Iniciando descarga...");

    try {
      // Simular descarga (en producción esto llamaría al backend de Tauri o spotdl)
      await mockSpotdlDownload(url, downloadPath);
      
      // Simular progreso
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setDownloadProgress(i);
        if (i === 30) setDownloadStatus("Descargando metadata...");
        if (i === 60) setDownloadStatus("Descargando audio...");
        if (i === 90) setDownloadStatus("Finalizando...");
      }
      
      addToHistory(url, downloadPath, "completed");
      setDownloadStatus("¡Descarga completada!");
      toast.success("Música descargada exitosamente");
      
      setTimeout(() => {
        setIsDownloading(false);
        setDownloadProgress(0);
        setDownloadStatus("");
        setUrl("");
      }, 2000);
    } catch (error) {
      console.error('Error al descargar:', error);
      toast.error("Error al descargar la música");
      addToHistory(url, downloadPath, "failed");
      setIsDownloading(false);
      setDownloadProgress(0);
      setDownloadStatus("");
    }
  };

  // Mock de la función que llamaría al backend Python con spotdl
  const mockSpotdlDownload = async (url: string, path: string) => {
    return new Promise(resolve => setTimeout(resolve, 100));
  };

  return (
    <>
      <Toaster position="top-center" theme="dark" richColors />
      <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-gray-950 via-slate-900 to-blue-950">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-800 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-3xl opacity-25 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md">
          {/* Glass card */}
          <div className="backdrop-blur-2xl bg-white/5 rounded-3xl p-8 shadow-2xl border border-white/10">
            {/* Header */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur-lg opacity-60"></div>
                <div className="relative backdrop-blur-xl bg-black/40 rounded-2xl p-4 border border-blue-500/30">
                  <Music className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
            </div>

            <h1 className="text-white text-center mb-2">Pavotify</h1>
            <p className="text-slate-300 text-center mb-8">Descarga tu música favorita</p>

            {/* URL Input */}
            <div className="space-y-2 mb-6">
              <Label htmlFor="url" className="text-slate-200 flex items-center gap-2">
                <Link2 className="w-4 h-4" />
                URL de la música
              </Label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-60 group-focus-within:opacity-60 blur transition duration-300"></div>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://ejemplo.com/musica.mp3"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="relative backdrop-blur-xl bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 transition-all duration-300"
                />
              </div>
            </div>

            {/* Folder Selection */}
            <div className="space-y-2 mb-8">
              <Label className="text-slate-200 flex items-center gap-2">
                <Folder className="w-4 h-4" />
                Carpeta de descarga
              </Label>
              
              {/* Hidden file input for folder selection */}
              <input
                ref={fileInputRef}
                type="file"
                /* @ts-ignore */
                webkitdirectory=""
                directory=""
                multiple
                onChange={handleFolderChange}
                className="hidden"
              />
              
              {/* Folder select button with liquid glass effect */}
              <div className="relative group/folder">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl opacity-40 group-hover/folder:opacity-60 blur transition duration-300"></div>
                
                <div className="relative">
                  <Button
                    type="button"
                    onClick={handleFolderSelect}
                    className="relative w-full h-12 rounded-xl border-0 overflow-hidden group/folderBtn transition-all duration-300 bg-transparent p-0"
                  >
                    {/* Base layer */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800/60 via-blue-900/40 to-slate-900/60 group-hover/folderBtn:from-slate-700/70 group-hover/folderBtn:via-blue-800/50 group-hover/folderBtn:to-slate-800/70 transition-all duration-300"></div>
                    
                    {/* Glass reflection */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/5 to-transparent opacity-60"></div>
                    
                    {/* Backdrop blur */}
                    <div className="absolute inset-0 backdrop-blur-xl"></div>
                    
                    {/* Border */}
                    <div className="absolute inset-0 rounded-xl border border-white/20 group-hover/folderBtn:border-white/30 transition-all duration-300"></div>
                    
                    {/* Content */}
                    <div className="relative flex items-center justify-center h-full text-slate-200 z-10 px-4">
                      {selectedFolder ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 mr-2 text-cyan-400" />
                          <span className="truncate">{selectedFolder}</span>
                        </>
                      ) : (
                        <>
                          <FolderOpen className="w-5 h-5 mr-2" />
                          <span>Seleccionar Carpeta</span>
                        </>
                      )}
                    </div>
                  </Button>
                </div>
              </div>
            </div>

            {/* Download Progress */}
            {isDownloading && (
              <div className="mb-6 space-y-3">
                <div className="backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-cyan-400 text-center mb-3">{downloadStatus}</p>
                  <Progress value={downloadProgress} className="h-2" />
                  <p className="text-slate-400 text-center mt-2 text-sm">{downloadProgress}%</p>
                </div>
              </div>
            )}

            {/* Download Button */}
            <div className="relative group">
              {/* Outer glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 rounded-[18px] blur-lg opacity-50 group-hover:opacity-75 transition duration-500"></div>
              
              {/* Button container with glass effect */}
              <div className="relative">
                <Button
                  onClick={handleDownload}
                  disabled={!url || !downloadPath || isDownloading}
                  className="relative w-full h-14 rounded-2xl border-0 overflow-hidden group/btn transition-all duration-300 disabled:opacity-50 bg-transparent p-0"
                >
                  {/* Base gradient layer */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/90 via-cyan-500/90 to-blue-600/90 group-hover/btn:from-blue-400/90 group-hover/btn:via-cyan-400/90 group-hover/btn:to-blue-500/90 transition-all duration-300"></div>
                  
                  {/* Glass reflection top */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/5 to-transparent opacity-80"></div>
                  
                  {/* Inner glow */}
                  <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-b from-white/20 to-transparent opacity-60"></div>
                  
                  {/* Backdrop blur layer */}
                  <div className="absolute inset-0 backdrop-blur-xl"></div>
                  
                  {/* Bottom shadow for depth */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Border highlight */}
                  <div className="absolute inset-[0] rounded-2xl border border-white/30 group-hover/btn:border-white/40 transition-all duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative flex items-center justify-center h-full text-white z-10 px-6">
                    <Download className="w-5 h-5 mr-2" />
                    <span className="drop-shadow-lg">{isDownloading ? "Descargando..." : "Descargar Música"}</span>
                  </div>
                  
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                </Button>
              </div>
            </div>

            {/* Info text */}
            <p className="text-slate-400 text-center mt-6 text-sm">
              {isDownloading 
                ? "Descargando tu música con spotdl..." 
                : "Ingresa la URL de Spotify y selecciona una carpeta"}
            </p>
          </div>

          {/* History Toggle Button */}
          <div className="mt-6">
            <div className="relative group/history">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl opacity-30 group-hover/history:opacity-50 blur transition duration-300"></div>
              
              <div className="relative">
                <Button
                  type="button"
                  onClick={() => setShowHistory(!showHistory)}
                  className="relative w-full h-10 rounded-xl border-0 overflow-hidden group/historyBtn transition-all duration-300 bg-transparent p-0"
                >
                  {/* Base layer */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800/40 via-blue-900/30 to-slate-900/40 group-hover/historyBtn:from-slate-700/50 group-hover/historyBtn:via-blue-800/40 group-hover/historyBtn:to-slate-800/50 transition-all duration-300"></div>
                  
                  {/* Glass reflection */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent opacity-60"></div>
                  
                  {/* Backdrop blur */}
                  <div className="absolute inset-0 backdrop-blur-lg"></div>
                  
                  {/* Border */}
                  <div className="absolute inset-0 rounded-xl border border-white/10 group-hover/historyBtn:border-white/20 transition-all duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative flex items-center justify-center h-full text-slate-300 z-10 px-4 text-sm">
                    <History className="w-4 h-4 mr-2" />
                    <span>Historial de Descargas</span>
                    {showHistory ? (
                      <ChevronUp className="w-4 h-4 ml-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 ml-2" />
                    )}
                    {downloadHistory.length > 0 && (
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-cyan-500/30 text-cyan-300 text-xs">
                        {downloadHistory.length}
                      </span>
                    )}
                  </div>
                </Button>
              </div>
            </div>
          </div>

          {/* History Panel */}
          <div className={`mt-4 transition-all duration-500 overflow-hidden ${
            showHistory ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="backdrop-blur-2xl bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-200 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Historial
                </h3>
                {downloadHistory.length > 0 && (
                  <Button
                    onClick={clearHistory}
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-red-400 h-8 text-xs"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Limpiar
                  </Button>
                )}
              </div>

              {downloadHistory.length === 0 ? (
                <p className="text-slate-400 text-center py-8 text-sm">
                  No hay descargas en el historial
                </p>
              ) : (
                <div className="space-y-2 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                  {downloadHistory.map((item) => (
                    <div
                      key={item.id}
                      className="backdrop-blur-lg bg-white/5 rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-all duration-300 group/item"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-200 text-sm truncate mb-1">
                            {item.title}
                          </p>
                          <p className="text-slate-400 text-xs truncate mb-1">
                            {item.url}
                          </p>
                          <div className="flex items-center gap-2 text-xs">
                            <span className={`px-2 py-0.5 rounded-full ${
                              item.status === 'completed' 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {item.status === 'completed' ? 'Completado' : 'Fallido'}
                            </span>
                            <span className="text-slate-500">
                              {formatTimestamp(item.timestamp)}
                            </span>
                          </div>
                        </div>
                        <Button
                          onClick={() => deleteHistoryItem(item.id)}
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover/item:opacity-100 transition-opacity h-8 w-8 p-0 hover:bg-red-500/20 hover:text-red-400"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom decorative elements */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="h-1 w-1 rounded-full bg-cyan-400/40"></div>
            <div className="h-1 w-8 rounded-full bg-cyan-400/40"></div>
            <div className="h-1 w-1 rounded-full bg-cyan-400/40"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        /* Custom scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.3);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.5);
        }
      `}</style>
      </div>
    </>
  );
}
