# Onboarding

## Informações gerais

## Dependências

- [nvm](https://github.com/nvm-sh/nvm)
- [Node v18+](https://nodejs.org/en)
- [Yarn](https://yarnpkg.com/)

## Instalação das dependências
Execute o comando abaixo para utilizar a versão do node determinada no arquivo `.nvmrc`

```shell
nvm use
```

_Para executar esse comando é necessário ter o nvm instalado globalmente._

Se esse for o primeiro projeto com dependências privadas que você esteja executando, para conseguir instala-las,
gere no Gitlab um `AcessToken` e adicione na raíz do seu usuário um arquivo chamado .npmrc com o seguinte conteúdo:

```shel
@sanardigital:registry=https://gitlab.com/api/v4/packages/npm/
//gitlab.com/api/v4/packages/npm/:_authToken=<TOKEN>
//gitlab.com/api/v4/projects/:_authToken=<TOKEN>
//registry.npmjs.org/:_authToken=<TOKEN>
```

no qual `<TOKEN>` é o token que você gerou. Se você já tem esse arquivo configurado, ignore esse passo.

Após configurar a versão do node e o token, execute o comando abaixo para instalar os pacotes do projeto:

```shell
yarn install
```

_Para executar esse comando é necessário ter o yarn instalado globalmente._

## Padronização e estilo de código

- O projeto está configurado com eslint + prettier para estilização e padronização do código. Para formatar o código manualmente basta executar:

```shell
yarn format
```

- O projeto utiliza _hooks_ do [husky](https://github.com/typicode/husky) como:

- pre-commit: executa _lint_ e _prettier_ nos arquivos modificados.
- pre-push: executa _lint_ e testes unitários em todo código.
- commit-msg: valida a descrição do commit.

Para facilitar a criação de mensagens de commit você pode usar o commando:

```bash
yarn commit
```

E seguir as instruções na tela para preencher a mensagem de commit.

_Para que o husky seja habilitado é necessário executar o comando `yarn prepare` antes de fazer o primeiro commit_

## Scripts disponíveis

```bash
yarn start:dev
```

Executa a aplicação em modo de desenvolvimento e abre automáticamente o navegador no [http://localhost:3000](http://localhost:3000).

```bash
yarn test
```

Executa os testes unitários.

```bash
yarn build
```

Builda o app na pasta `dist`.

## Padrões de nomenclatura

O projeto utiliza alguns hooks do [husky](https://github.com/typicode/husky) como:

- pre-commit: executa lint e prettier em todo o código.
- pre-push: executa os testes unitários.
- commit-msg: valida a descrição do commit.

Para facilitar a criação de mensagens de commit você pode usar o script abaixo, que utiliza o [commitizen](https://github.com/commitizen/cz-cli), ou instalar o cz globalmente em sua máquina.

```shell
# branch
feat/DEVPM-XXX

# commit
feat(DEVPM-XXX): description

# utilizar o commitzen
> yarn commit
```

## Saber mais

- [React documentation](https://reactjs.org/)

- [Testing Library documentation](https://testing-library.com/)

- [Padronização de commit com (Commitlint, Husky e Commitizen)](https://dev.to/vitordevsp/padronizacao-de-commit-com-commitlint-husky-e-commitizen-3g1n)
