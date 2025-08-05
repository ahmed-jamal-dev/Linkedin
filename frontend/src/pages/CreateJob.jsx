import React, { useState } from "react";
import axios from "axios";
import { getUserFromToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const CreateJob = () => {
  const navigate = useNavigate();
  const user = getUserFromToken();

  if (!user || user.role !== "company") {
    return (
      <div className="text-red-500 text-center mt-10 text-xl">
        غير مصرح لك بالدخول هنا.
      </div>
    );
  }

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    type: "Full-time",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post("http://localhost:5000/api/jobs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Job created:", res.data);
      navigate("/company/jobs"); // بعد الإنشاء روح لصفحة عرض الوظائف
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "حدث خطأ أثناء إنشاء الوظيفة");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        إنشاء وظيفة جديدة
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
            العنوان
          </label>
          <input
            type="text"
            name="title"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
            الوصف
          </label>
          <textarea
            name="description"
            rows="5"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
            الموقع
          </label>
          <input
            type="text"
            name="location"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
            نوع الوظيفة
          </label>
          <select
            name="type"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="Full-time">دوام كامل</option>
            <option value="Part-time">دوام جزئي</option>
            <option value="Remote">عن بعد</option>
            <option value="Internship">تدريب</option>
          </select>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold transition duration-300"
        >
          إضافة الوظيفة
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
