import { useState } from "react";
const FoodForm = ({ onRecommend }) => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "male",
    weight: "",
    height: "",
    activity_level: "moderate",
    carbohydrates: "",
    protein: "",
    fat: "", 
    fiber_content: "", 
    calories: "",
    recommendations: 5,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.age || !formData.weight || !formData.height || !formData.calories ||
        !formData.carbohydrates || !formData.protein || !formData.fat || !formData.fiber_content) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    setError(null); // ล้าง error ถ้ากรอกครบ

    // คำนวณ BMR
    const bmr =
      formData.gender === "male"
        ? 10 * parseFloat(formData.weight) + 6.25 * parseFloat(formData.height) - 5 * parseFloat(formData.age) + 5
        : 10 * parseFloat(formData.weight) + 6.25 * parseFloat(formData.height) - 5 * parseFloat(formData.age) - 161;

    // คำนวณ TDEE ตาม activity level
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };

    const calories = Math.round(bmr * activityMultipliers[formData.activity_level]);
    console.log("Estimated TDEE:", calories);

    // Prepare Data for API
    const requestData = {
      calories: parseFloat(formData.calories),
      carbohydrates: parseFloat(formData.carbohydrates),
      protein: parseFloat(formData.protein),
      fat: parseFloat(formData.fat),
      fiber_content: parseFloat(formData.fiber_content)
    };

    console.log("📤 Sending Data:", requestData);

    try {
      const response = await fetch("https://fast-api-production-e150.up.railway.app/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch recommendations. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Received recommendations:", data);
      onRecommend(data.recommended_foods);
    } catch (error) {
      console.error("❌ Error fetching recommendations:", error);
      setError("ไม่สามารถรับคำแนะนำได้ กรุณาลองใหม่");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert">{error}</div>}
      <input type="number" name="age" placeholder="Age" onChange={handleChange} />
      <input type="number" name="weight" placeholder="Weight (kg)" onChange={handleChange} />
      <input type="number" name="height" placeholder="Height (cm)" onChange={handleChange} />
      <input type="number" name="calories" placeholder="Calories" onChange={handleChange} />
      <input type="number" name="carbohydrates" placeholder="Carbohydrates (g)" onChange={handleChange} />
      <input type="number" name="protein" placeholder="Protein (g)" onChange={handleChange} />
      <input type="number" name="fat" placeholder="Fat (g)" onChange={handleChange} />
      <input type="number" name="fiber_content" placeholder="Fiber Content (g)" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FoodForm;
