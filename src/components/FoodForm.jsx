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
    console.log("Form Data:", formData); // Debug
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
          <label className="block text-gray-600 text-sm font-medium">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-600 text-sm font-medium">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-600 text-sm font-medium">
            Weight (kg)
          </label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Enter your weight"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-600 text-sm font-medium">
            Height (cm)
          </label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="Enter your height"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-600 text-sm font-medium">
            Activity Level
          </label>
          <select
            name="activity_level"
            value={formData.activity_level}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
            <option value="very active">Very Active</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-600 text-sm font-medium">
            Carbohydrates (g)
          </label>
          <input
            type="number"
            name="carbohydrates"
            value={formData.carbohydrates}
            onChange={handleChange}
            placeholder="Enter carbs amount"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-600 text-sm font-medium">
            Protein (g)
          </label>
          <input
            type="number"
            name="protein"
            value={formData.protein}
            onChange={handleChange}
            placeholder="Enter protein amount"
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
