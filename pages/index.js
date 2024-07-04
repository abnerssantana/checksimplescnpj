import { useState } from 'react';

export default function Home() {
  const [cnpj, setCnpj] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCNPJ = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://minhareceita.org/${cnpj}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar CNPJ');
      }
      const result = await response.json();
      // Extrair apenas os campos desejados
      const extractedData = {
        nome_fantasia: result.nome_fantasia || 'Não disponível',
        razao_social: result.razao_social || 'Não disponível',
        opcao_pelo_simples: result.opcao_pelo_simples || 'Não disponível',
        data_opcao_pelo_simples: result.data_opcao_pelo_simples || 'Não disponível',
        data_exclusao_do_simples: result.data_exclusao_do_simples || 'Não disponível',
      };
      setData(extractedData);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="relative overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-center mb-8">
            Consulta de CNPJ
          </h2>
          <div className="flex justify-center mb-8">
            <input
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              placeholder="Digite o CNPJ"
              className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
            <button
              onClick={fetchCNPJ}
              className="ml-4 rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              disabled={loading}
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </div>
        {data && (
          <div className="bg-gray-800 rounded-md p-4">
            <p className="text-white"><strong>Razão Social:</strong> {data.razao_social}</p>
            <p className="text-white"><strong>Nome Fantasia:</strong> {data.nome_fantasia}</p>
            <p className="text-white"><strong>Opção pelo Simples:</strong> {data.opcao_pelo_simples}</p>
            <p className="text-white"><strong>Data de Opção pelo Simples:</strong> {data.data_opcao_pelo_simples}</p>
            <p className="text-white"><strong>Data de Exclusão do Simples:</strong> {data.data_exclusao_do_simples}</p>
          </div>
        )}
        {error && (
          <p className="text-white text-center mt-6">
            Erro ao buscar CNPJ: {error}
          </p>
        )}
      </div>
    </div>
  );
}
