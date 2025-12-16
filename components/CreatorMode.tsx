import React, { useState, useEffect, useRef } from 'react';
import { Edit2, Upload, X, Info, Layout, LogOut, Lock, Plus } from 'lucide-react';

interface CreatorModeProps {
  enabled: boolean;
  toggle: () => void;
}

const CreatorMode: React.FC<CreatorModeProps> = ({ enabled, toggle }) => {
  const [showTip, setShowTip] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check for admin flag in URL or LocalStorage
    const params = new URLSearchParams(window.location.search);
    const hasUrlKey = params.get('admin') === 'true';
    const hasStoredKey = localStorage.getItem('eden_admin_access') === 'true';

    if (hasUrlKey) {
      setIsAdmin(true);
      localStorage.setItem('eden_admin_access', 'true');
      // Clean up the URL so the key isn't sitting there visible
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (hasStoredKey) {
      setIsAdmin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('eden_admin_access');
    setIsAdmin(false);
    if (enabled) toggle(); // Turn off creator mode if it was on
  };

  // If not admin, do not render anything (hide the button)
  if (!isAdmin) {
    return null;
  }

  // --- Render for Admin below ---

  if (!enabled) {
    return (
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 p-3 bg-yellow-600 text-white hover:bg-yellow-500 rounded-full shadow-lg shadow-yellow-900/20 transition-all hover:scale-110 animate-in fade-in zoom-in duration-300"
        title="開啟創作者模式"
      >
        <Edit2 size={20} />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Control Panel */}
      <div className="absolute bottom-6 right-6 pointer-events-auto flex flex-col items-end gap-3">
        <div className="bg-neutral-900 border border-yellow-600/50 rounded-lg p-4 shadow-2xl w-72 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-10">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-yellow-500 font-bold flex items-center gap-2">
              <Layout size={16} /> 創作者模式
            </h3>
            <button onClick={toggle} className="text-neutral-500 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>
          <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
            您現在可以看到排版建議與上傳入口。這是僅有您能看見的介面。點擊任何帶有虛線框的區域即可上傳照片進行預覽。
          </p>
          <div className="bg-yellow-900/20 p-2 rounded border border-yellow-900/50 mb-3">
             <p className="text-[10px] text-yellow-500">
                注意：此模式下的更改僅為暫時預覽（瀏覽器端）。若要永久生效，請將照片存入專案目錄或雲端空間。
             </p>
          </div>
          
          {/* Admin Logout */}
          <div className="pt-3 border-t border-neutral-800 flex justify-between items-center">
             <span className="text-[10px] text-neutral-600 flex items-center gap-1">
                <Lock size={10} /> Admin Active
             </span>
             <button 
                onClick={handleLogout}
                className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
             >
                <LogOut size={10} /> 退出管理者
             </button>
          </div>
        </div>
      </div>

      {/* Example Overlay Tip (Mocking placement) */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 pointer-events-auto">
        <div 
            className="group relative"
            onMouseEnter={() => setShowTip('hero')}
            onMouseLeave={() => setShowTip(null)}
        >
            <div className="bg-yellow-500/10 border border-dashed border-yellow-500/50 text-yellow-500 px-3 py-1 text-xs rounded-full cursor-help flex items-center gap-1 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                <Info size={12}/> 建議：Hero 區段
            </div>
            {showTip === 'hero' && (
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-64 bg-black/90 text-neutral-300 text-xs p-3 rounded border border-neutral-800 z-50 shadow-xl">
                    此區域建議使用 16:9 或更寬的 21:9 影像。若為建築作品，建議使用低對比度的暗調圖片以突顯白色文字。
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

// Reusable Editable Trigger Component with File Input
export const EditableTrigger: React.FC<{ 
    isCreatorMode: boolean; 
    label?: string; 
    className?: string;
    onFileSelect?: (file: File) => void;
    aspectRatio?: string;
}> = ({ isCreatorMode, label = "更換圖片", className = "", onFileSelect, aspectRatio }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    if (!isCreatorMode) return null;

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && onFileSelect) {
            onFileSelect(file);
        }
    };

    return (
        <div 
            onClick={handleClick}
            className={`absolute inset-0 bg-yellow-500/10 border-2 border-dashed border-yellow-500/40 z-20 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer group ${className}`}
        >
            <input 
                type="file" 
                ref={inputRef}
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
                onClick={(e) => e.stopPropagation()} // Prevent bubbling up
            />
            <div className="bg-black/80 text-yellow-500 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transform group-hover:scale-105 transition-transform backdrop-blur-md border border-yellow-500/30 shadow-xl">
                <Upload size={14} /> {label}
            </div>
            {aspectRatio && (
                <span className="mt-2 text-[10px] font-mono bg-black/50 px-2 py-0.5 rounded text-neutral-300 border border-white/10">
                    建議比例 {aspectRatio}
                </span>
            )}
        </div>
    );
};

export default CreatorMode;