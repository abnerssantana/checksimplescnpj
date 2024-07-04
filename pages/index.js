import { useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleUpdate = async () => {
        setLoading(true);
        setMessage('');
        try {
            const response = await axios.post('/api/update-cnpj');
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Erro ao atualizar dados.');
        }
        setLoading(false);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Atualizar CNPJs</h1>
            <button onClick={handleUpdate} disabled={loading}>
                {loading ? 'Atualizando...' : 'Atualizar CNPJs'}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
}
