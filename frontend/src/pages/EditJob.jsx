import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    type: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJob(res.data);
        setForm({
          title: res.data.title,
          description: res.data.description,
          location: res.data.location,
          type: res.data.type,
        });
      } catch (err) {
        setError("فشل تحميل البيانات");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(`http://localhost:5000/api/jobs/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/company/jobs");
    } catch (err) {
      alert("فشل التحديث");
    }
  };

  if (loading) return <p className="text-center mt-10">جارٍ التحميل...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border dark:border-gray-700 rounded-xl dark:bg-gray-800">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        تعديل الوظيفة
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="العنوان"
          className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="الوصف"
          className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
          required
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="الموقع"
          className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
          required
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
          required
        >
          <option value="">نوع الوظيفة</option>
          <option value="full-time">دوام كامل</option>
          <option value="part-time">دوام جزئي</option>
          <option value="remote">عن بُعد</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          حفظ التعديلات
        </button>
      </form>
    </div>
  );
};

export default EditJob;
