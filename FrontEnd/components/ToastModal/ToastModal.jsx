"use client";
import { useEffect } from "react";

const ToastModal = ({
  isOpen,
  onClose,
  message,
  type = "success",
  duration = 3000,
}) => {
  // إغلاق النافذة تلقائياً بعد فترة زمنية محددة
  useEffect(() => {
    if (isOpen && duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  // تحديد لون وتصميم النافذة حسب نوع الرسالة
  const styles = {
    success: "bg-emerald-600 text-white border-emerald-700",
    error: "bg-rose-600 text-white border-rose-700",
    info: "bg-blue-600 text-white border-blue-700",
    warning: "bg-amber-500 text-white border-amber-600",
  };

  return (
    <div
      className={`fixed bottom-5 right-5 z-[9999] flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border transition-all duration-300 animate-slide-in ${
        styles[type] || styles.success
      }`}
      role="alert"
    >
      {/* أيقونة حالة الرسالة */}
      <div className="shrink-0">
        {type === "success" && (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
        {type === "error" && (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
        {type === "info" && (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </div>

      {/* نص الرسالة المتغير */}
      <span className="text-sm font-medium">{message}</span>

      {/* زر الإغلاق اليدوي */}
      <button
        onClick={onClose}
        className="mr-2 text-white/80 hover:text-white transition-colors"
        aria-label="إغلاق"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default ToastModal;
