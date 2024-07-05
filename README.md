### Como usar a página "Check CNPJ"

#### 1\. Carregar um arquivo CSV

-   **Descrição:** No início da página, você verá um botão para selecionar um arquivo. Esse botão aceita arquivos no formato `.csv`.
-   **Instruções:** Clique no botão "Escolher arquivo" e selecione um arquivo CSV do seu computador que contenha uma lista de CNPJs. O arquivo deve ter apenas uma coluna com os CNPJs.

#### 2\. Buscar informações dos CNPJs

-   **Descrição:** Após selecionar o arquivo CSV, você pode clicar no botão "Buscar CNPJs" para iniciar a busca das informações dos CNPJs.
-   **Instruções:** Clique no botão "Buscar CNPJs". Isso iniciará a busca das informações de cada CNPJ na API `https://minhareceita.org/{cnpj}`.
-   **Feedback:** Durante a busca, o botão exibirá o texto "Buscando..." e ficará desabilitado até que a busca seja concluída. Se houver algum erro durante o processo, uma mensagem de erro será exibida.

#### 3\. Visualizar os resultados

-   **Descrição:** Após a busca ser concluída, os resultados serão exibidos na página. Os CNPJs serão classificados em duas categorias: "Optantes pelo Simples" e "Não optantes pelo Simples".
-   **Instruções:** Verifique as tabelas que aparecerão abaixo do botão de busca. Cada tabela contém informações como CNPJ, Razão Social, Opção pelo Simples, Data de Opção pelo Simples e Data de Exclusão do Simples.

#### 4\. Exportar resultados para CSV

-   **Descrição:** Se desejar salvar os resultados em um arquivo CSV, você pode usar o botão "Exportar Resultados para CSV".
-   **Instruções:** Clique no botão "Exportar Resultados para CSV". Um arquivo CSV contendo todos os resultados será gerado e baixado automaticamente para o seu computador.

### Estrutura do código

1.  **Estados do componente:**

    -   `csvFile`: Armazena o arquivo CSV carregado pelo usuário.
    -   `results`: Armazena os resultados da busca dos CNPJs.
    -   `loading`: Indica se a busca está em andamento.
    -   `error`: Armazena qualquer mensagem de erro que possa ocorrer durante a busca.
2.  **Funções principais:**

    -   `handleFileChange`: Atualiza o estado `csvFile` quando um arquivo CSV é carregado.
    -   `fetchCNPJ`: Faz uma chamada à API para buscar as informações de um CNPJ específico.
    -   `handleFetchCNPJs`: Lê o arquivo CSV, chama a função `fetchCNPJ` para cada CNPJ e atualiza o estado `results` com os resultados.
    -   `parseCsv`: Usa a biblioteca `PapaParse` para ler o conteúdo do arquivo CSV.
    -   `exportToCsv`: Gera e baixa um arquivo CSV com os resultados da busca.

### Exemplo de uso

1.  **Selecione um arquivo CSV:** ![Selecionar arquivo CSV](#)

2.  **Clique em "Buscar CNPJs":** ![Buscar CNPJs](#)

3.  **Visualize os resultados:** ![Resultados da busca](#)

4.  **Exporte os resultados para CSV:** ![Exportar CSV](#)

### Considerações finais

Essa página é uma ferramenta prática para verificar a situação de CNPJs em relação ao Simples Nacional, permitindo que os usuários carreguem uma lista de CNPJs, busquem suas informações e exportem os resultados para um arquivo CSV. Certifique-se de carregar um arquivo CSV com o formato correto para garantir que a busca funcione corretamente.
