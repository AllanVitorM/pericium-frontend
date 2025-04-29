# Pericium

**Pericium** é uma plataforma web moderna para gestão de **perícias odontolegais**, criada para facilitar o registro, análise, geração de laudos e gestão de casos forenses de forma rápida e segura.

Este projeto foi desenvolvido utilizando **Next.js 14** com suporte a **TypeScript**, aplicando boas práticas de organização de código, autenticação, controle de contexto e dashboard personalizado.

## 🚀 Tecnologias utilizadas

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Context API](https://react.dev/learn/scaling-up-with-reducer-and-context)
- [PostCSS](https://postcss.org/)
- [ESLint](https://eslint.org/)
- [Vercel Hosting](https://vercel.com/)

## 📦 Scripts disponíveis

No diretório do projeto, você pode rodar:

### `npm run dev`
Inicia o servidor de desenvolvimento.  
Abra [http://localhost:3000](http://localhost:3000) para visualizar no navegador.

### `npm run build`
Cria a aplicação para produção na pasta `.next/`.

### `npm run start`
Inicia o servidor de produção.

### `npm run lint`
Roda o ESLint para análise de código.

## 🔒 Autenticação

O Pericium conta com um sistema de autenticação protegido por Guards, garantindo que apenas usuários autorizados acessem funcionalidades sensíveis como geração de laudos e assinaturas digitais.

## 📋 Funcionalidades principais

- Cadastro de casos odontolegais
- Anexação de evidências
- Geração de laudos periciais com assinatura
- Dashboard para visualização e gestão de processos
- Controle de acesso e autenticação de usuários

## 🛠️ Configurações e dependências

O projeto inclui:

- `eslint.config.mjs`: Configurações de linting
- `next.config.ts`: Configurações customizadas do Next.js
- `postcss.config.mjs`: Configurações de PostCSS
- `tsconfig.json`: Configuração do TypeScript
- `.gitignore`: Padrões para ignorar arquivos no Git

## 👨‍💻 Como contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push na sua branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request


## 📁 Estrutura de Pastas

```plaintext
/public
  ├── file.svg
  ├── globe.svg
  ├── next.svg
  ├── vercel.svg
  ├── window.svg

/src
  ├── app/        # Páginas e rotas do projeto
  ├── assets/     # Arquivos de mídia e ícones
  ├── components/ # Componentes reutilizáveis
  ├── context/    # Contextos globais (auth, etc.)
  ├── service/    # Serviços e integrações (assinatura de laudos, etc.)


