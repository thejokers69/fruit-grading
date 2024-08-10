// src/components/Profile.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import './Profile.css';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [editingProfile, setEditingProfile] = useState(false);
    const [file, setFile] = useState(null);
    const [updatedUser, setUpdatedUser] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        role: user?.role || '',
        photo: user?.photo || '',
    });

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

        try {
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                const response = await fetch('http://localhost:3001/upload', {
                    method: 'POST',
                    body: formData
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
            console.error('Erreur lors de la mise à jour du profil:', error);
            alert('Une erreur est survenue lors de la mise à jour du profil. Veuillez réessayer.');
        }
    };

    return (
        <div className="profile-container">
            <h2>Informations du Profil</h2>
            <div className="profile-details">
                <img src={updatedUser.photo} alt={`${updatedUser.firstName} ${updatedUser.lastName}`} className="profile-photo" />
                <p><strong>Prénom :</strong> {updatedUser.firstName}</p>
                <p><strong>Nom :</strong> {updatedUser.lastName}</p>
                <p><strong>Nom complet :</strong> {`${updatedUser.firstName} ${updatedUser.lastName}`}</p>
                <p><strong>Rôle :</strong> {updatedUser.role}</p>
                <button onClick={() => setEditingProfile(true)}>Modifier</button>
            </div>
            {editingProfile && (
                <div className="edit-container">
                    <h3>Modifier le profil</h3>
                    <input
                        type="text"
                        value={updatedUser.firstName}
                        onChange={(e) => setUpdatedUser({ ...updatedUser, firstName: e.target.value })}
                        placeholder="Prénom"
                    />
                    <input
                        type="text"
                        value={updatedUser.lastName}
                        onChange={(e) => setUpdatedUser({ ...updatedUser, lastName: e.target.value })}
                        placeholder="Nom"
                    />
                    <select value={updatedUser.role} onChange={(e) => setUpdatedUser({ ...updatedUser, role: e.target.value })}>
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