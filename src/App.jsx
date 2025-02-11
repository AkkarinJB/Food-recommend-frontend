import { useState } from "react";
import FoodForm from "./components/FoodForm";
import "./index.css";

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImage = async (query) => {
    try {
      console.log("Fetching image for:", query); //Debug ชื่ออาหารที่ส่งไป
    
      const accessKey = process.env.REACT_APP_UNSPLASH_KEY; 
      if (!accessKey) {
        console.error("Unsplash API Key is missing!");
        return null;
      }
    
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`
      );
      const data = await response.json();
    
      console.log("Unsplash API response for", query, ":", data); //Debug ผลลัพธ์ที่ได้จาก Unsplash
  
      if (!data.results || data.results.length === 0) {
        console.warn(`No image found for "${query}"`);
        return null;  //เตือนถ้าไม่มีรูป
      }
  
      return data.results[0].urls.small;
    } catch (error) {
      console.error("Error fetching image:", error);
      setError("ไม่สามารถโหลดรูปภาพได้ กรุณาลองใหม่");
      return null;
    }
  };

  return (
    <div className="App">
      <h1>Food Recommendation</h1>
      <FoodForm onRecommend={setResults} />
      {error && <div className="alert">{error}</div>}
    </div>
  );
}

export default App;
