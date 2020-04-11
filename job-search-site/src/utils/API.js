import http from "../services/httpService";

export default {
  // Gets jobs from the Adzuna API
  getJobs: function (jobTitle, location) {
    const params = { where: location, what: jobTitle };
    return http.get("/api/adzuna", { params });
  },
  // Gets all saved jobs
  getSavedJobs: function () {
    return http.get("/api/jobs");
  },
  // Deletes the saved job with the given id
  deleteJob: function (id) {
    return http.delete("/api/jobs/" + id);
  },
  // Saves a job to the database
  saveJob: function (jobData) {
    return http.post("/api/jobs", jobData);
  },
};
