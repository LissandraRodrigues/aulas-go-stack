import React from "react";

import { Link, useRouteMatch } from 'react-router-dom';

import logoImg from '../../assets/logo-github.svg';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
    repository: string;
}

// FC -> Function Component.
const Repository: React.FC = () => {

    const { params } = useRouteMatch<RepositoryParams>();

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

            <RepositoryInfo>
                
                <header>

                    <img src='https://avatars0.githubusercontent.com/u/34509117?s=460&u=8982a6730a6896931d9fb725503125331fce43c3&v=4' alt="Luiza Lissandra" />    

                    <div> 

                        <strong> Luiza Lissandra </strong>
                        <p> Descrição </p>

                    </div> 

                </header>
                
                <ul>

                    <li> 

                        <strong> 333 </strong>
                        <span> Stars </span>

                    </li>    

                    <li> 

                        <strong> 33 </strong>
                        <span> Forks </span>

                    </li> 

                    <li> 

                        <strong> 3 </strong>
                        <span> Issues abertas </span>

                    </li>   

                </ul>

            </RepositoryInfo> 

            <Issues> 

                <Link to='teste'> 
                                
                    <div>

                        <strong> yfg </strong>
                        <p> fjc </p>

                    </div>

                    <FiChevronRight size={20} />

                </Link>  

            </Issues>

        </>

    );
};

export default Repository;
