import { useState, useEffect } from "react";
import ProcessDataComponent from "./ProcessDataComponent"; // Import the ProcessDataComponent

const ChatList = () => {
  const [apiData, setApiData] = useState([]); // State to store API data as an array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/data");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("API Data:", data); // Log data to console
        setApiData(data); // Save data as array
      } catch (err) {
        console.error("Error fetching API data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chats = [
    { name: "Furkan", message: "Draft: bugün mesela", time: "12:27", avatar: "🧑‍💻", draft: true },
    { name: "Hazal 🐥", message: "Hayırlı olsun", time: "12:24", avatar: "👤" },
    { name: "Family Business", message: "Annem: Bilgisayara Bakmaktan...", time: "09:31", avatar: "👨‍👩‍👦" },
    { name: "Deniz 🐉", message: "✔ izleriz", time: "09:23", avatar: "📸" },
    { name: "Batiataşehir servis", message: "🗺 Live location", time: "06:53", muted: true, avatar: "🚌" },
    { name: "Mutluhan (You)", message: "📹 Video", time: "25.10.2024", avatar: "🧔" },
    { name: "mad", message: "You: belliydi zaten", time: "Yesterday", avatar: "🚗" },
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Chats</h2>
        <div style={styles.icons}>
          <button style={styles.iconButton}>📸</button>
          <button style={styles.iconButton}>➕</button>
        </div>
      </div>

      {/* Chat List */}
      <div style={styles.chatList}>
        {chats.map((chat, index) => (
          <div key={index} style={styles.chatItem}>
            <div style={styles.avatar}>{chat.avatar}</div>
            <div style={styles.chatDetails}>
              <div style={styles.chatHeader}>
                <span style={styles.chatName}>{chat.name}</span>
                <span style={styles.chatTime}>{chat.time}</span>
              </div>
              <div style={styles.chatMessage}>
                <span>{chat.message}</span>
                {chat.muted && <span style={styles.mutedIcon}>🔕</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* API Data Section */}
      <div style={styles.apiData}>
        <h3>API Data Section</h3>
        {loading ? (
          <div>Loading API data...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : apiData.data.length > 0 ? (
          // Use .map to render each ProcessDataComponent for every entry in apiData
          apiData.data.map((item, index) => (
            <div key={index} style={styles.dataItem}>
              <h4>Data Item {index + 1}</h4>
              <ProcessDataComponent data={item} />
            </div>
          ))
        ) : (
          <div>No API data available</div>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    backgroundColor: "#000",
    color: "#fff",
    height: "100vh",
    padding: "16px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
  },
  icons: {
    display: "flex",
    gap: "12px",
  },
  iconButton: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "20px",
    cursor: "pointer",
  },
  chatList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  chatItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    borderBottom: "1px solid #333",
  },
  avatar: {
    width: "50px",
    height: "50px",
    backgroundColor: "#555",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
  },
  chatDetails: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  chatHeader: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "16px",
    fontWeight: "bold",
  },
  chatTime: {
    fontSize: "12px",
    color: "#aaa",
  },
  chatMessage: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    color: "#ccc",
  },
  mutedIcon: {
    fontSize: "14px",
  },
  apiData: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#111",
    border: "1px solid #333",
    borderRadius: "8px",
  },
  dataItem: {
    marginBottom: "16px",
    padding: "10px",
    border: "1px solid #444",
    borderRadius: "6px",
  },
};

export default ChatList;
