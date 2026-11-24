# Cidadão Presente

Site informativo sobre direitos, deveres e participação cidadã para jovens angolanos. Construído em HTML, CSS e JavaScript, sem dependências ou processo de compilação.

## Executar localmente

Abra `index.html` num navegador. Para uma experiência mais próxima de um servidor web, use a extensão Live Server no Visual Studio Code e abra a pasta do projeto.

## Publicar com GitHub Pages

1. Crie um repositório no GitHub e envie os ficheiros deste projeto.
2. No repositório, abra **Settings → Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Escolha a branch `main` e a pasta `/ (root)`, e guarde.

O site é servido diretamente a partir de `index.html`; não é necessário configurar um comando de build.

## Estrutura

```text
.
├── assets/                 # Logótipos e favicon usados pelo site
├── css/
│   └── styles.css          # Estilos e regras responsivas
├── docs/
│   └── referencias/        # Capturas de ecrã e instruções de consulta
│       ├── imagens/
│       └── pdf-instructions.txt
├── js/
│   └── app.js              # Conteúdo, navegação e interações
├── constituicao.pdf        # Documento de referência, não usado em produção
├── index.html              # Entrada do site e estrutura comum
├── README.md
└── .gitignore
```

Algumas informações no site estão assinaladas como **[A CONFIRMAR]** e devem ser verificadas antes de serem apresentadas como dados oficiais.
