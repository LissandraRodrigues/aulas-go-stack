import { Request, Response } from 'express';

import createUser from './services/CreateUser';

export function helloWorld(request: Request, response: Response) {

    const user = createUser({
        
        name: 'Luiza',
        email: 'luizalissandrarosa@poli.ufrj.br',
        password: '123456789',
        techs: [
                
            'Node.js',
            'ReactJS',
            'React Native',

            {
                title: 'Javascript',
                experience: 75

            },

            { 

                title: 'Python',
                experience: 100

             }

        ]
    
    });

    console.log(user.name)

    return response.json(

        { message: 'Hello, World!' }

    );

};