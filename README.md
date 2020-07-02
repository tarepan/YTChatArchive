## TempTS - Template project for TypeScript

| functionality     | adpoted                                                              |
| :---------------- | :------------------------------------------------------------------- |
| language          | [TypeScript](https://www.typescriptlang.org/)                        |
| execution env     | [Node.js](https://nodejs.org/)                                       |
| testing framework | [Jest](https://jestjs.io/)                                           |
| linter            | [ESLint](https://eslint.org/)                                        |
| formatter         | [Prettier](https://prettier.io/)                                     |
| editor            | [Visual Studio Code](https://code.visualstudio.com/)                 |
| development env   | [DevContainer](https://code.visualstudio.com/docs/remote/containers) |
| production env    | [Docker Container](https://www.docker.com/)                          |

### How to Use

#### Dev

1. (On GitHub) Make new repository with TempTS template
2. (On VS Code) Command `Remote-Containers: Open Repository in Container` with newly-made repository
3. (On VS Code terminal) `npx ncu` for package.json update (and update deps if needed)

That's all!! Thanks container ecosystem!!

#### Prod

1. (On VS Code terminal) Command `docker build -t <containerName> .` & `docker run <containerName>`

That's all!! Tahnks container ecosystem!!
