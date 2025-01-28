import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@components/ui/button";
import { Card } from "@chakra-ui/react";
import { Input } from "@components/ui/input";

const Admin = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if the user is logged in by verifying the token
  const token = localStorage.getItem("authToken");
  if (!token) {
    navigate("/sign"); // Redirect to login page if not logged in
  }

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError(null); // Reset error if file is selected
    } else {
      setError("Please select a valid PDF file.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      // Send the file to the backend
      const response = await axios.post(
        "https://your-api-endpoint.com/upload", // Replace with your API endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Include the token in the header for authentication
          },
        }
      );

      // Handle successful file upload
      if (response.status === 200) {
        alert("File uploaded successfully!");
        setFile(null); // Reset the file input
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading the file. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-100">
      <Card className="p-8 w-full max-w-md bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-xl font-semibold mb-6 text-gray-700">
          Upload Your PDF
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-item">
            <label
              htmlFor="pdf"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Select PDF File
            </label>
            <Input
              type="file"
              id="pdf"
              accept="application/pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
            type="submit"
          >
            Upload PDF
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Admin;
