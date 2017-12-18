# SocialSecurity API DOC

### URL PADRÃO
```
https://socialsecurity.herokuapp.com/api/
```



## USERS

### Cadastro de usuáiro
``` POST: ``` ```users/ ``` 

``` BODY: ``` 
```console
    {
      "nome_usuario": "string",
      "email_usuario": "string",
      "sennha_usuario": "string",
      "sexo": "string"
    }
```

| Status   | response |
| -------- | ----------- |
| success: | ```status: 'success', data: data, message: 'Inserted one user' ```|    

 
### Listagem de usuáiros
``` GET: ``` ```users/ ```

| Status   | response |
| -------- | ----------- |
| success: | ```status: 'success', data: data, message: 'Retrieved All' users' ```|    


### Listar único usuáiro
``` GET: ``` ```users/ ``` ```id_usuario ```

| Status   | response |
| -------- | ----------- |
| success: | ```status: 'success', data: data, message: 'Retrieved One users' ```|    
| error: | ``` status: 'error', data: {}, message: 'Usuáro não cadastrado'``` |


### Validação de usuáiro
``` GET: ``` ```users/validate/login/ ``` ```users/validate/login/ ```

| Status   | response |
| -------- | ----------- |
| success: | ```status: 'success', data: data, message: 'Usuário cadastrado' ```|    
| error: | ``` status: 'error', data: {}, message: 'Usuáro não cadastrado'``` |



## DEVICES

### Cadastro de device
``` POST: ``` ```device/ ``` 

``` BODY: ``` 
```console
   {
      "cod_device": "string"
   }
```

| Status   | response |
| -------- | ----------- |
| success: | ```status: 'success', data: data, message: 'Inserted device' ```|    


### Validação de device
``` GET: ``` ```device/validate/``` ```id_device ```

| Status   | response |
| -------- | ----------- |
| success: | ```status: 'success', data: data, message: 'Retrieved One users' ```|    
| error: | ``` status: 'error', data: {}, message: 'Usuáro não cadastrado'``` |



## LOGIN


### Efetuar login
``` PUT: ``` ```users/login/ ``` ```id_device ```

``` BODY: ``` 
```console
   {
      "cod_usuario": int
   }
```

| Status   | response |
| -------- | ----------- |
| success: | ```status: 'success', data: data, message: 'logado' ```|    
| error: | ``` status: 'error', data: data, message: 'login não efetuado'``` |
