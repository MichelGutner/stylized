## Jaiminho Notifications
O ***Jaiminho Notifications*** é uma abstração para a implementação de canais de comunicação por mensagens, projetada para facilitar a integração de notificações em aplicações web e mobile.

<div align="center">
    <img src="./assets/avatar.jpeg" alt="Texto alternativo" style="width:400px; height:auto;" />
</div>

#### Para desenvolvedores

##### Pré-requisitos
Antes de começar, certifique-se de ter as seguintes dependências instaladas:
- [nvm](https://github.com/nvm-sh/nvm)
- [Node v18+](https://nodejs.org/en)
- [Yarn](https://yarnpkg.com/)

##### Configuração do Ambiente
Definindo a Versão do Node.js. O projeto utiliza uma versão específica do Node.js, definida no arquivo .nvmrc. Para configurar a versão correta, execute o comando abaixo:

```shell
nvm use 20
```
**Observação**: Esse comando requer que o nvm esteja instalado globalmente no seu sistema.

##### **Configuração do Token de Acesso ao GitLab**
Se este for o primeiro projeto com dependências privadas que você está utilizando, será necessário configurar um token de acesso ao GitLab para instalar os pacotes privados. Siga os passos abaixo:

- Gere um Access Token no GitLab.
- Execute o seguinte comando na raiz do projeto para configurar o arquivo .npmrc:

```shel
echo "@sanardigital:registry=https://gitlab.com/api/v4/packages/npm/
//gitlab.com/api/v4/packages/npm/:_authToken=${GITLAB_TOKEN}
//gitlab.com/api/v4/projects/:_authToken=${GITLAB_TOKEN}
" >> .npmrc
```
Substitua ${`GITLAB_TOKEN`} pelo token que você gerou. Se o arquivo .npmrc já estiver configurado, você pode pular essa etapa.

##### Instalação das Dependências
Após configurar a versão do Node.js e o token de acesso, instale as dependências do projeto utilizando um dos comandos abaixo:

```shell
yarn install
```
```shell
npm install
```

### Implementação da Biblioteca

#### [Web](https://www.notion.so/Tutorial-Implementa-o-da-biblioteca-de-notifica-es-web-1bab3b75c7e1809c985cc76d07bfc60e)

#### [Mobile](https://www.notion.so/Tutorial-Implementa-o-da-biblioteca-de-notifica-es-mobile-1bab3b75c7e18016ad9bcc1a3a9f1e9d)