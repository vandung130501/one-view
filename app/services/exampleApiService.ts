import axios from 'axios';

// Hàm gọi API bên thứ 3 (ví dụ: lấy thông tin thời tiết)
export async function getWeather(city: string) {
  try {
    const apiKey = process.env.WEATHER_API_KEY; // Lấy API key từ biến môi trường
    const response = await axios.get(`https://api.example.com/weather`, {
      params: { city, apiKey },
    });
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Lỗi khi gọi API thời tiết:', error);
    throw error;
  }
}
