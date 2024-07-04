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
      setData(result);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2">
      <h1 className="text-4xl font-bold mb-4">Buscar CNPJ</h1>
      <input
        type="text"
        value={cnpj}
        onChange={(e) => setCnpj(e.target.value)}
        placeholder="Digite o CNPJ"
        className="px-4 py-2 border border-gray-300 rounded-md mb-4"
      />
      <button
        onClick={fetchCNPJ}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        disabled={loading}
      >
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {data && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Resultados:</h2>
          <pre className="bg-gray-100 p-4 rounded-md mt-4">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
