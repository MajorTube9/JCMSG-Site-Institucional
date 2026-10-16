# JCMSG Engenharia de Segurança

Site institucional da **JCMSG Engenharia de Segurança**, com informações sobre serviços, apresentação da empresa e canais de contato.

> **Site:** [jcmsg-engenharia.com](https://jcmsg-engenharia.com)

## Sobre o projeto

O site foi desenvolvido com HTML e CSS, sem dependências ou processo de compilação. É responsivo e pode ser publicado em serviços de hospedagem de sites estáticos, como o GitHub Pages e a Netlify.

### Seções

- **Quem Somos** — missão, visão e valores.
- **Serviços** — segurança do trabalho, treinamentos, perícias e laudos.
- **Contato** — telefone, e-mail e formulário de mensagem.

## Arquivos

| Arquivo | Descrição |
| --- | --- |
| `index.html` | Conteúdo e estrutura do site |
| `style.css` | Estilos e layout responsivo |
| `hero.png` | Imagem de destaque da página inicial |

## Visualizar localmente

Não é necessário instalar dependências. Abra o `index.html` no navegador ou use a extensão **Live Server** no Visual Studio Code:

1. Abra a pasta do projeto no VS Code.
2. Clique com o botão direito em `index.html`.
3. Selecione **Open with Live Server**.

## Publicar no GitHub Pages

1. Envie os arquivos do projeto para a raiz de um repositório no GitHub.
2. No repositório, acesse **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione a branch `main` e a pasta `/(root)`, e clique em **Save**.
5. Aguarde a publicação. O GitHub exibirá o endereço do site na própria página de configurações.

## Configurar o formulário

O formulário usa [Formspree](https://formspree.io/) para receber mensagens. Antes de utilizá-lo:

1. Crie um formulário no Formspree e copie o endpoint fornecido.
2. Em `index.html`, substitua `https://formspree.io/f/SEU_ID_AQUI` pelo endpoint real.
3. Publique a alteração e faça um envio de teste.

Sem essa configuração, o formulário não enviará mensagens.

## Personalização

- **Textos, e-mail e telefone:** edite o conteúdo em `index.html`.
- **Logo e cores:** a logo é feita com texto; edite o elemento `.logo` em `index.html` e os valores de cor no início de `style.css`.
- **Imagem de destaque:** substitua `hero.png` mantendo o mesmo nome, ou atualize a referência no CSS.

## Domínio próprio

É possível associar um domínio personalizado pelo serviço de hospedagem. A configuração de DNS varia conforme o provedor; antes de alterar registros, confirme as instruções do serviço e preserve os registros de e-mail (MX, SPF e DKIM).

