import Head from 'next/head';

export default function Sobre() {
    return (
        <div className="relative bg-gray-100 py-16 min-h-screen">
            <Head>
                <title>Sobre o Projeto - Check CNPJ</title>
            </Head>
            <div className="mx-auto h-full max-w-9xl px-6 lg:px-8">
                <div className="mb-4">
                    <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl text-center mb-8">
                        Sobre o Projeto - Check CNPJ
                    </h2>
                    <div className="bg-white rounded-md p-6 shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Como usar a página "Check CNPJ"</h3>
                        <p className="text-gray-700 mb-4">
                            A página "Check CNPJ" é um aplicativo React que permite aos usuários carregar um arquivo CSV contendo uma lista de CNPJs, buscar informações desses CNPJs em uma API, exibir os resultados e exportá-los de volta para um arquivo CSV.
                        </p>

                        <h4 className="text-lg font-semibold text-gray-800 mb-2">1. Carregar um arquivo CSV</h4>
                        <p className="text-gray-700 mb-4">
                            <strong>Descrição:</strong> No início da página, você verá um botão para selecionar um arquivo. Esse botão aceita arquivos no formato `.csv`.<br />
                            <strong>Instruções:</strong> Clique no botão "Escolher arquivo" e selecione um arquivo CSV do seu computador que contenha uma lista de CNPJs. O arquivo deve ter apenas uma coluna com os CNPJs.
                        </p>

                        <h4 className="text-lg font-semibold text-gray-800 mb-2">2. Buscar informações dos CNPJs</h4>
                        <p className="text-gray-700 mb-4">
                            <strong>Descrição:</strong> Após selecionar o arquivo CSV, você pode clicar no botão "Buscar CNPJs" para iniciar a busca das informações dos CNPJs.<br />
                            <strong>Instruções:</strong> Clique no botão "Buscar CNPJs". Isso iniciará a busca das informações de cada CNPJ na API https://minhareceita.org.<br />
                            <strong>Feedback:</strong> Durante a busca, o botão exibirá o texto "Buscando..." e ficará desabilitado até que a busca seja concluída. Se houver algum erro durante o processo, uma mensagem de erro será exibida.
                        </p>

                        <h4 className="text-lg font-semibold text-gray-800 mb-2">3. Visualizar os resultados</h4>
                        <p className="text-gray-700 mb-4">
                            <strong>Descrição:</strong> Após a busca ser concluída, os resultados serão exibidos na página. Os CNPJs serão classificados em duas categorias: "Optantes pelo Simples" e "Não optantes pelo Simples".<br />
                            <strong>Instruções:</strong> Verifique as tabelas que aparecerão abaixo do botão de busca. Cada tabela contém informações como CNPJ, Razão Social, Opção pelo Simples, Data de Opção pelo Simples e Data de Exclusão do Simples.
                        </p>

                        <h4 className="text-lg font-semibold text-gray-800 mb-2">4. Exportar resultados para CSV</h4>
                        <p className="text-gray-700 mb-4">
                            <strong>Descrição:</strong> Se desejar salvar os resultados em um arquivo CSV, você pode usar o botão "Exportar Resultados para CSV".<br />
                            <strong>Instruções:</strong> Clique no botão "Exportar Resultados para CSV". Um arquivo CSV contendo todos os resultados será gerado e baixado automaticamente para o seu computador.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Estrutura do código</h3>
                        <p className="text-gray-700 mb-4">
                            <strong>Estados do componente:</strong><br />
                            - `csvFile`: Armazena o arquivo CSV carregado pelo usuário.<br />
                            - `results`: Armazena os resultados da busca dos CNPJs.<br />
                            - `loading`: Indica se a busca está em andamento.<br />
                            - `error`: Armazena qualquer mensagem de erro que possa ocorrer durante a busca.
                        </p>

                        <p className="text-gray-700 mb-4">
                            <strong>Funções principais:</strong><br />
                            - `handleFileChange`: Atualiza o estado `csvFile` quando um arquivo CSV é carregado.<br />
                            - `fetchCNPJ`: Faz uma chamada à API para buscar as informações de um CNPJ específico.<br />
                            - `handleFetchCNPJs`: Lê o arquivo CSV, chama a função `fetchCNPJ` para cada CNPJ e atualiza o estado `results` com os resultados.<br />
                            - `parseCsv`: Usa a biblioteca `PapaParse` para ler o conteúdo do arquivo CSV.<br />
                            - `exportToCsv`: Gera e baixa um arquivo CSV com os resultados da busca.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Exemplo de uso</h3>
                        <p className="text-gray-700 mb-4">
                            <strong>Selecione um arquivo CSV:</strong><br />
                            Selecionar arquivo CSV
                        </p>
                        <p className="text-gray-700 mb-4">
                            <strong>Clique em "Buscar CNPJs":</strong><br />
                            Buscar CNPJs
                        </p>
                        <p className="text-gray-700 mb-4">
                            <strong>Visualize os resultados:</strong><br />
                            Resultados da busca
                        </p>
                        <p className="text-gray-700 mb-4">
                            <strong>Exporte os resultados para CSV:</strong><br />
                            Exportar CSV
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Considerações finais</h3>
                        <p className="text-gray-700">
                            Essa página é uma ferramenta prática para verificar a situação de CNPJs em relação ao Simples Nacional, permitindo que os usuários carreguem uma lista de CNPJs, busquem suas informações e exportem os resultados para um arquivo CSV. Certifique-se de carregar um arquivo CSV com o formato correto para garantir que a busca funcione corretamente.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
