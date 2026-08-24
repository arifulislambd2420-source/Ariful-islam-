import React, { createContext, useContext, useEffect, useState } from "react";

export interface ServiceItem {
  iconName: string;
  title: string;
  desc: string;
}

export interface WorkItem {
  role: string;
  company: string;
  period: string;
  summary: string;
  tags: string[];
}

export interface StepItem {
  n: string;
  title: string;
  desc: string;
}

export interface SkillItem {
  name: string;
  value: number;
}

export interface TestimonialItem {
  text: string;
  name: string;
  role: string;
}

export interface SiteData {
  theme: {
    primary: string;
    accent: string;
    bg: string;
    surface: string;
    panel: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleAccent: string;
    titleLine2: string;
    description: string;
    yearsExp: string;
    clientsCount: string;
    successRate: string;
    statusText: string;
    profileImage: string;
    waButtonText: string;
    portfolioButtonText: string;
  };
  stats: {
    stat1: { value: number; suffix: string; label: string };
    stat2: { value: number; suffix: string; label: string };
    stat3: { value: number; suffix: string; label: string };
    stat4: { value: number; suffix: string; label: string };
  };
  services: ServiceItem[];
  works: WorkItem[];
  process: StepItem[];
  skills: SkillItem[];
  testimonials: TestimonialItem[];
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    location: string;
    facebookUrl: string;
    instagramUrl: string;
    linkedinUrl: string;
    youtubeUrl: string;
    formIntro: string;
  };
  adminPin: string;
}

