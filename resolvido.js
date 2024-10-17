import crypto from 'crypto';

// Gerar chave de 256 bits (32 bytes) - AES-256
const chave = crypto.randomBytes(32); 

// Função para criptografar usando AES-GCM
function criptografar(texto) {
  const iv = crypto.randomBytes(12); // IV de 96 bits (12 bytes) é recomendado para AES-GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', chave, iv);

  const encrypted = Buffer.concat([cipher.update(texto, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag(); // Obter o valor de autenticação

  return {
    conteudo: encrypted.toString('hex'),
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex'),
  };
}

// Função para descriptografar usando AES-GCM
function descriptografar(encrypted) {
  const { conteudo, iv, authTag } = encrypted;

  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    chave,
    Buffer.from(iv, 'hex')
  );

  decipher.setAuthTag(Buffer.from(authTag, 'hex'));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(conteudo, 'hex')),
    decipher.final(),
  ]);

  return decrypted.toString('utf8');
}

// Testar criptografia e descriptografia
const textoOriginal = 'Texto sensível a ser criptografado';
console.log('Texto Original:', textoOriginal);

// Criptografar o texto
const encrypted = criptografar(textoOriginal);
console.log('Texto Criptografado:', encrypted);

// Descriptografar o texto
const decrypted = descriptografar(encrypted);
console.log('Texto Descriptografado:', decrypted);
