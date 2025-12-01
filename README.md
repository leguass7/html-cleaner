# HTML Cleaner

Biblioteca de utilitários para processamento e limpeza de HTML, com foco em remover atributos de tags HTML mantendo apenas a estrutura semântica.

## 📋 Descrição

Este projeto fornece ferramentas para:

- **Limpeza de HTML**: Remove todos os atributos das tags HTML, mantendo apenas a estrutura e o conteúdo
- **Manipulação de strings**: Funções utilitárias para processamento de texto (slugify, normalização, etc.)
- **Manipulação de arquivos**: Leitura, escrita e processamento de arquivos
- **Validação e conversão**: Utilitários para validação de dados e conversão de tipos

## 🚀 Instalação

```bash
npm install
```

## 📦 Dependências

- **cheerio**: Para parsing e manipulação de HTML
- **TypeScript**: Para tipagem estática
- **ESLint & Prettier**: Para qualidade de código

## 🛠️ Uso

### Limpeza de HTML (Função Principal)

A função principal do projeto remove todos os atributos das tags HTML:

```typescript
import { removeAttributesAndKeepTags } from "./src/helpers/string";
import { readAnyFile } from "./src/helpers/files";
import { writeFile } from "node:fs/promises";

// Ler arquivo HTML
const html = await readAnyFile("input.html");

// Remover atributos mantendo apenas as tags
const cleanedHtml = removeAttributesAndKeepTags(html);

// Salvar resultado
await writeFile("output.html", cleanedHtml);
```

**Exemplo de transformação:**

**Antes:**

```html
<div class="container" id="main" data-test="value">
  <p style="color: red;" class="text">Conteúdo</p>
  <a href="/link" target="_blank">Link</a>
</div>
```

**Depois:**

```html
<div>
  <p>Conteúdo</p>
  <a>Link</a>
</div>
```

### Script Principal

O arquivo `src/index.ts` processa automaticamente arquivos da pasta `volumes/tmp/`:

1. Lê o arquivo `volumes/tmp/in.txt`
2. Remove atributos do HTML
3. Salva o resultado em `volumes/tmp/out.html`

Para executar:

```bash
# Compilar TypeScript
npm run build

# Executar o script compilado
node dist/index.js
```

Ou usando ts-node:

```bash
yarn ts-node-dev -r tsconfig-paths/register --transpile-only src/index.ts
```

## 📚 Utilitários Disponíveis

### Manipulação de Strings

```typescript
import {
  slugify,
  replaceAll,
  onlyNumber,
  trimHtml,
  removeHtmlTags,
  capitalize,
  justText,
} from "./src/helpers/string";

// Criar slug de URL
slugify("Olá Mundo!"); // "ola-mundo"

// Remover HTML mantendo apenas texto
trimHtml("<p>Texto</p>"); // "Texto"

// Remover códigos ANSI
justText("\u001b[31mTexto colorido\u001b[0m"); // "Texto colorido"

// Capitalizar primeira letra
capitalize("hello"); // "Hello"
```

### Manipulação de Arquivos

```typescript
import {
  readAnyFile,
  fileExists,
  fileHash,
  deleteFile,
} from "./src/helpers/files";

// Ler arquivo (suporta múltiplos encodings)
const content = await readAnyFile("arquivo.txt");

// Verificar se arquivo existe
if (fileExists("arquivo.txt")) {
  // ...
}

// Calcular hash do arquivo
const hash = await fileHash("arquivo.txt", "md5");

// Deletar arquivo
deleteFile("arquivo.txt");
```

### Validação

```typescript
import {
  isObject,
  isDefined,
  isObjectEmpty,
} from "./src/helpers/validation";

isObject({}); // true
isDefined(null); // false
isObjectEmpty({}); // true
```

### Conversão de Variáveis

```typescript
import {
  toBool,
  binToDec,
  intToHex,
  hexTobin,
} from "./src/helpers/variables";

toBool("true"); // true
binToDec("1010"); // 10
intToHex(255); // "FF"
hexTobin("FF", 8); // "11111111"
```

### Arrays

```typescript
import {
  makeArray,
  chunkArray,
  sumArray,
  noDuplicateItems,
} from "./src/helpers/array";

makeArray("texto"); // ["texto"]
chunkArray([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
sumArray([1, 2, 3]); // 6
noDuplicateItems([1, 2, 2, 3]); // [1, 2, 3]
```

## 🧪 Scripts Disponíveis

```bash
# Compilar TypeScript
npm run build

# Verificar tipos sem compilar
npm run type-check

# Executar linter
npm run lint

# Corrigir problemas do linter automaticamente
npm run lint:fix

# Formatar código com Prettier
npm run format

# Verificar formatação
npm run format:check
```

## 📁 Estrutura do Projeto

```text
.
├── src/
│   ├── config/          # Configurações do projeto
│   ├── helpers/          # Funções utilitárias
│   │   ├── array.ts     # Manipulação de arrays
│   │   ├── files.ts     # Manipulação de arquivos
│   │   ├── string.ts    # Manipulação de strings e HTML
│   │   ├── validation.ts # Validações
│   │   └── variables.ts # Conversão de variáveis
│   └── index.ts         # Script principal
├── volumes/
│   └── tmp/             # Arquivos temporários (in.txt, out.html)
├── tsconfig.json        # Configuração TypeScript
├── eslint.config.js     # Configuração ESLint
└── .prettierrc.json     # Configuração Prettier
```

## ⚙️ Configuração

### Variáveis de Ambiente

O projeto usa `dotenv` para configuração. Crie um arquivo `.env` na raiz:

```env
NODE_ENV=development
```

### Diretórios

Por padrão, os arquivos de entrada e saída estão em:

- **Entrada**: `volumes/tmp/in.txt`
- **Saída**: `volumes/tmp/out.html`

Você pode modificar isso editando `src/index.ts` ou `src/config/index.ts`.

## 📝 Exemplo Completo

```typescript
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathVolume } from "./src/config";
import { readAnyFile } from "./src/helpers/files";
import { removeAttributesAndKeepTags } from "./src/helpers/string";

const pathIn = resolve(pathVolume, "tmp", "in.txt");
const pathOut = resolve(pathVolume, "tmp", "out.html");

readAnyFile(pathIn).then((html) => {
  if (html) {
    // Remove todos os atributos das tags HTML
    const cleanedHtml = removeAttributesAndKeepTags(html);
    
    // Salva o resultado
    writeFile(pathOut, cleanedHtml);
  }
});
```

## 🔧 Desenvolvimento

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação de Dependências

```bash
npm install
```

### Compilação

```bash
npm run build
```

O código compilado será gerado na pasta `dist/`.

## 📄 Licença

ISC

## 👤 Autor

[Leandro Sbrissa](https://github.com/leguass7)

---

**Nota**: Este projeto foi desenvolvido para processar e limpar HTML, removendo atributos desnecessários enquanto mantém a estrutura semântica do documento.
