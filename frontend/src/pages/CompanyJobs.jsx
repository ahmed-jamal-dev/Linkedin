import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserFromToken } from "../utils/auth";
import { Link } from "react-router-dom";

const CompanyJobs = () => {
  const user = getUserFromToken();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // فلترة الوظائف الخاصة بالشركة فقط
        const companyJobs = res.data.filter(
          (job) => job.company === user.id
        );

        setJobs(companyJobs);
      } catch (err) {
        console.error(err);
        setError("فشل تحميل الوظائف");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user?.id]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("هل أنت متأكد أنك تريد حذف هذه الوظيفة؟");

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء حذف الوظيفة");
    }
  };

  if (!user || user.role !== "company") {
    return (
      <div className="text-center text-red-500 mt-10 text-xl">
        غير مصرح لك بالدخول هنا.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        الوظائف التي قمت بنشرها
      </h1>

      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-300">جارٍ التحميل...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : jobs.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          لا توجد وظائف منشورة بعد.
        </p>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow-sm dark:bg-gray-800"
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {job.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{job.description}</p>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                📍 {job.location} | 🕒 {job.type}
              </div>
              <div className="flex gap-4">
                <Link
                  to={`/company/jobs/edit/${job._id}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  تعديل
                </Link>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="text-red-600 hover:underline"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyJobs;
