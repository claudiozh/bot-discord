# Bot discord
Aplicação desenvolvida em nodejs com o intuito de enviar mensagens usando o bot do discord.

## Requisitos

* Nodejs na versão 16. 
* Para não ter que instalar está versão na máquina host, criei um arquivo Dockerfile contendo a versão a ser usada. 
* Para rodar o projeto da forma correta execute os dois arquivo abaixo;


```
./build.sh
```

```
./start.sh
```

* Feito isso você terá uma imagem docker baseada no nodejs versão 16 e entrará diretamente no diretório de desenvovimento da aplicação.


## Como rodar aplicação

```
npm install
```




* Configurar arquivo .env com os dados requiridos para realizar comunicação com o bot do discord já cadastrado. Tem um exemplo de variavéis no arquivo .env.example
* Em seguida execute o seguinte comando;

```
npm run start:dev
```