import React from "react";

import { FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo-github.svg';

import { Title, Form, Repositories } from './styles';

// FC -> Function Component.
const Dashboard: React.FC = () => {
    return (
       <> 
            <img src={logoImg} alt="Github Explorer" />
            <Title> Explore repositórios no Github. </Title>

            <Form> 
                
                <input placeholder='Digite o nome do repositório' />
                <button type="submit"> Pesquisar </button>
            
            </Form>

            <Repositories>

                <a href='teste'> 
                
                    <img src='https://avatars0.githubusercontent.com/u/34509117?s=460&u=8982a6730a6896931d9fb725503125331fce43c3&v=4' alt="Luiza Lissandra" />
                
                    <div>

                        <strong> aulas-go-stack </strong>
                        <p> Repositório dos projetos feitos durante as aulas do bootcamp Go Stack 14 </p>

                    </div>

                    <FiChevronRight size={20} />

                </a>  

                <a href='teste'> 
                
                <img src='https://avatars0.githubusercontent.com/u/34509117?s=460&u=8982a6730a6896931d9fb725503125331fce43c3&v=4' alt="Luiza Lissandra" />
            
                <div>

                    <strong> aulas-go-stack </strong>
                    <p> Repositório dos projetos feitos durante as aulas do bootcamp Go Stack 14 </p>

                </div>

                <FiChevronRight size={20} />

            </a>  

                <a href='teste'> 
                
                <img src='https://avatars0.githubusercontent.com/u/34509117?s=460&u=8982a6730a6896931d9fb725503125331fce43c3&v=4' alt="Luiza Lissandra" />
            
                <div>

                    <strong> aulas-go-stack </strong>
                    <p> Repositório dos projetos feitos durante as aulas do bootcamp Go Stack 14 </p>

                </div>

                <FiChevronRight size={20} />

            </a>  
                
            </Repositories>

        </>
    );
};

export default Dashboard;
