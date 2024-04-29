import React, { useState } from "react";
import axios from "axios";

const ProfilePictureUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    try {
      await axios.post("/api/upload-profile-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile picture uploaded successfully!");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile picture");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Profile Picture</button>
    </div>
  );
};

export default ProfilePictureUpload;
