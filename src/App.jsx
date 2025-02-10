import { useState } from "react";
import FoodForm from "./components/FoodForm";
import "./index.css";

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImage = async (query) => {
    try {
      console.log("Fetching image for:", query); // ✅ Debug ชื่ออาหารที่ส่งไป
    
      const accessKey = "bt1b4PZAlNUuDgbw1PMhUX1_OnUuC6mZtYiJdX3YlYk"; // API Key
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`
      );
      const data = await response.json();
    
      console.log("Unsplash API response for", query, ":", data); // ✅ Debug ผลลัพธ์ที่ได้จาก Unsplash
  
      if (!data.results || data.results.length === 0) {
        console.warn(`No image found for "${query}"`);
        return null;  // ✅ แสดงข้อความเตือนถ้าไม่มีรูป
      }
  
      return data.results[0].urls.small;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  const fetchRecommendations = async (data) => {
    try {
      setLoading(true);
      setError(null);
      setResults([]);
    
      console.log("Sending data:", data);
    
      const response = await fetch("https://fast-api-production-e150.up.railway.app/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    
      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }
    
      const result = await response.json();
      console.log("Received recommendations:", result);
    
      if (!result.recommended_foods || result.recommended_foods.length === 0) {
        console.warn("No recommended foods found.");
        setResults([]);
        return;
      }
  
      console.log("Fetching images for:", result.recommended_foods.map(f => f["Food Name"]));
  
      // ✅ เพิ่มภาพลงไปในผลลัพธ์
      const enrichedResults = await Promise.all(
        result.recommended_foods.map(async (item) => {
          if (!item["Food Name"]) {
            console.warn("Food Name is missing in:", item);
            return { ...item, imageUrl: null };
          }
  
          const imageUrl = await fetchImage(item["Food Name"]); // ✅ ใช้ชื่ออาหารเพื่อหาภาพ
          return { ...item, imageUrl };
        })
      );
    
      setResults(enrichedResults);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setError("Failed to fetch recommendations");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <FoodForm onRecommend={fetchRecommendations} />
      {loading && <p className="text-blue-500 text-center mt-4">Loading recommendations...</p>}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {Array.isArray(results) && results.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {results.map((item, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-lg border border-gray-200">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item["Food Name"]} className="w-full h-32 object-cover rounded-lg" />
              ) : (
                <div className="w-full h-32 bg-gray-200 flex items-center justify-center rounded-lg">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <h2 className="text-lg font-bold text-gray-800 mt-2">{item["Food Name"]}</h2>
              <p className="text-gray-600 text-sm">Glycemic Index: <span className="font-semibold">{parseFloat(item["Glycemic Index"]).toFixed(2)}</span></p>
            </div>
          ))}
        </div>
      )}
      {!loading && !error && results.length === 0 && (
        <p className="text-gray-500 text-center mt-4">No recommendations available.</p>
      )}
      <div className="w-full flex justify-center mt-6">
        <button
          onClick={() => window.open("https://hub.2i2c-bare.mybinder.org/user/akkarinjb-notebook-food-recommen-jzkr4wc9/lab/tree/model3_matrix.ipynb", "_blank")}
          className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-slate-900 transition shadow-md"
        >
          About Model
        </button>
      </div>
    </div>
  );
}

export default App;
