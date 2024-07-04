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
    <div className="min-h-screen flex flex-col items-center justify-center py-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Buscar CNPJ</h1>
      <input
        type="text"
        value={cnpj}
        onChange={(e) => setCnpj(e.target.value)}
        placeholder="Digite o CNPJ"
        className="px-4 py-2 border border-gray-300 rounded-md mb-4 w-80"
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
        <div className="mt-8 w-4/5 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Resultados:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-100 rounded-md">
              <h3 className="font-bold">Informações da Empresa</h3>
              <p><strong>Razão Social:</strong> {data.razao_social}</p>
              <p><strong>Nome Fantasia:</strong> {data.nome_fantasia}</p>
              <p><strong>CNPJ:</strong> {data.cnpj}</p>
              <p><strong>UF:</strong> {data.uf}</p>
              <p><strong>Município:</strong> {data.municipio}</p>
              <p><strong>Bairro:</strong> {data.bairro}</p>
              <p><strong>Logradouro:</strong> {data.logradouro}</p>
              <p><strong>Número:</strong> {data.numero}</p>
              <p><strong>CEP:</strong> {data.cep}</p>
              <p><strong>Complemento:</strong> {data.complemento}</p>
              <p><strong>Situação Cadastral:</strong> {data.descricao_situacao_cadastral}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-md">
              <h3 className="font-bold">Atividades Econômicas</h3>
              <p><strong>CNAE Principal:</strong> {data.cnae_fiscal} - {data.cnae_fiscal_descricao}</p>
              {data.cnaes_secundarios && data.cnaes_secundarios.length > 0 && (
                <div>
                  <h4 className="font-bold mt-2">CNAEs Secundários:</h4>
                  <ul className="list-disc list-inside">
                    {data.cnaes_secundarios.map((cnae, index) => (
                      <li key={index}>{cnae.codigo} - {cnae.descricao}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="p-4 bg-gray-100 rounded-md">
              <h3 className="font-bold">Quadro Societário</h3>
              {data.qsa && data.qsa.length > 0 ? (
                <ul className="list-disc list-inside">
                  {data.qsa.map((socio, index) => (
                    <li key={index}>
                      <p><strong>Nome:</strong> {socio.nome_socio}</p>
                      <p><strong>Qualificação:</strong> {socio.qualificacao_socio}</p>
                      <p><strong>Faixa Etária:</strong> {socio.faixa_etaria}</p>
                      <p><strong>Data de Entrada:</strong> {socio.data_entrada_sociedade}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Sem informações de sócios.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
