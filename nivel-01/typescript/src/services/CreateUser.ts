interface TechObject {

    title: string;
    experience: number;

};

interface CreateUserData {

    // Esse ponto de interrogação indica que name é opcional.
    name?: string;  
    email: string;
    password: string;
    techs: Array<string | TechObject>;  

};
                                    // Desestruturação do CreateUserData.
export default function createUser( { name, email, password, techs }: CreateUserData) {

    const user = {

        name, 
        email,
        password,
        techs

    };

    return user;

};