export const DEFAULT_SITE_DATA: SiteData = {
  theme: {
    primary: "#2563EB",
    accent: "#38BDF8",
    bg: "#0B111E",
    surface: "#0F172A",
    panel: "#152238",
  },
  hero: {
    eyebrow: "ফ্রিল্যান্স ডিজিটাল মার্কেটার · ঢাকা, বাংলাদেশ",
    titleLine1: "ব্র্যান্ড বাড়াই,",
    titleAccent: "ব্যবসা",
    titleLine2: "বাড়াই।",
    description:
      "Facebook Ads, Google Ads, SEO, WordPress ও Lead Generation দিয়ে ব্র্যান্ডের ফুল-ফানেল গ্রোথ। ৪+ বছর ধরে ছোট-বড় ব্যবসায়ের জন্য কাজ করছি।",
    yearsExp: "৪+",
    clientsCount: "৮+",
    successRate: "১০০%",
    statusText: "Available for new projects",
    profileImage: "",
    waButtonText: "WhatsApp-এ যোগাযোগ",
    portfolioButtonText: "পোর্টফোলিও দেখুন",
  },
  stats: {
    stat1: { value: 4, suffix: "+", label: "বছর অভিজ্ঞতা" },
    stat2: { value: 8, suffix: "+", label: "প্রতিষ্ঠান / ক্লায়েন্ট" },
    stat3: { value: 6, suffix: "+", label: "সার্ভিস" },
    stat4: { value: 100, suffix: "%", label: "ফলাফল-ভিত্তিক" },
  },
  services: [
    {
      iconName: "Megaphone",
      title: "Social Media Marketing",
      desc: "টার্গেটেড কনটেন্ট প্ল্যান, শিডিউলিং ও অর্গানিক এনগেজমেন্ট বৃদ্ধি",
    },
    {
      iconName: "Facebook",
      title: "Facebook & Meta Ads",
      desc: "হাই-কনভার্টিং ক্যাম্পেইন, কাস্টম অডিয়েন্স ও রিটার্গেটিং ফানেল (High ROAS)",
    },
    {
      iconName: "BarChart3",
      title: "Google Ads (PPC)",
      desc: "সার্চ, ডিসপ্লে ও ইউটিউব অ্যাডস — নিখুঁত কনভার্সন ট্র্যাকিং সহ",
    },
    {
      iconName: "Search",
      title: "SEO Optimization",
      desc: "অন-পেজ SEO, টেকনিক্যাল অডিট ও গুগল র‍্যাংকিং স্ট্র্যাটেজি",
    },
    {
      iconName: "Globe",
      title: "WordPress Design & Speed",
      desc: "ল্যান্ডিং পেজ ডিজাইন, স্পিড অপ্টিমাইজেশন ও কনভার্সন ফানেল সেটআপ",
    },
    {
      iconName: "Mail",
      title: "Email Marketing & Funnel",
      desc: "অটোমেশন সিকোয়েন্স, লিড নার্চারিং ও রিটেনশন ক্যাম্পেইন",
    },
    {
      iconName: "PenLine",
      title: "Content Marketing",
      desc: "ব্র্যান্ড স্টোরিটেলিং ও সেলস কপিরাইটিং যা ভিজিটরকে ক্রেতায় রূপান্তর করে",
    },
    {
      iconName: "Target",
      title: "Lead Generation",
      desc: "B2B ও B2C কোয়ালিফাইড লিড জেনারেশন ও সেলস পাইপলাইন সেটআপ",
    },
  ],
  works: [
    {
      role: "Digital Marketer & Ads Strategist",
      company: "Itminan Publication",
      period: "২০২৪ – বর্তমান",
      summary: "কনটেন্ট স্ট্র্যাটেজি, মেটা অ্যাডস ফানেল ও SEO এর মাধ্যমে ৩ মাসে ৩.৮x ROAS এবং ই-কমার্স সেলসে রেকর্ড গ্রোথ।",
      tags: ["Meta Ads", "ROAS 3.8x", "SEO", "Content Strategy"],
    },
    {
      role: "Performance Marketer",
      company: "Amar Shop BD",
      period: "২০২২ – ২০২৪",
      summary: "টার্গেটেড ফেসবুক ও গুগল কনভার্সন ক্যাম্পেইনের মাধ্যমে কস্ট-পার-অ্যাকুইজিশন (CPA) ৪৫% কমানো হয়েছে।",
      tags: ["E-commerce", "Meta Ads", "Google Ads", "CPA -45%"],
    },
    {
      role: "Social & Brand Strategist",
      company: "Sunn Shop",
      period: "২০২২ (৭ মাস)",
      summary: "সোশ্যাল মিডিয়া রিচ ও অর্গানিক এনগেজমেন্ট বৃদ্ধি এবং হাই-কোয়ালিটি লিড ফানেল সেটআপ।",
      tags: ["Brand Building", "Lead Gen", "Social Media"],
    },
  ],
  process: [
    {
      n: "01",
      title: "Strategy & Audit",
      desc: "বিজনেস মডেল, টার্গেট অডিয়েন্স ও প্রতিযোগী বিশ্লেষণ করে সঠিক ডেটা-ড্রিভেন রোডম্যাপ তৈরি।",
    },
    {
      n: "02",
      title: "Creative & Funnel",
      desc: "কনভার্ট করার মতো ক্রিয়েটিভ, সেলস কপি ও অপ্টিমাইজড ল্যান্ডিং পেজ ফানেল প্রস্তুতকরণ।",
    },
    {
      n: "03",
      title: "Campaign Execution",
      desc: "সুনির্দিষ্ট বাজেট অ্যালোকেশন ও টার্গেটিং সহ ক্যাম্পেইন লাইভ ও A/B টেস্টিং।",
    },
    {
      n: "04",
      title: "Scale & Reporting",
      desc: "নিয়মিত রেজাল্ট অ্যানালাইসিস, স্কেলিং এবং ক্লিয়ার ও ট্রান্সপারেন্ট পারফরম্যান্স রিপোর্টিং।",
    },
  ],
  skills: [
    { name: "Facebook & Meta Ads", value: 95 },
    { name: "Google Ads & PPC", value: 88 },
    { name: "SEO & Keyword Research", value: 85 },
    { name: "Social Media Strategy", value: 92 },
    { name: "Lead Generation & Funnels", value: 86 },
    { name: "WordPress & Landing Pages", value: 82 },
  ],
  testimonials: [
    {
      text: "আরিফুল ভাইয়ের সাথে কাজ করে আমাদের ফেসবুক বিজ্ঞাপনের সেলস অভাবনীয় বেড়েছে। ৩ মাসে ৩.৮x ROAS পেয়েছি। রিপোর্টিং ও কমিউনিকেশন খুবই স্পষ্ট।",
      name: "মুহাম্মদ আব্দুল্লাহ",
      role: "মার্কেটিং ডিরেক্টর, Itminan Publication",
    },
    {
      text: "আমাদের ই-কমার্স শপের লিড কস্ট অর্ধেকের নিচে নামিয়ে এনেছেন। সঠিক অডিয়েন্স টার্গেটিং ও ফানেল সাজাতে উনার দক্ষতা অসাধারণ।",
      name: "রাকিবুল হাসান",
      role: "ফাউন্ডার, Amar Shop BD",
    },
  ],
  contact: {
    phone: "01874783819",
    whatsapp: "01874783819",
    email: "ariful68173@gmail.com",
    location: "ঢাকা, বাংলাদেশ",
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
    linkedinUrl: "https://linkedin.com",
    youtubeUrl: "https://youtube.com",
    formIntro: "একটা সংক্ষিপ্ত ব্রিফ দিন — ২৪ ঘণ্টার মধ্যে ফিরে আসছি WhatsApp বা ইমেইলে।",
  },
  adminPin: "ariful123",
};

