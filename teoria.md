# Tipos de teste

* Unitário:
    * Testa um componente/funcionalidade de forma **isolada**.
    * Não utiliza banco de dados e nem nenhuma integração externa (APIs, AWS etc).
* Integração
    * Testa como um ou mais componentes/funcionalidades se comportam juntos(as).
    * Pode utilizar alguma conexão externa (banco, api...), mas nem sempre é necessário.
* end to end (E2E)
    * Simula o que um usuário vai fazer na nossa aplicação diariamente.
    * Utiliza banco e qualquer integração/conexão externa

**Exemplo:**

Digamos que você tem um e-commerce com o seguinte fluxo de realizar compra:

1. Cadastra o usuário no banco
2. Cadastra um endereço no banco
3. Se comunica com **gateway de pagamento** pra enviar a transação
4. Cadastra a compra no banco

## Como ficam os testes:
- O teste **unitário**: não tem banco de dados e nem API do Gateway (É aconselhável ter mocks ou dados fakes)
- O teste E2E: precisa ter banco de dados e API do Gateway, nem que seja um banco de teste e uma conta de teste da API (geralmente APIs externas fornecem uma conta para realizar testes)

mais detalhes abaixo:

## **Testes Unitários**
Testamos funções isoladas, sem dependências externas, usando **mocks** para interações externas.

### **O que testar?**
- Validação de dados do usuário.
- Validação de dados do endereço.
- Geração da transação antes do envio para o gateway.

### **Exemplo de Código**
```javascript
const { validarUsuario } = require('../services/userService');
const { validarEndereco } = require('../services/addressService');
const { criarTransacao } = require('../services/paymentService');

test('Deve validar corretamente um usuário', () => {
    const usuario = { nome: "João", email: "joao@email.com" };
    expect(validarUsuario(usuario)).toBe(true);
});

test('Deve falhar ao validar usuário sem email', () => {
    const usuario = { nome: "João" };
    expect(() => validarUsuario(usuario)).toThrow("Email inválido");
});

test('Deve validar corretamente um endereço', () => {
    const endereco = { rua: "Rua A", cidade: "SP", cep: "12345-678" };
    expect(validarEndereco(endereco)).toBe(true);
});

test('Deve criar transação corretamente', () => {
    const compra = { total: 100, moeda: "BRL" };
    const transacao = criarTransacao(compra);
    expect(transacao).toHaveProperty('id');
    expect(transacao.status).toBe('pendente');
});
```

---

## **Testes de Integração**
Testamos a interação entre **módulos internos do sistema**, usando **banco de dados real ou mockado**.

### **O que testar?**
- Cadastro do usuário e recuperação do banco.
- Cadastro do endereço e vinculação ao usuário.
- Cadastro da compra após a resposta do pagamento.

### **Exemplo de Código**
```javascript
const request = require('supertest');
const app = require('../app');
const db = require('../database');

beforeAll(async () => {
    await db.migrate.latest();
});

afterAll(async () => {
    await db.destroy();
});

test('Deve cadastrar um usuário no banco', async () => {
    const res = await request(app)
        .post('/usuarios')
        .send({ nome: "João", email: "joao@email.com" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
});

test('Deve cadastrar um endereço e vincular ao usuário', async () => {
    const usuario = await request(app).post('/usuarios').send({ nome: "Maria", email: "maria@email.com" });
    
    const res = await request(app)
        .post('/enderecos')
        .send({ usuarioId: usuario.body.id, rua: "Rua B", cidade: "RJ", cep: "54321-876" });

    expect(res.status).toBe(201);
    expect(res.body.usuarioId).toBe(usuario.body.id);
});
```

---

## **Testes E2E (End-to-End)**
Testamos o **fluxo completo** com banco de dados real e chamadas externas (gateway de pagamento **mockado**).

### **O que testar?**
- Criar um usuário, endereço, enviar para o gateway e salvar a compra.
- Fluxo de erro (ex: pagamento recusado).

### **Exemplo de Código**
```javascript
const request = require('supertest');
const app = require('../app');
const nock = require('nock');

beforeAll(async () => {
    await db.migrate.latest();
});

afterAll(async () => {
    await db.destroy();
});

test('Deve realizar uma compra completa com sucesso', async () => {
    // Mock do gateway de pagamento
    nock('https://fake-gateway.com')
        .post('/pagamento')
        .reply(200, { status: 'aprovado', transacaoId: '12345' });

    // Criar usuário
    const usuario = await request(app)
        .post('/usuarios')
        .send({ nome: "Lucas", email: "lucas@email.com" });

    // Criar endereço
    const endereco = await request(app)
        .post('/enderecos')
        .send({ usuarioId: usuario.body.id, rua: "Rua C", cidade: "SP", cep: "00000-111" });

    // Realizar compra
    const compra = await request(app)
        .post('/compras')
        .send({ usuarioId: usuario.body.id, total: 200 });

    expect(compra.status).toBe(201);
    expect(compra.body.status).toBe('aprovado');
});

test('Deve falhar ao realizar compra quando pagamento for recusado', async () => {
    // Mock do gateway de pagamento
    nock('https://fake-gateway.com')
        .post('/pagamento')
        .reply(400, { status: 'recusado' });

    // Criar usuário
    const usuario = await request(app)
        .post('/usuarios')
        .send({ nome: "Carlos", email: "carlos@email.com" });

    // Tentar realizar compra
    const compra = await request(app)
        .post('/compras')
        .send({ usuarioId: usuario.body.id, total: 300 });

    expect(compra.status).toBe(400);
    expect(compra.body.status).toBe('recusado');
});
```

---

## **Resumo**
| Tipo de Teste  | O que Testa? | Ferramentas Usadas |
|---------------|-------------|------------------|
| **Unitário** | Funções isoladas (validação, criação de transação) | Jest (mocks) |
| **Integração** | Comunicação entre módulos (banco de dados, API interna) | Jest, Supertest, SQLite |
| **E2E** | Fluxo completo do sistema | Jest, Supertest, Nock |

---

Isso cobre praticamente todos os cenários para um fluxo de compra em um e-commerce! 🚀