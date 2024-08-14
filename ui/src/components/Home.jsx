import React from "react";
import pdf from "../assets/pdf.png";

const Home = () => {
  return (
    <div className="bg-pink-200 flex flex-col justify-center items-center h-full p-6 rounded-2xl">
      <div className="bg-white  rounded-lg p-10 shadow-lg flex  items-center">
        <div>
          <h1 className="text-pink-600 text-3xl font-extrabold mb-4">
            Welcome to Your Translation Hub!
          </h1>
          <p className="text-gray-700 text-lg font-medium mb-6">
            "Bridging languages with precision and ease. Your documents,
            translated flawlessly."
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Upload your documents, select your target language, and let our
            advanced translation tools handle the rest.
          </p>
        </div>

        <div className="flex items-center justify-center w-full">
          <img src={pdf} alt="pdf" className="w-52 h-52" />
        </div>
      </div>
    </div>
  );
};

export default Home;