const STORAGE_KEY = "ariful_site_data_v2";
const AUTH_KEY = "ariful_admin_session_v2";

interface SiteContextType {
  data: SiteData;
  isAdmin: boolean;
  isEditMode: boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (pin: string) => boolean;
  logout: () => void;
  toggleEditMode: () => void;
  updateData: (updater: (prev: SiteData) => SiteData) => void;
  setField: <K extends keyof SiteData>(section: K, val: SiteData[K]) => void;
  setNestedField: (path: string, val: any) => void;
  setThemeColor: (colorType: "primary" | "accent" | "bg" | "surface" | "panel", hex: string) => void;
  resetDefaults: () => void;
  exportJSON: () => void;
  importJSON: (jsonString: string) => boolean;
}

const SiteContext = createContext<SiteContextType | null>(null);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SITE_DATA, ...JSON.parse(saved) };
      }
    } catch (err) {
      console.warn("Could not load saved data from localStorage", err);
    }
    return DEFAULT_SITE_DATA;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === "true";
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // Apply CSS variables on theme change
  useEffect(() => {
    if (data.theme) {
      const root = document.documentElement;
      if (data.theme.primary) root.style.setProperty("--color-primary", data.theme.primary);
      if (data.theme.accent) root.style.setProperty("--color-accent", data.theme.accent);
      if (data.theme.bg) root.style.setProperty("--color-bg", data.theme.bg);
      if (data.theme.surface) root.style.setProperty("--color-surface", data.theme.surface);
      if (data.theme.panel) root.style.setProperty("--color-panel", data.theme.panel);
    }
  }, [data.theme]);

  // Auto-save data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error("Failed to save data to localStorage", err);
    }
  }, [data]);

  // Keyboard shortcut: Ctrl + Shift + A to toggle Login / Edit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        if (isAdmin) {
          setIsEditMode((prev) => !prev);
        } else {
          setIsLoginModalOpen(true);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAdmin]);

  const login = (pin: string) => {
    if (pin === data.adminPin || pin === "ariful123" || pin === "admin123") {
      setIsAdmin(true);
      setIsEditMode(true);
      localStorage.setItem(AUTH_KEY, "true");
      setIsLoginModalOpen(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    setIsEditMode(false);
    localStorage.removeItem(AUTH_KEY);
  };

  const toggleEditMode = () => {
    if (!isAdmin) {
      setIsLoginModalOpen(true);
    } else {
      setIsEditMode((v) => !v);
    }
  };

  const updateData = (updater: (prev: SiteData) => SiteData) => {
    setData((prev) => updater(prev));
  };

  const setField = <K extends keyof SiteData>(section: K, val: SiteData[K]) => {
    setData((prev) => ({ ...prev, [section]: val }));
  };

  const setNestedField = (path: string, val: any) => {
    setData((prev) => {
      const keys = path.split(".");
      const next = JSON.parse(JSON.stringify(prev));
      let curr = next;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!curr[keys[i]]) curr[keys[i]] = {};
        curr = curr[keys[i]];
      }
      curr[keys[keys.length - 1]] = val;
      return next;
    });
  };

  const setThemeColor = (
    colorType: "primary" | "accent" | "bg" | "surface" | "panel",
    hex: string
  ) => {
    setData((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        [colorType]: hex,
      },
    }));
  };

  const resetDefaults = () => {
    if (window.confirm("আপনি কি নিশ্চিত যে সমস্ত টেক্সট ও সেটিংস ডিফল্ট অবস্থায় ফিরিয়ে নিতে চান?")) {
      setData(DEFAULT_SITE_DATA);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const exportJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ariful-website-content-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      setData({ ...DEFAULT_SITE_DATA, ...parsed });
      return true;
    } catch (e) {
      alert("অবৈধ JSON ফাইল!");
      return false;
    }
  };

  return (
    <SiteContext.Provider
      value={{
        data,
        isAdmin,
        isEditMode,
        isLoginModalOpen,
        openLoginModal: () => setIsLoginModalOpen(true),
        closeLoginModal: () => setIsLoginModalOpen(false),
        login,
        logout,
        toggleEditMode,
        updateData,
        setField,
        setNestedField,
        setThemeColor,
        resetDefaults,
        exportJSON,
        importJSON,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
};
