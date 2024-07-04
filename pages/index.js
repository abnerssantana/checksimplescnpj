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
    <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
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
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Consulta de CNPJ</h2>
            <div className="mt-6 flex max-w-md gap-x-4">
              <input
                type="text"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                placeholder="Digite o CNPJ"
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
              <button
                onClick={fetchCNPJ}
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                disabled={loading}
              >
                {loading ? 'Buscando...' : 'Buscar'}
              </button>
            </div>
          </div>
          {data && (
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <p className="text-white"><strong>Razão Social:</strong> {data.razao_social}</p>
                  <p className="text-white"><strong>Nome Fantasia:</strong> {data.nome_fantasia}</p>
                  <p className="text-white"><strong>CNPJ:</strong> {data.cnpj}</p>
                  <p className="text-white"><strong>UF:</strong> {data.uf}</p>
                  <p className="text-white"><strong>Município:</strong> {data.municipio}</p>
                  <p className="text-white"><strong>Bairro:</strong> {data.bairro}</p>
                  <p className="text-white"><strong>Logradouro:</strong> {data.logradouro}</p>
                  <p className="text-white"><strong>Número:</strong> {data.numero}</p>
                  <p className="text-white"><strong>CEP:</strong> {data.cep}</p>
                  <p className="text-white"><strong>Complemento:</strong> {data.complemento}</p>
                  <p className="text-white"><strong>Situação Cadastral:</strong> {data.descricao_situacao_cadastral}</p>
                </div>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <h3 className="text-white text-lg font-semibold mb-2">Atividades Econômicas</h3>
                  <p className="text-white"><strong>CNAE Principal:</strong> {data.cnae_fiscal} - {data.cnae_fiscal_descricao}</p>
                  {data.cnaes_secundarios && data.cnaes_secundarios.length > 0 && (
                    <div>
                      <h4 className="text-white text-lg font-semibold mt-2">CNAEs Secundários:</h4>
                      <ul className="list-disc list-inside">
                        {data.cnaes_secundarios.map((cnae, index) => (
                          <li key={index} className="text-white">{cnae.codigo} - {cnae.descricao}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-start mt-6">
                  <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                    <h3 className="text-white text-lg font-semibold mb-2">Quadro Societário</h3>
                    {data.qsa && data.qsa.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {data.qsa.map((socio, index) => (
                          <li key={index} className="text-white">
                            <p><strong>Nome:</strong> {socio.nome_socio}</p>
                            <p><strong>Qualificação:</strong> {socio.qualificacao_socio}</p>
                            <p><strong>Faixa Etária:</strong> {socio.faixa_etaria}</p>
                            <p><strong>Data de Entrada:</strong> {socio.data_entrada_sociedade}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-white">Sem informações de sócios.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {error && (
            <p className="text-white text-center mt-6">
              Erro ao buscar CNPJ: {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
