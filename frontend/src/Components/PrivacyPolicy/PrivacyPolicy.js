import React from "react";

const PrivacyPolicy = () => {
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "60px auto",
      padding: "40px",
      background: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      lineHeight: 1.7,
      color: "#333",
    },
    h1: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#111827",
      borderBottom: "2px solid #e5e7eb",
      paddingBottom: "10px",
      marginBottom: "25px",
    },
    h2: {
      fontSize: "1.25rem",
      fontWeight: "700",
      color: "#111827",
      marginTop: "30px",
      marginBottom: "10px",
    },
    p: {
      marginBottom: "16px",
    },
    ul: {
      paddingLeft: "20px",
      marginBottom: "16px",
    },
    li: {
      marginBottom: "8px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>Privacy & Cookies Policy</h1>
      <p style={styles.p}>
        We use cookies to improve your experience on our website. Cookies help
        us understand user behavior, personalize content, and analyze traffic.
      </p>
      <h2 style={styles.h2}>What are Cookies?</h2>
      <p style={styles.p}>
        Cookies are small text files stored on your device when you visit a
        website. They help the site remember your preferences and activity.
      </p>
      <h2 style={styles.h2}>Types of Cookies We Use</h2>
      <ul style={styles.ul}>
        <li style={styles.li}>
          <strong>Essential Cookies:</strong> Required for site functionality.
        </li>
        <li style={styles.li}>
          <strong>Analytics Cookies:</strong> Help us track user activity.
        </li>
        <li style={styles.li}>
          <strong>Marketing Cookies:</strong> Used for personalized ads and
          campaigns.
        </li>
      </ul>
      <h2 style={styles.h2}>Your Consent</h2>
      <p style={styles.p}>
        By clicking “Accept All Cookies,” you consent to the use of all the
        cookies described above.
      </p>
      <h2 style={styles.h2}>Managing Your Preferences</h2>
      <p style={styles.p}>
        You can reject cookies anytime by updating your browser settings or
        revisiting our cookie banner.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
