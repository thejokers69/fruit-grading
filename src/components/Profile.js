import React, { useState } from 'react';
import axios from 'axios';
import './Profile.css';

const initialProfiles = [{
        id: 1,
        firstName: 'Brahim',
        lastName: 'Lakssir',
        role: 'Admin',
        photo: '/assets/blakssir.jpeg'
    },
    {
        id: 2,
        firstName: 'Nouhaila',
        lastName: 'Benzakour',
        role: 'Admin',
        photo: '/assets/logo.svg'
    },
    {
        id: 3,
        firstName: 'Mohamed',
        lastName: 'Lakssir',
        role: 'User',
        photo: '/assets/logo.svg'
    },
];

const Profile = () => {
    const [profiles, setProfiles] = useState(initialProfiles);
    const [editingProfile, setEditingProfile] = useState(null);
    const [newProfile, setNewProfile] = useState({ firstName: '', lastName: '', role: '', photo: '' });
    const [file, setFile] = useState(null);

    const handleEdit = (id) => {
        const profile = profiles.find(p => p.id === id);
        setEditingProfile(profile);
    };

    const handleDelete = (id) => {
        setProfiles(profiles.filter(p => p.id !== id));
    };

    const handleAdd = () => {
        const newId = profiles.length ? profiles[profiles.length - 1].id + 1 : 1;
        setProfiles([...profiles, {...newProfile, id: newId }]);
        setNewProfile({ firstName: '', lastName: '', role: '', photo: '' });
    };

    const handleUpdate = () => {
        setProfiles(profiles.map(p => (p.id === editingProfile.id ? editingProfile : p)));
        setEditingProfile(null);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async() => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await axios.post('http://localhost:3001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setNewProfile({...newProfile, photo: res.data.filePath });
        } catch (err) {
            console.error('Error uploading file:', err);
        }
    };

    return ( <
            div >
            <
            h2 > Profile Information < /h2> {
            profiles.map(profile => ( <
                div key = { profile.id }
                className = "profile-container" >
                <
                img src = { `http://localhost:3001${profile.photo}` }
                alt = { `${profile.firstName} ${profile.lastName}` }
                className = "profile-photo" / >
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
                placeholder = "First Name" / >
                <
                input type = "text"
                value = { editingProfile.lastName }
                onChange = {
                    (e) => setEditingProfile({...editingProfile, lastName: e.target.value })
                }
                placeholder = "Last Name" / >
                <
                input type = "text"
                value = { editingProfile.role }
                onChange = {
                    (e) => setEditingProfile({...editingProfile, role: e.target.value })
                }
                placeholder = "Role" / >
                <
                input type = "text"
                value = { editingProfile.photo }
                onChange = {
                    (e) => setEditingProfile({...editingProfile, photo: e.target.value })
                }
                placeholder = "Photo URL" / >
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
    placeholder = "First Name" / >
        <
        input type = "text"
    value = { newProfile.lastName }
    onChange = {
        (e) => setNewProfile({...newProfile, lastName: e.target.value })
    }
    placeholder = "Last Name" / >
        <
        input type = "text"
    value = { newProfile.role }
    onChange = {
        (e) => setNewProfile({...newProfile, role: e.target.value })
    }
    placeholder = "Role" / >
        <
        input type = "file"
    onChange = { handleFileChange }
    /> <
    button onClick = { handleFileUpload } > Upload Photo < /button> <
    button onClick = { handleAdd } > Add < /button> < /
    div > <
        /div>
);
};

export default Profile;