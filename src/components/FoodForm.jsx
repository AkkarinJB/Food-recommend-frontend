import { useState } from "react";

const FoodForm = ({ onRecommend }) => {  // ✅ รับ onRecommend จาก props
  const [formData, setFormData] = useState({
    age: "",
    gender: "male",
    weight: "",
    height: "",
    activity_level: "moderate",
    carbohydrates: "",
    protein: "",
    recommendations: 5,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    onRecommend(formData);  // ✅ เปลี่ยนจาก fetchRecommendations เป็น onRecommend
  };

  return (
    <form className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-gray-700 text-center">
        Food Recommendation KNN Model
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600 text-sm font-medium">อายุ</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="กรอกอายุของคุณ"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-600 text-sm font-medium">เพศ</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="male">ชาย</option>
            <option value="female">หญิง</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          Recommend
        </button>
      </div>
    </form>
  );
};

export default FoodForm;