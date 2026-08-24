import React, { useState, useRef } from "react";
import { useSite } from "../../context/SiteContext";
import { Camera, Image as ImageIcon, Check, X, Upload } from "lucide-react";

interface EditableImageProps {
  src: string;
  alt: string;
  onChange: (newSrc: string) => void;
  className?: string;
  containerClassName?: string;
  fallbackIcon?: React.ReactNode;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  src,
  alt,
  onChange,
  className = "w-full h-full object-cover",
  containerClassName = "relative w-full h-full",
  fallbackIcon,
}) => {
  const { isEditMode } = useSite();
  const [isOpen, setIsOpen] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("ছবির সাইজ ২MB এর কম হওয়া প্রয়োজন!");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        onChange(base64);
        setIsOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput("");
      setIsOpen(false);
    }
  };

  return (
    <div className={`${containerClassName} ${isEditMode ? "editable-img-active group" : ""}`}>
      {src ? (
        <img src={src} alt={alt} className={className} />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-panel text-muted">
          {fallbackIcon || <ImageIcon size={48} className="opacity-40" />}
        </div>
      )}

      {isEditMode && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          className="absolute inset-0 flex flex-col items-center justify-center bg-bg/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition duration-200 cursor-pointer p-4 text-center z-20"
        >
          <div className="grid h-12 w-12 place-items-center rounded-full bg-accent text-bg shadow-lg mb-2">
            <Camera size={22} />
          </div>
          <span className="font-mono text-xs font-semibold text-ink bg-panel/90 px-3 py-1 rounded-full border border-border">
            ছবি পরিবর্তন করুন
          </span>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
        >
          <div
            className="w-full max-w-md rounded-xl border border-border bg-panel p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-display text-lg font-semibold text-ink flex items-center gap-2">
                <Camera size={18} className="text-accent" /> নতুন ছবি যোগ করুন
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md p-1 text-muted hover:text-ink"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {/* Option 1: File Upload */}
              <div>
                <label className="label-mono">১. কম্পিউটার/ফোন থেকে ছবি আপলোড করুন</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border py-4 text-sm font-medium text-muted hover:border-accent hover:text-accent transition"
                >
                  <Upload size={18} /> ছবি নির্বাচন করুন (সর্বোচ্চ ২MB)
                </button>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-border w-full" />
                <span className="bg-panel px-3 font-mono text-xs uppercase tracking-wider text-muted">
                  অথবা
                </span>
                <div className="border-t border-border w-full" />
              </div>

              {/* Option 2: Image URL */}
              <form onSubmit={handleUrlSubmit}>
                <label className="label-mono">২. ছবির সরাসরি লিঙ্ক (Image URL) দিন</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="field flex-1 text-sm py-2"
                  />
                  <button type="submit" className="btn-primary py-2 px-4 text-xs">
                    <Check size={14} /> যোগ করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
