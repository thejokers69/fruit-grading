// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
    const [profiles, setProfiles] = useState([]);
    const [editingProfile, setEditingProfile] = useState(null);
    const [newProfile, setNewProfile] = useState({ firstName: '', lastName: '', role: '', photo: '' });
    const [file, setFile] = useState(null);

    useEffect(() => {
        // Fetch profiles from server (this would typically be done via an API call)
        setProfiles([
            { id: 1, firstName: 'Brahim', lastName: 'Lakssir', role: 'Admin', photo: '/assets/blakssir.jpeg' },
            { id: 2, firstName: 'Nouhaila', lastName: 'Benzakour', role: 'Admin', photo: '/assets/logo.svg' },
            { id: 3, firstName: 'Mohamed', lastName: 'Lakssir', role: 'User', photo: '/assets/logo.svg' }
        ]);
    }, []);

    const handleEdit = (id) => {
        const profile = profiles.find(p => p.id === id);
        setEditingProfile(profile);
    };

    const handleDelete = (id) => {
        setProfiles(profiles.filter(p => p.id !== id));
    };

    const handleAdd = async() => {
        const newId = profiles.length ? profiles[profiles.length - 1].id + 1 : 1;
        let photoPath = newProfile.photo;

        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            const response = await fetch('http://localhost:3001/upload', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            photoPath = data.filePath;
        }

        setProfiles([...profiles, {...newProfile, id: newId, photo: photoPath }]);
        setNewProfile({ firstName: '', lastName: '', role: '', photo: '' });
        setFile(null);
    };

    const handleUpdate = async() => {
        let photoPath = editingProfile.photo;

        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            const response = await fetch('http://localhost:3001/upload', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            photoPath = data.filePath;
        }

        setProfiles(profiles.map(p => (p.id === editingProfile.id ? {...editingProfile, photo: photoPath } : p)));
        setEditingProfile(null);
        setFile(null);
    };

    return ( <
            div >
            <
            h2 > Profile Information < /h2> {
            profiles.map(profile => ( <
                div key = { profile.id }
                className = "profile-container" >
                <
                img src = { profile.photo }
                alt = { `${profile.firstName} ${profile.lastName}` }
                className = "profile-photo"
                width = "80" / >
                <
                p > < strong > First Name: < /strong> {profile.firstName}</p >
                <
                p > < strong > Last Name: < /strong> {profile.lastName}</p >
                <
                p > < strong > Full Name: < /strong> {profile.firstName} {profile.lastName}</p >
                <
                p > < strong > Role: < /strong> {profile.role}</p >
                <
                button onClick = {
                    () => handleEdit(profile.id)
                } > Edit < /button> <
                button onClick = {
                    () => handleDelete(profile.id)
                } > Delete < /button> < /
                div >
            ))
        } {
            editingProfile && ( <
                div className = "edit-container" >
                <
                h3 > Edit Profile < /h3> <
                input type = "text"
                value = { editingProfile.firstName }
                onChange = {
                    (e) => setEditingProfile({...editingProfile, firstName: e.target.value })
                }
                placeholder = "First Name" /
                >
                <
                input type = "text"
                value = { editingProfile.lastName }
                onChange = {
                    (e) => setEditingProfile({...editingProfile, lastName: e.target.value })
                }
                placeholder = "Last Name" /
                >
                <
                input type = "text"
                value = { editingProfile.role }
                onChange = {
                    (e) => setEditingProfile({...editingProfile, role: e.target.value })
                }
                placeholder = "Role" /
                >
                <
                input type = "file"
                onChange = {
                    (e) => setFile(e.target.files[0])
                }
                placeholder = "Photo URL" /
                >
                <
                button onClick = { handleUpdate } > Update < /button> < /
                div >
            )
        } <
        div className = "add-container" >
        <
        h3 > Add New Profile < /h3> <
    input type = "text"
    value = { newProfile.firstName }
    onChange = {
        (e) => setNewProfile({...newProfile, firstName: e.target.value })
    }
    placeholder = "First Name" /
        >
        <
        input type = "text"
    value = { newProfile.lastName }
    onChange = {
        (e) => setNewProfile({...newProfile, lastName: e.target.value })
    }
    placeholder = "Last Name" /
        >
        <
        input type = "text"
    value = { newProfile.role }
    onChange = {
        (e) => setNewProfile({...newProfile, role: e.target.value })
    }
    placeholder = "Role" /
        >
        <
        input type = "file"
    onChange = {
        (e) => setFile(e.target.files[0])
    }
    placeholder = "Photo URL" /
        >
        <
        button onClick = { handleAdd } > Add < /button> < /
        div > <
        /div>
);
};

export default Profile;