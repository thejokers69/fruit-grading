// FRUIT-GRADING/src/components/Profile.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import "./Profile.css";



const Profile = () => {
  const { user, updateUser } = useAuth();
  const [editingProfile, setEditingProfile] = useState(false);
  const [file, setFile] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    role: user?.role || "",
    photo: user?.photo || "",
  });

  // Update the updatedUser state when the user object changes
  useEffect(() => {
    if (user) {
      setUpdatedUser({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        role: user.role || "",
        photo: user.photo || "",
      });
    }
  }, [user]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUpdatedUser({ ...updatedUser, photo: reader.result });
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpdate = async () => {
    let photoPath = updatedUser.photo;
    console.log("user ID: " + user?.id);
    console.log("user object:", user);

    if (!user || !user.id) {
      alert("Error: User not properly loaded. Please refresh the page and try again.");
      return;
    }

    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch("http://localhost:3001/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          photoPath = data.filePath;
        } else {
          const errorText = await response.text();
          throw new Error(`Erreur de téléchargement de l'image: ${errorText}`);
        }
      }

      const updatedProfile = {
        ...updatedUser,
        photo: photoPath,
      };

      await updateUser(user.id, updatedProfile);
      setEditingProfile(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  // The return statement should now be properly inside the function component block
  return (
    <div className="profile-container">
      <h2>Informations du Profil</h2>
      <div className="profile-details">
        {updatedUser.photo ? (
          <img
            src={updatedUser.photo}
            alt={`${updatedUser.firstName} ${updatedUser.lastName}`}
            className="profile-photo"
          />
        ) : (
          <div className="profile-photo-placeholder">
            <span>No Photo</span>
          </div>
        )}
        <p>
          <strong>Prénom :</strong> {updatedUser.firstName}
        </p>
        <p>
          <strong>Nom :</strong> {updatedUser.lastName}
        </p>
        <p>
          <strong>Nom complet :</strong>{" "}
          {`${updatedUser.firstName} ${updatedUser.lastName}`}
        </p>
        <p>
          <strong>Rôle :</strong> {updatedUser.role}
        </p>
        {user && user.id && (
          <button onClick={() => setEditingProfile(true)}>Modifier</button>
        )}
        {!user || !user.id && (
          <p><em>Loading user profile...</em></p>
        )}
      </div>
      {editingProfile && (
        <div className="edit-container">
          <h3>Modifier le profil</h3>
          <input
            type="text"
            value={updatedUser.firstName}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, firstName: e.target.value })
            }
            placeholder="Prénom"
          />
          <input
            type="text"
            value={updatedUser.lastName}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, lastName: e.target.value })
            }
            placeholder="Nom"
          />
          <select
            value={updatedUser.role}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, role: e.target.value })
            }
          >
            <option value="admin">Admin</option>
            <option value="user">Utilisateur</option>
          </select>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpdate}>Mettre à jour</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
