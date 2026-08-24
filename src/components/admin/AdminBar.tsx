import React, { useState } from "react";
import { useSite } from "../../context/SiteContext";
import {
  Palette,
  Eye,
  Edit3,
  Download,
  RotateCcw,
  LogOut,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const COLOR_PRESETS = [
  { name: "Electric Blue", primary: "#2563EB", accent: "#38BDF8" },
  { name: "Emerald Growth", primary: "#059669", accent: "#34D399" },
  { name: "Sunset Gold", primary: "#D97706", accent: "#FBBF24" },
  { name: "Royal Purple", primary: "#7C3AED", accent: "#A78BFA" },
  { name: "Neon Cyan", primary: "#0284C7", accent: "#22D3EE" },
  { name: "Crimson Red", primary: "#E11D48", accent: "#FB7185" },
];

export const AdminBar: React.FC = () => {
  const {
    isAdmin,
    isEditMode,
    toggleEditMode,
    data,
    setThemeColor,
    resetDefaults,
    exportJSON,
    logout,
  } = useSite();

  const [showPalette, setShowPalette] = useState(false);

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl animate-bounce-short">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-accent/40 bg-surface/95 px-4 py-2.5 shadow-2xl backdrop-blur-md">
        {/* Left: Admin Status & Mode Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-accent">
            <Sparkles size={15} />
            <span className="hidden sm:inline">Admin Mode</span>
          </div>

          <button
            type="button"
            onClick={toggleEditMode}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
              isEditMode
                ? "bg-accent text-bg shadow-glow"
                : "bg-panel text-muted hover:text-ink"
            }`}
          >
            {isEditMode ? (
              <>
                <Edit3 size={13} />
                <span>এডিটিং চালু (ON)</span>
              </>
            ) : (
              <>
                <Eye size={13} />
                <span>প্রিভিউ মোড</span>
              </>
            )}
          </button>
        </div>

        {/* Center: Live Saved Indicator */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-emerald font-mono">
          <CheckCircle2 size={13} />
          <span>অটো-সেভড</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Theme Color Picker */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPalette((v) => !v)}
              className="flex items-center gap-1 rounded-lg border border-border bg-panel px-2.5 py-1 text-xs text-ink hover:border-accent hover:text-accent transition"
              title="রং পরিবর্তন করুন"
            >
              <Palette size={14} className="text-accent" />
              <span className="hidden sm:inline">থিম কালার</span>
            </button>

            {showPalette && (
              <div className="absolute bottom-full right-0 mb-3 w-64 rounded-xl border border-border bg-panel p-4 shadow-2xl backdrop-blur-lg">
                <div className="text-xs font-semibold font-mono text-ink mb-2">
                  কালার প্যালেট নির্বাচন করুন
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => {
                        setThemeColor("primary", preset.primary);
                        setThemeColor("accent", preset.accent);
                      }}
                      className="flex items-center gap-2 rounded-lg border border-border bg-surface p-2 text-left text-[11px] font-medium text-ink hover:border-accent transition"
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full shadow"
                        style={{ backgroundColor: preset.accent }}
                      />
                      <span className="truncate">{preset.name}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-border">
                  <label className="text-[11px] font-mono text-muted mb-1 block">
                    কাস্টম কালার কোড (Hex):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={data.theme.accent}
                      onChange={(e) => {
                        setThemeColor("primary", e.target.value);
                        setThemeColor("accent", e.target.value);
                      }}
                      className="h-8 w-10 cursor-pointer rounded border border-border bg-transparent p-0"
                    />
                    <input
                      type="text"
                      value={data.theme.accent}
                      onChange={(e) => {
                        setThemeColor("accent", e.target.value);
                      }}
                      className="field text-xs py-1 px-2"
                      placeholder="#2563EB"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Export JSON backup */}
          <button
            type="button"
            onClick={exportJSON}
            className="flex items-center gap-1 rounded-lg border border-border bg-panel px-2.5 py-1 text-xs text-muted hover:text-ink hover:border-border transition"
            title="ডাটা ব্যাকআপ ডাউনলোড করুন"
          >
            <Download size={13} />
            <span className="hidden sm:inline">ব্যাকআপ</span>
          </button>

          {/* Reset */}
          <button
            type="button"
            onClick={resetDefaults}
            className="flex items-center gap-1 rounded-lg border border-border bg-panel px-2 py-1 text-xs text-muted hover:text-red-400 hover:border-red-400/40 transition"
            title="ডিফল্ট রিসেট"
          >
            <RotateCcw size={13} />
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-1 rounded-lg bg-red-500/15 border border-red-500/30 px-2.5 py-1 text-xs font-medium text-red-400 hover:bg-red-500/25 transition"
            title="অ্যাডমিন থেকে লগআউট করুন"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">লগআউট</span>
          </button>
        </div>
      </div>
    </div>
  );
};
