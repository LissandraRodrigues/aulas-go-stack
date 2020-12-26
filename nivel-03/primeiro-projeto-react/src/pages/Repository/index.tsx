import React, { useEffect, useState } from "react";

import { Link, useRouteMatch } from 'react-router-dom';

import logoImg from '../../assets/logo-github.svg';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { Header, RepositoryInfo, Issues } from './styles';

import api from '../../services/api';

interface RepositoryParams {
    repository: string;
}

interface Repository {

    full_name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    owner: {

        login: string;
        avatar_url: string;

    };

}

interface Issue {
    id: number;
    title: string;
    user:  {
        login: string;
    };
    html_url: string;

}

// FC -> Function Component.
const RepositoryPage: React.FC = () => {

    const [ repository, setRepository ] = useState<Repository | null>(null);

    const [ issues, setIssues ] = useState<Issue[]>([]);

    const { params } = useRouteMatch<RepositoryParams>();

    useEffect(() => {

        api.get(`repos/${params.repository}`).then(response => {
            setRepository(response.data);
        }); 

        api.get(`repos/${params.repository}/issues`).then(response => {
            setIssues(response.data);
        }); 

        // UMA ALTERNATIVA

        // async function loadData(): Promise<void> {

        //     const [ repository, issues ] = await Promise.all([

        //         api.get(`repos/${params.repository}`),
        //         api.get(`repos/${params.repository}/issues`)
        //     ]);

        // }

        // loadData();

    }, [params.repository]);

    return (

        <>

            <Header> 

                <Link to='/'>

                    <img src={logoImg} alt="Github Explorer" />

                </Link>

                <Link to='/'> 

                    <FiChevronLeft size={20} />
                    Voltar
                    
                </Link>

            </Header>

            { repository ? (

                <RepositoryInfo>
                    
                    <header>

                        <img src={repository.owner.avatar_url} alt={repository.owner.login} />    

                        <div> 

                            <strong> {repository.full_name} </strong>
                            <p> {repository.description} </p>

                        </div> 

                    </header>
                    
                    <ul>

                        <li> 

                            <strong> {repository.stargazers_count} </strong>
                            <span> Stars </span>

                        </li>    

                        <li> 

                            <strong> {repository.forks_count} </strong>
                            <span> Forks </span>

                        </li> 

                        <li> 

                            <strong> {repository.open_issues_count} </strong>
                            <span> Issues abertas </span>

                        </li>   

                    </ul>

                </RepositoryInfo> 

            ) : (

                <p> Carregando... </p>

            )}

            <Issues> 

               {issues.map(issue => (

                    <a key={issue.id} href={issue.html_url}> 
                                                    
                        <div>

                            <strong> {issue.title} </strong>
                            <p> {issue.user.login} </p>

                        </div>

                        <FiChevronRight size={20} />

                    </a>  

               ))}

            </Issues>

        </>

    );
};

export default RepositoryPage;
