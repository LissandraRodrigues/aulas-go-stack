import React, { useState, useEffect } from 'react';

import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, Touchable, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App() {
    
    const [projects, setProjects] = useState([]);

    useEffect(() => {

        api.get('projects').then(response => {
            setProjects(response.data);

        })

    }, []);

    async function handleAddProject() {

        const response = await api.post('projects', {

            title: `Novo projeto ${ Date.now() }`,
            owner: 'Luiza Lissandra'

        });

        const project = response.data;

        setProjects([...projects, project]);

    }

    return (

        <>

            <StatusBar backgroundColor = "#7159c1" barStyle = "light-content"/> 

            {/* É a parte visível da tela. */}
            <SafeAreaView style = { styles.container }>

                <Text style = { styles.title }> Projetos </Text>

                <FlatList

                    // É a lista.
                    data = { projects }

                    // É o que cada elemento tem de único.
                    keyExtractor = { project => project.id }

                    // É o que será renderizado em tela. item representa cada um dos projetos. item: project é uma renomeação.
                    renderItem = {({ item: project }) => (
                        
                        <Text style = { styles.project }> { project.title } </Text>
                        
                    )}
                        
                />

                <TouchableOpacity

                    onPress = { handleAddProject }
                    activeOpacity = { 0.9 }
                    style = { styles.button }

                >

                    <Text style = { styles.buttonText }> Adicionar projeto </Text>

                </TouchableOpacity>

            </SafeAreaView>

           {/* <View style = { styles.container } >

                <Text style = { styles.title }> Projetos </Text>

               { projects.map(project => (
               
                    <Text style = { styles.project } id = { project.id }> { project.title } </Text>)
                
                )}

               </View>
               
            */}

        </>

    );
    
};

const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: "#7159c1",

    },

    title: {

        color: "#fff",
        fontSize: 54,
        fontWeight: "bold",
        marginBottom: 30,
        alignSelf: "center"

    },
    
    project: {

        color: "#fff",
        fontSize: 30

    },
    
    button: {

        backgroundColor: '#fff',
        margin: 20,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: "center"

    },

    buttonText: {

        fontWeight: 'bold',
        fontSize: 16

    }

});