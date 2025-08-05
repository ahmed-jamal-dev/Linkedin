const Application = require("../models/Application");

exports.applyToJob = async (req, res) => {
  try {
    console.log("📩 Received application request")
    console.log("📁 Uploaded file:", req.file)
    console.log("👤 User ID:", req.user?.id)
    console.log("🧾 Job ID:", req.params.jobId)

    const { jobId } = req.params;
    const userId = req.user.id;
    const cv = req.file?.filename;

    if (!cv) {
      console.log("🚫 No CV attached")
      return res.status(400).json({ error: "CV file is required (PDF)." });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      user: userId,
    });

    if (existingApplication) {
      return res
        .status(400)
        .json({ error: "You have already applied to this job." });
    }

    const application = new Application({
      job: jobId,
      user: userId,
      cv,
    });

    await application.save();

    console.log("✅ Application saved successfully")
    res.status(201).json({
      message: "Application submitted successfully. Hope for the best!",
    });
  } catch (err) {
    console.error("❌ Server error:", err.message);
    res.status(500).json({ error: "Server error." });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const userId = req.user.id;
    const applications = await Application.find({ user: userId }).populate(
      "job",
      "title description company"
    );
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
};

exports.getApplicationsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await Application.find({ job: jobId }).populate(
      "user",
      "name email"
    );
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
};

const path = require("path");

exports.downloadCV = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, "..", "uploads", filename);

    res.download(filePath);
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "File not found." });
  }
};