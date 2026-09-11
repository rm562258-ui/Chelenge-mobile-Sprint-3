import api from '../api/client';

export async function getAddressByCep(rawCep) {
  const cep = String(rawCep).replace(/\D/g, '');
  if (!cep || cep.length !== 8) throw new Error('CEP inválido');

  const url = `https://viacep.com.br/ws/${cep}/json/`;
  try {
    const res = await api.get(url);
    const data = res.data;
    if (data.erro) throw new Error('CEP não encontrado');

    return {
      rua: data.logradouro || '',
      bairro: data.bairro || '',
      cidade: data.localidade || '',
      estado: data.uf || '',
    };
  } catch (err) {
    throw err;
  }
}

export default { getAddressByCep };
