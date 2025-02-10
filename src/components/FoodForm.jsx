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
    onRecommend(formData);
  };

  return (
    <form
      className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto space-y-6"
      onSubmit={handleSubmit}
    >
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
          <label className="block text-gray-600 text-sm font-medium">
            เพศ
          </label>
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

        <div>
          <label className="block text-gray-600 text-sm font-medium">
            น้ำหนัก (kg)
          </label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="กรอกน้ำหนักของคุณ"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-600 text-sm font-medium">
            ส่วนสูง (cm)
          </label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="กรอกส่วนสูงของคุณ"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-600 text-sm font-medium">
            การออกกำลังกาย
          </label>
          <select
            name="activity_level"
            value={formData.activity_level}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="sedentary">ไม่ออกกำลังกายเลย</option>
            <option value="light">ออกกำลังกายเล็กน้อย (1-3 วัน/สัปดาห์)</option>
            <option value="moderate">ออกกำลังกายปานกลาง (3-5 วัน/สัปดาห์)</option>
            <option value="active">ออกกำลังกายหนัก (6-7 วัน/สัปดาห์)</option>
            <option value="very active">นักกีฬา ออกกำลังกายหนักมาก</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-600 text-sm font-medium">
            คาโบไฮเดรด(g)
          </label>
          <input
            type="number"
            name="carbohydrates"
            value={formData.carbohydrates}
            onChange={handleChange}
            placeholder="ปริมาณคาโบไฮเดรดที่ร่างกายต้องการเเต่ละวัน"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-600 text-sm font-medium">
            โปรตีน (g)
          </label>
          <input
            type="number"
            name="protein"
            value={formData.protein}
            onChange={handleChange}
            placeholder="ปริมาณโปรตีนที่ร่างกายต้องการเเต่ละวัน"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
      >
        Recommend
      </button>
    </form>
  );
};

export default FoodForm;
