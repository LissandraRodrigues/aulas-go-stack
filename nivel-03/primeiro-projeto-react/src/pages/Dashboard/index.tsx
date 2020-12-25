import React, { useState, useEffect, FormEvent } from "react";
import { Link } from 'react-router-dom';

import { FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo-github.svg';

import api from '../../services/api';

import { Title, Form, Repositories, Error } from './styles';

interface Repository {

    full_name: string;
    description: string;
    owner: {

        login: string;
        avatar_url: string;

    };

}

// FC -> Function Component.
const Dashboard: React.FC = () => {

    const [ newRepo, setNewRepo ] = useState("");

    const [ inputError, setInputError ] = useState("");

    const [ repositories, setRepositories ] = useState<Repository[]>(() => {

        const storagedRepositories = localStorage.getItem('@GithubExplorer:repositories');

        if(storagedRepositories) {

            // Recupera os dados transformando o JSON em array.
            return JSON.parse(storagedRepositories);

        } else {

            return [];

        };

    });

    useEffect(() => {

        // Armazena transformando array em JSON.
        localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));

    }, [repositories]);

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {

        event.preventDefault();

        if(!newRepo) {

            setInputError("🚫 Digite o nome do autor/nome do repositório!");
            return;
        };

        try {

            const response = await api.get<Repository>(`repos/${newRepo}`);

            const newRepository = response.data;

            setRepositories([...repositories, newRepository]);

            setNewRepo("");
            setInputError("");

        } catch (err) {

            setInputError("🚫  Erro na busca por esse repositório!");

        }

    }

    return (
       <> 
            <img src={logoImg} alt="Github Explorer" />
            <Title> Explore repositórios no Github. </Title>

            <Form hasError={!!inputError} onSubmit={handleAddRepository}> 
                
                <input
                    value={newRepo}
                    onChange={event => setNewRepo(event.target.value)}
                    placeholder='Digite o nome do repositório'    
                />

                <button type="submit"> Pesquisar </button>
            
            </Form>

            { inputError && <Error> { inputError } </Error> } 

            <Repositories>

                { repositories.map(repository => (

                    <Link key = {repository.full_name} to={`/repositories/${repository.full_name}`}> 
                                    
                    <img src={repository.owner.avatar_url} alt={repository.owner.login} />

                    <div>

                        <strong> {repository.full_name} </strong>
                        <p> {repository.description} </p>

                    </div>

                    <FiChevronRight size={20} />

                    </Link>  

                )) }

            </Repositories>

        </>
    );
};

export default Dashboard;
