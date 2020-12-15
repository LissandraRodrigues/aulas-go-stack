import React, { useState, useEffect } from 'react';
import api from './services/api';

import Header from './components/Header';

import './App.css';

function App() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {

        // Não foi preciso digitar toda a URL por conta do base_url definido no arquivo api.js
        // O then poderia ser substituído pelo async e await.
        api.get('projects').then(response => {

            // Atualiza projects com os dados da API.
            setProjects(response.data);

        });

    }, []);

    async function handleAddProject() {

        //setProjects([...projects, `Novo projeto - ${Date.now()}`]);

        const response = await api.post('projects', {

            title: `Novo projeto - ${Date.now()}`,
            owner: 'Luiza Lissandra'

        });

        const project = response.data;

        setProjects([...projects, project]);

    }; 

    return (

        <>

            <Header title =  "Projects"/>

            <ul>

                { projects.map(project => <li key = { project.id }> { project.title } </li>) }

            </ul>

            <button type = "button" onClick = { handleAddProject }> Adicionar projeto </button>

        </>

    );

};

export default App;