import { useState } from 'react';
import Papa from 'papaparse';

export default function Home() {
    const [csvFile, setCsvFile] = useState(null);
    const [cnpjs, setCnpjs] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setCsvFile(file);
    };

    const fetchCNPJ = async (cnpj) => {
        try {
            const response = await fetch(`https://minhareceita.org/${cnpj}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar CNPJ');
            }
            const result = await response.json();
            return {
                'Nome Fantasia': result.nome_fantasia || 'Não disponível',
                'Razão Social': result.razao_social || 'Não disponível',
                'Opção pelo Simples': result.opcao_pelo_simples || 'Não disponível',
                'Data de Opção pelo Simples': result.data_opcao_pelo_simples || 'Não disponível',
                'Data de Exclusão do Simples': result.data_exclusao_do_simples || 'Não disponível',
            };
        } catch (err) {
            return {
                'Erro': `Erro ao buscar CNPJ: ${err.message}`
            };
        }
    };

    const handleFetchCNPJs = async () => {
        setLoading(true);
        setError(null);
        setResults([]);

        try {
            const parsedCsv = await parseCsv(csvFile);
            const promises = parsedCsv.data.map(async (row) => {
                const cnpj = row[0]; // Assumindo que o CNPJ está na primeira coluna do CSV
                const result = await fetchCNPJ(cnpj);
                return result;
            });

            const results = await Promise.all(promises);
            setResults(results);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const parseCsv = (file) => {
        return new Promise((resolve, reject) => {
            Papa.parse(file, {
                complete: (result) => {
                    resolve(result);
                },
                error: (error) => {
                    reject(error);
                },
            });
        });
    };

    const exportToCsv = () => {
        const csvData = Papa.unparse(results);
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute('download', 'cnpjs_resultados.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="relative h-full bg-gray-900 py-16">
            <div className="mx-auto max-w-9xl px-6 lg:px-8">
                <div className="mb-4 h-full">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-center mb-8">
                        Consulta de CNPJs em Lote
                    </h2>
                    <div className="flex justify-center mb-8">
                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                        <button
                            onClick={handleFetchCNPJs}
                            className="ml-4 rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            disabled={!csvFile || loading}
                        >
                            {loading ? 'Buscando...' : 'Buscar CNPJs'}
                        </button>

                    </div>
                    {results.length > 0 && (
                        <div className="flex justify-center mb-8">
                            <button
                                onClick={exportToCsv}
                                className="rounded-md ml-4 bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                            >
                                Exportar Resultados para CSV
                            </button>
                        </div>
                    )}
                    {error && (
                        <p className="text-white text-center mt-6">
                            Erro ao processar o arquivo CSV: {error}
                        </p>
                    )}
                    {results.length > 0 && (
                        <div className="overflow-hidden bg-gray-800 rounded-md p-4">
                            <h3 className="text-white text-lg font-semibold mb-2">Resultados</h3>
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead>
                                    <tr className="bg-gray-700">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            CNPJ
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Nome Fantasia
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Razão Social
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Opção pelo Simples
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Data de Opção pelo Simples
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Data de Exclusão do Simples
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {results.map((result, index) => (
                                        <tr key={index} className="bg-gray-800">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                                {cnpjs[index]}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                                {result['Nome Fantasia']}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                                {result['Razão Social']}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                                {result['Opção pelo Simples']}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                                {result['Data de Opção pelo Simples']}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                                {result['Data de Exclusão do Simples']}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
