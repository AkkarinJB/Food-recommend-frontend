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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.age || !formData.weight || !formData.height || !formData.calories) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    setError(null); // ล้าง error ถ้ากรอกครบ

    // คำนวณ BMR
    const bmr =
      formData.gender === "male"
        ? 10 * formData.weight + 6.25 * formData.height - 5 * formData.age + 5
        : 10 * formData.weight + 6.25 * formData.height - 5 * formData.age - 161;

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
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert">{error}</div>}
      <input type="number" name="age" placeholder="Age" onChange={handleChange} />
      <input type="number" name="weight" placeholder="Weight (kg)" onChange={handleChange} />
      <input type="number" name="height" placeholder="Height (cm)" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FoodForm;
