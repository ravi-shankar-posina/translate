import React, { useState, useEffect } from "react";
import folder from "../assets/folder.png";
import pdf from "../assets/pdf.png";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

const notifyError = (message) => toast.error(message);
const notifySuccess = (message) => toast.success(message);

const Translate = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFileURL, setUploadedFileURL] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [language, setLanguage] = useState("en");
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pdfName, setPdfName] = useState("");

  useEffect(() => {
    fetch("/languages.json")
      .then((response) => response.json())
      .then((data) => setLanguages(data))
      .catch((error) => console.error("Error fetching languages:", error));
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
    setPdfName(file.name);
    const fileURL = URL.createObjectURL(file);
    setUploadedFileURL(fileURL);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleTranslate = async () => {
    if (!uploadedFile || !language) {
      notifyError("Please upload a PDF and select a language");
      return;
    }
  
    setLoading(true);
  
    const formData = new FormData();
    formData.append("pdf", uploadedFile);
    formData.append("targetLanguage", language);
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/translate-pdf`,
        formData,
        {
          responseType: "blob",
        }
      );
  
      const fileURL = URL.createObjectURL(response.data);
      setApiResponse(fileURL);
      notifySuccess("PDF translated successfully!");
    } catch (error) {
      console.error("Error translating PDF:", error);
      notifyError("Error translating PDF");
    } finally {
      setLoading(false);
    }
  };
  

  const handleChangePdf = () => {
    setUploadedFile(null);
    setUploadedFileURL(null);
    setPdfName("");
    document.getElementById("pdf-upload-input").value = null; // Clear the file input value
    document.getElementById("pdf-upload-input").click();
  };

  return (
    <div className="flex flex-col h-full bg-pink-50 p-6">
      <div className="mb-6 flex justify-end items-center">
        <div className="flex items-center space-x-2">
          <label className="mr-2 font-semibold text-gray-700">
            Translate To:
          </label>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="p-2 border border-gray-300 rounded-md w-48 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            {languages.map((lang) => (
              <option key={lang["ISO-639 code"]} value={lang["ISO-639 code"]}>
                {lang.Language}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center mx-4">
          <button
            onClick={handleTranslate}
            className="p-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
          >
            Translate
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full h-full gap-6">
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-lg relative">
          {!uploadedFile ? (
            <label className="flex flex-col items-center justify-center cursor-pointer text-center">
              <input
                id="pdf-upload-input"
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf"
              />
              <img src={folder} alt="Upload" className="w-24 mb-4" />
              <span className="text-lg font-semibold text-gray-700">
                Upload PDF
              </span>
            </label>
          ) : (
            <div className="flex flex-col items-center w-full">
              <object
                data={uploadedFileURL}
                type="application/pdf"
                title="Uploaded PDF"
                className="w-full h-96 border border-gray-300 rounded-lg mb-4"
              ></object>
              <div className="flex items-center space-x-4">
                <p className="text-center text-lg font-semibold">{pdfName}</p>
                <button
                  onClick={handleChangePdf}
                  className="p-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
                >
                  Change PDF
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-lg relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
              <ClipLoader size={50} color="#FF69B4" />
            </div>
          )}
          {!apiResponse ? (
            <div className="flex flex-col items-center justify-center text-center">
              <img src={pdf} alt="PDF placeholder" className="w-24 mb-4" />
              <p className="text-gray-700 text-lg font-semibold mb-2">
                Your Translated PDF will appear here once available.
              </p>
              <p className="text-gray-500">
                Please wait while we process your translation.
              </p>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center">
              <object
                data={apiResponse}
                type="application/pdf"
                title="API Response PDF"
                className="w-full h-full border border-gray-300 rounded-lg"
              ></object>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Translate;
