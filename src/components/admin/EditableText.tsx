import React, { useState, useRef, useEffect } from "react";
import { useSite } from "../../context/SiteContext";
import { Edit2, Check, X } from "lucide-react";

interface EditableTextProps {
  value: string;
  onChange: (newVal: string) => void;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div" | "a";
  className?: string;
  multiline?: boolean;
  placeholder?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  as: Component = "span",
  className = "",
  multiline = false,
  placeholder = "এখানে লিখুন...",
}) => {
  const { isEditMode } = useSite();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setText(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if ("select" in inputRef.current) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  if (!isEditMode) {
    return <Component className={className}>{value}</Component>;
  }

  const handleSave = () => {
    onChange(text);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setText(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="relative z-30 my-1 inline-block w-full max-w-full">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[100px] w-full rounded-md border-2 border-primary bg-bg p-3 text-ink shadow-2xl ring-2 ring-primary/30 focus:outline-none"
            rows={3}
            placeholder={placeholder}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-md border-2 border-primary bg-bg px-3 py-1.5 text-ink shadow-2xl ring-2 ring-primary/30 focus:outline-none"
            placeholder={placeholder}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
          />
        )}
        <div className="mt-1.5 flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1 rounded bg-primary px-2.5 py-1 text-xs font-semibold text-white shadow hover:brightness-110"
          >
            <Check size={13} /> সেভ
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center gap-1 rounded bg-surface px-2.5 py-1 text-xs text-muted hover:text-ink"
          >
            <X size={13} /> বাতিল
          </button>
        </div>
      </div>
    );
  }

  return (
    <Component
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsEditing(true);
      }}
      title="ক্লিক করে এডিট করুন"
      className={`${className} editable-active group`}
    >
      {value || <span className="italic opacity-50">{placeholder}</span>}
      <span className="ml-1.5 inline-flex align-middle text-primary opacity-60 transition group-hover:scale-110 group-hover:opacity-100">
        <Edit2 size={12} className="inline" />
      </span>
    </Component>
  );
};
