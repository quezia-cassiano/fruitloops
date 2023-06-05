import React, { useState } from 'react';
//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';


//import api from '../../services/api';
import axios from 'axios';

export default function Home() {
    const [marcaInput, setMarca] = useState('');
    const [veiculo, setVeiculo] = useState(null);

    async function handleBuscar() {
        
    /* Start Marca */
        //try {
            //Para Filtrar a MARCA
            const response = await axios.get(`http://localhost:8080/https://www.fruityvice.com/api/fruit/${marcaInput}`);
            //const response  = await api.get(`api/fruit/${nome}`);
            console.log(response);
            /* const marcas = response.data;
            let marcaEncontrada = null;
            for (let i = 0; i < marcas.length; i++) {
                if (marcas[i].nome.toLowerCase() === marcaInput.toLowerCase()) {
                    marcaEncontrada = marcas[i];
                    console.log(marcaEncontrada.codigo);
                    break;
                }
            } */
            /* End Marca */
            
            //--
            const urlFinal = response;
            
            const { status, data} = urlFinal;
            console.log(data);

            if (status != 200 || data.erro) {
                console.log('Buscar', 'Ocorreu um erro ao buscar os modelos da marcaInput.');
            } else {
                setVeiculo(data);
            }

/*        } catch (error) {
            console.log('Buscar', 'Ocorreu um erro');
        } */


    };

    async function handleLimpar() {
        setMarca('');
        setVeiculo(null);
    }

    return (
        <View style={styles.container}>

            <Text style={styles.tittle}>
                Busque por uma Fruta!
            </Text>

            {!veiculo &&
            <TextInput
                style={styles.input}
                onChangeText={setMarca}
                onSubmitEditing={handleBuscar}
                placeholder="Digite aqui para pesquisar"
                placeholderTextColor="#2F48D4"
                value={marcaInput}
            />}

            
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={veiculo ? handleLimpar : handleBuscar}>

                <Text style={styles.buttonText}>
                    {veiculo ? 'Limpar' : 'Buscar'}
                </Text>
            </TouchableOpacity>

            {veiculo && (
                <View style={styles.addressarea}>
                    <Text>
                        <Text style={styles.boldText}>Nome: </Text>
                        {veiculo.name}
                    </Text>
                    
                    <Text>
                        <Text style={styles.boldText}>Família: </Text>
                        {veiculo.family}
                    </Text>

                    <Text>
                        <Text style={styles.boldText}>Calorias: </Text>
                        {veiculo.nutritions.calories}
                    </Text>
                    
                    <Text>
                        <Text style={styles.boldText}>Carboidratos: </Text>
                        {veiculo.nutritions.carbohydrates}
                    </Text>

                    <Text>
                        <Text style={styles.boldText}>Proteínas: </Text>
                        {veiculo.nutritions.protein}
                    </Text>

                    <Text>
                        <Text style={styles.boldText}>Açúcar: </Text>
                        {veiculo.nutritions.sugar}
                    </Text>
                </View>
            )}

        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#64e892',
        flex: '1',
        padding: '20px',
      },

      tittle: {
        fontSize: '20px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
      },

      input: {
        backgroundColor: '#FFF',
        borderRadius: '5px',
        color: '#2F48D4',
        fontSize: '16px',
        marginTop: '20px',
        width: '100%',
        
        height: '35px',
        padding: '10px',
      },

      button: {
        alignItems: 'center',
        backgroundColor: '#5D3FD3',
        borderRadius: '5px',
        marginTop: '20px',
        padding: '8px',
        width: '100%',
      },

      buttonText: {
        color: '#fff',
        fontSize: '18px',
        fontSeight: 'bold',
        textTransform: 'uppercase',
      },

      boldText: {
        fontWeight: 'bold',
      },

      addressarea: {
        alignItems: 'left',
        marginTop: '15px',
      },
});