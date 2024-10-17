import chalk from 'chalk';
import crypto from 'crypto';

// Chave de criptografia fraca (128 bits)
const chave = crypto.randomBytes(16); // 16 bytes = 128 bits

// Função que criptografa texto usando AES no modo ECB
function criptografarECB(texto) {
  const cipher = crypto.createCipheriv('aes-128-ecb', chave, null);
  let encrypted = cipher.update(texto, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Função que divide texto criptografado em blocos visuais
function exibirBlocosCriptografados(texto) {
  console.log(chalk.yellow('Texto Original:'), chalk.green(texto));
  const encrypted = criptografarECB(texto);

  console.log(chalk.yellow('\nTexto Criptografado (Modo ECB):'));
  const blocos = encrypted.match(/.{1,32}/g);

  blocos.forEach((bloco, index) => {
    const cor = index % 2 === 0 ? chalk.blue : chalk.red;
    console.log(cor(`Bloco ${index + 1}: ${bloco}`));
  });
}

// Simular falha com textos contendo padrões repetidos
const texto1 = 'AAAABBBBCCCCDDDDAAAABBBBCCCCDDDD';
const texto2 = 'AAAABBBBCCCCDDDD';

console.log(chalk.bold('*** Demonstração de Criptografia Insegura (ECB) ***\n'));

exibirBlocosCriptografados(texto1);
console.log(chalk.cyan('\n------------------------------------\n'));
exibirBlocosCriptografados(texto2);
