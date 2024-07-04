import axios from 'axios';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método não permitido' });
    }

    // Caminho para o arquivo JSON
    const filePath = path.join(process.cwd(), 'data', 'cnpjs.json');

    // Lê os dados do arquivo JSON
    let cnpjs;
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        cnpjs = JSON.parse(fileContent);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao ler o arquivo JSON' });
    }

    // Função para buscar dados da API
    async function fetchCnpjData(cnpj) {
        const normalizedCnpj = cnpj.replace(/[^\d]+/g, '');
        const url = `https://minhareceita.org/${normalizedCnpj}`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar dados para CNPJ ${cnpj}:`, error);
            return null;
        }
    }

    // Atualiza o campo de 'Opção pelo Simples' para cada CNPJ
    for (const cnpjObj of cnpjs) {
        const data = await fetchCnpjData(cnpjObj.CNPJ);
        if (data) {
            cnpjObj['Opção pelo Simples'] = data.opcao_pelo_simples || 'Não disponível';
        }
    }

    // Salva os dados atualizados de volta no arquivo JSON
    try {
        fs.writeFileSync(filePath, JSON.stringify(cnpjs, null, 2), 'utf-8');
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao salvar o arquivo JSON' });
    }

    res.status(200).json({ message: 'Dados atualizados com sucesso' });
}
