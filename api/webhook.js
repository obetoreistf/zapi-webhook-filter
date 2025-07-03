export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const data = req.body;

  // Pode logar pra testar se está vindo algo
  console.log('Recebido:', JSON.stringify(data, null, 2));

  const chatId = data?.chatId || '';
  const isGroup = chatId.includes('@g.us');

  if (isGroup) {
    return res.status(200).json({ status: 'ignorado (mensagem de grupo)' });
  }

  // Substitua aqui pela URL do seu webhook do n8n:
  await fetch('https://unfairgroup.app.n8n.cloud/webhook/funil-brainclub', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  res.status(200).json({ status: 'encaminhado para o n8n' });
}
