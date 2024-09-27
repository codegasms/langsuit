"use client" ;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Languages = ({ username }) => {
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/user/${username}/languages`);
                setLanguages(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching languages:', error);
                setLoading(false);
            }
        };

        fetchLanguages();
    }, [username]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 bg-gray-800 rounded">
            <h2 className="text-xl font-semibold text-white">Languages</h2>
            <ul className="mt-2">
                {languages.map((language) => (
                    <li key={language.id} className="text-white">
                        {language.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Languages;
