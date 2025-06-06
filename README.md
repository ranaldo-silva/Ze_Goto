# 🤖 Zé Goto – Sistema Inteligente de Monitoramento de Robôs

**Zé Goto** é um painel de controle inteligente para supervisão de robôs autônomos em ambientes subterrâneos ou industriais. O sistema permite o monitoramento em tempo real, alertas críticos, inspeções, acionamento de equipes, e controle de usuários (operadores, supervisores e administradores).

---

## 🚀 Funcionalidades

- 🗺️ **Mapa Interativo:** Visualização em tempo real da localização dos robôs.
- ⚠️ **Alertas Dinâmicos:** Visualização, edição, escalonamento e resolução de alertas.
- 🧑‍🔧 **Modo Operador:** Operadores podem registrar inspeções e acionar equipes.
- 🔐 **Login Seguro:** Controle de acesso por nível de usuário (Operador, Supervisor, Admin).
- 🧠 **Painel Administrativo:** Cadastro e edição de usuários, alertas, robôs e galerias.
- 🧾 **Histórico de Inspeções:** Cards detalhados com responsáveis, datas e problemas registrados.

---

## 🛠️ Tecnologias Utilizadas

- **Next.js** (React 18)
- **TypeScript**
- **Tailwind CSS**
- **Heroicons**

---

## ⚙️ Instalação e Execução Local

### 1. Clone o repositório

```bash
https://github.com/EquipeFiapProjeto/Ze_Goto.git
cd ze-goto


2. Instale as dependências
bash
Copiar
Editar
npm install
# ou
yarn install



3. Inicie o servidor de desenvolvimento
bash
Copiar
Editar
npm run dev
# ou
yarn dev
Abra http://localhost:3000 no navegador.

🧪 Usuários e Acessos
Usuário de Exemplo
João Operador Email:joao@exemplo.com	Senha:123456
Maria Supervisor	Email:maria@exemplo.com	Senha:123456
Admin		Email:admin@exemplo.com	Senha:admin

_______________________________________________________________________________________________


## 📘 Como Usar o Sistema

### 1. Acessar o sistema

- Abra o sistema em: https://ze-goto.vercel.app/
- Você verá a tela inicial com apresentação do projeto e botão para acessar o dashboard.

---

### 2. Entrar como operador, supervisor ou admin

1. Clique no **ícone de engrenagem ⚙️** no canto superior direito.
2. Faça login com um dos usuários cadastrados (exemplo abaixo):

Email: joao@exemplo.com
Senha: 123456


3. O sistema redireciona para o dashboard com acesso ao mapa e funcionalidades.

---

### 3. Explorar o Dashboard

#### 🗺️ Mapa de Robôs
- Visualize os robôs distribuídos em trajetos.
- Clique em um robô para ver:
  - Nome
  - Localização
  - Status (ativo, inspeção, manutenção, alerta)

---

#### ⚠️ Alertas Recentes
- Visualize alertas em tempo real.
- Clique em **Ver Detalhes** ou **Gerenciar** para ações:
  - Acionar equipe
  - Marcar como resolvido
  - Editar descrição
  - Escalar alerta

---

#### 🧑‍🔧 Inspecionar (somente operadores)
1. Clique no botão **Inspecionar**.
2. Preencha os campos:
   - Nome do robô
   - Local
   - Tipo de problema detectado
   - Acionar equipe (opcional)
3. Clique em **Salvar Inspeção**
4. A inspeção aparecerá na aba de inspeções com:
   - Nome do operador
   - Problema
   - Local
   - Horário
   - Equipe acionada (se marcado)

---

### 4. Acessar o Painel Administrativo (admin)

1. Faça login como **admin**
2. Clique no ícone de engrenagem novamente
3. Agora o painel mostra abas para:

- **Usuários:** cadastrar, editar ou excluir operadores/supervisores
- **Robôs:** registrar novos robôs no mapa
- **Alertas:** adicionar ou editar alertas manualmente
- **Galerias:** cadastrar áreas monitoradas

---

### 5. Encerrar sessão

- Basta fechar a aba ou atualizar para sair do modo operador/supervisor/admin.

---

### 🧠 Dica
- Todos os dados são salvos em **LocalStorage**.
- Ao recarregar a página, as informações persistem (inclusive alertas e inspeções).





💡 Contribuição
Contribuições são bem-vindas! 


🧑‍💻 Autores
Seu Nome – LinkedIn | GitHub


