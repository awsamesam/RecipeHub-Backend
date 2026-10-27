"use client";

import { createContext, useContext, useState } from "react";

const ToastContext = createContext(undefined);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    isOpen: false, // اجعلها false لكي تختفي افتراضياً وتظهر فقط عند الاستدعاء
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ isOpen: true, message, type });

    // إغلاق الإشعار تلقائياً بعد 4 ثوانٍ
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isOpen: false }));
    }, 2000);
  };

  const handleClose = () => {
    setToast((prev) => ({ ...prev, isOpen: false }));
  };

  // ألوان مخصصة لكل حالة مباشرة عبر الـ Inline Styles
  const getBackgroundColor = (type) => {
    switch (type) {
      case "success":
        return "#059669"; // أخضر
      case "error":
        return "#e11d48"; // أحمر
      case "info":
        return "#2563eb"; // أزرق
      case "warning":
        return "#d97706"; // أصفر/برتقالي
      default:
        return "#059669";
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* نافذة الـ Toast العائمة بتصميم CSS نقي ومباشر */}
      {toast.isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 999999,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px 20px",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            backgroundColor: getBackgroundColor(toast.type),
            color: "#ffffff",
            fontFamily: "sans-serif",
            minWidth: "250px",
            maxWidth: "400px",
            direction: "rtl",
          }}
          role="alert"
        >
          {/* نص الرسالة */}
          <span style={{ fontSize: "14px", fontWeight: "600", flex: 1 }}>
            {toast.message}
          </span>

          {/* زر الإغلاق */}
          <button
            onClick={handleClose}
            style={{
              background: "transparent",
              border: "none",
              color: "rgba(255, 255, 255, 0.8)",
              cursor: "pointer",
              fontSize: "18px",
              padding: "0",
              display: "flex",
              alignItems: "center",
            }}
            aria-label="إغلاق"
          >
            ✕
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
