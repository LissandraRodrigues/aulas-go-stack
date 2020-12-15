// Módulo do node.
const path = require('path');

module.exports = {

    // Arquivo de entrada da nossa aplicação. O primeiro arquivo a ser carregado pela nossa aplicação.
    entry: path.resolve(__dirname, 'src', 'index.js'),
    
    // Qual arquivo que será gerado depois da conversão.
    output: {

        // Onde o arquivo será criado.
        path: path.resolve(__dirname, 'public'),

        // Nome do arquivo.
        filename: 'bundle.js'

    },

    devServer: {

        contentBase: path.resolve(__dirname, 'public'),

    },

    module: {

        // Composto por loaders.
        rules: [

            {
                // Primeira propriedade obrigatória. É o arquivo que deve ser testado.
                test: /\.js$/,

                // Faz com que a conversão não ocorra na pasta node_modules, pois é responsabilidade da própria biblioteca.
                exclude: /node_modules/,

                use: {

                    // É o que é utilizado para fazer a conversão.
                    loader: 'babel-loader',

                }

            },

            {

                test: /\.css$/,

                exclude: /node_modules/,

                use: [

                    // Pega o CSS interpretado pelo css-loader e injeta no HTML.
                    { loader: 'style-loader' },

                    // Lê os arquivos CSS e as importações feitas dentro dele.
                    { loader: 'css-loader' }

                ]

            },

            {

                test: /.*\.(gif|png|jpe?g)$/i,

                use: {
                    
                    loader: 'file-loader'
                
                }

            }

        ]

    },

};