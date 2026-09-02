import React, { useState } from "react";
import { useSite } from "../../context/SiteContext";
import { Lock, KeyRound, X } from "lucide-react";

export const AdminLoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login } = useSite();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) {
      setError("পাসওয়ার্ড লিখুন");
      return;
    }
    const success = login(pin.trim());
    if (success) {
      setError("");
      setPin("");
    } else {
      setError("ভুল পাসওয়ার্ড! অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন।");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={closeLoginModal}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-border bg-bg p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2 font-display text-lg font-bold text-ink">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
              <Lock size={16} />
            </div>
            অ্যাডমিন লগইন
          </div>
          <button
            onClick={closeLoginModal}
            className="rounded-lg p-1 text-muted transition hover:bg-surface hover:text-ink"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="label">অ্যাডমিন পাসওয়ার্ড / পিন</label>
            <div className="relative">
              <input
                type="password"
                autoFocus
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  if (error) setError("");
                }}
                placeholder="পাসওয়ার্ড লিখুন..."
                className="field pl-10"
              />
              <KeyRound
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>
            {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
            <p className="mt-2 text-[11px] text-muted/70">
              💡 ডিফল্ট পাসওয়ার্ড:{" "}
              <span className="font-bold text-primary">ariful123</span> (কীবোর্ডে{" "}
              <kbd className="rounded border border-border bg-surface px-1.5 py-0.5">
                Ctrl+Shift+A
              </kbd>{" "}
              চেপে যেকোনো সময় খোলা যায়)
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={closeLoginModal}
              className="btn-outline px-4 py-2 text-xs"
            >
              বাতিল
            </button>
            <button type="submit" className="btn-primary px-5 py-2 text-xs">
              লগইন করুন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
