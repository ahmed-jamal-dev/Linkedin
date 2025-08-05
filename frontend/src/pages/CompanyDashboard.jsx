import React from "react";
import { Link } from "react-router-dom";

const CompanyDashboard = () => {
  return (
    <div className="max-w-xl mx-auto mt-20 p-6 text-center border rounded-xl dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">لوحة تحكم الشركة</h1>

      <div className="flex flex-col gap-4">
        <Link
          to="/company/jobs/create"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          ➕ إضافة وظيفة جديدة
        </Link>

        <Link
          to="/company/jobs"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          📋 عرض الوظائف الخاصة بي
        </Link>
      </div>
    </div>
  );
};

export default CompanyDashboard;
