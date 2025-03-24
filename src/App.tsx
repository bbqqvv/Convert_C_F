import React, { useState } from "react";
import { LocalNotifications } from "@capacitor/local-notifications";
import { Share } from "@capacitor/share";
import { Geolocation } from "@capacitor/geolocation";
import "./App.css";

const App: React.FC = () => {
  const [celsius, setCelsius] = useState<string>("");
  const [fahrenheit, setFahrenheit] = useState<number | null>(null);
  const [location, setLocation] = useState<string | null>(null);

  // Hàm yêu cầu quyền thông báo (cần cho Android/iOS)
  const requestNotificationPermission = async () => {
    try {
      const { display } = await LocalNotifications.requestPermissions();
      return display === "granted";
    } catch (error) {
      console.error("Lỗi yêu cầu quyền thông báo:", error);
      return false;
    }
  };

  // Hàm kiểm tra và yêu cầu quyền vị trí
  const checkLocationPermission = async (): Promise<boolean> => {
    try {
      const status = await Geolocation.checkPermissions();
      if (status.location === "granted") {
        return true;
      } else {
        const requestStatus = await Geolocation.requestPermissions();
        return requestStatus.location === "granted";
      }
    } catch (error) {
      console.error("Lỗi kiểm tra quyền vị trí:", error);
      return false;
    }
  };

  // Hàm lấy vị trí
  const getLocation = async () => {
    try {
      const hasPermission = await checkLocationPermission();
      if (!hasPermission) {
        setLocation("🚫 Quyền vị trí bị từ ch các chối!");
        return;
      }

      const pos = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });
      setLocation(`📍 Vĩ độ: ${pos.coords.latitude}, Kinh độ: ${pos.coords.longitude}`);
    } catch (error) {
      console.error("Lỗi lấy vị trí:", error);
      setLocation("❌ Không thể lấy vị trí. Vui lòng kiểm tra cài đặt GPS.");
    }
  };

  // Hàm chuyển đổi nhiệt độ và gửi thông báo
  const convertTemperature = async () => {
    if (!celsius || isNaN(parseFloat(celsius))) {
      alert("Vui lòng nhập một số hợp lệ!");
      return;
    }

    const fahrenheitValue = (parseFloat(celsius) * 9) / 5 + 32;
    setFahrenheit(fahrenheitValue);

    // Kiểm tra và yêu cầu quyền thông báo trước khi gửi
    const hasNotificationPermission = await requestNotificationPermission();
    if (hasNotificationPermission) {
      try {
        await LocalNotifications.schedule({
          notifications: [
            {
              title: "🌡 Chuyển đổi nhiệt độ",
              body: `${celsius}°C = ${fahrenheitValue.toFixed(2)}°F`,
              id: Math.floor(Math.random() * 1000000), // ID ngẫu nhiên để tránh trùng lặp
              schedule: { at: new Date(Date.now() + 1000) }, // Gửi sau 1 giây
            },
          ],
        });
      } catch (error) {
        console.error("Lỗi gửi thông báo:", error);
      }
    } else {
      alert("Không có quyền gửi thông báo!");
    }
  };

  // Hàm chia sẻ kết quả
  const shareResult = async () => {
    if (fahrenheit === null) return;

    try {
      await Share.share({
        title: "Kết quả chuyển đổi",
        text: `🔥 ${celsius}°C = ${fahrenheit.toFixed(2)}°F`,
        dialogTitle: "Chia sẻ nhiệt độ",
      });
    } catch (error) {
      console.error("Lỗi chia sẻ:", error);
      alert("Không thể chia sẻ kết quả!");
    }
  };

  return (
    <div className="app-container">
      <h1>🌡 Chuyển đổi nhiệt độ</h1>
      <input
        type="number"
        placeholder="Nhập nhiệt độ (°C)"
        value={celsius}
        onChange={(e) => setCelsius(e.target.value)}
      />
      <button onClick={convertTemperature}>🔄 Chuyển đổi</button>

      {fahrenheit !== null && <h2>🔥 {celsius}°C = {fahrenheit.toFixed(2)}°F</h2>}

      <button onClick={shareResult} disabled={fahrenheit === null}>
        📤 Chia sẻ
      </button>
      <button onClick={getLocation}>📍 Lấy vị trí</button>

      {location && <p>{location}</p>}
    </div>
  );
};

export default App;