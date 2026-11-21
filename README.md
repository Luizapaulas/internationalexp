# Jinas International Experience

Site institucional da Jinas International Experience: destinos (Chile, Inglaterra e Malta), valores e parcelamento, diferenciais, endereço e formulário de interesse que abre a conversa no WhatsApp.

## Estrutura

- `index.html` — página única, com todas as seções e o CSS.
- `data.js` — conteúdo dos destinos, perguntas frequentes, diferenciais e legendas das fotos.
- `app.js` — roteamento por hash (`#chile`, `#inglaterra`, `#malta`), tabelas de parcelamento e envio do formulário.
- `img/` — fotos, mapas e logos.

## Como publicar

É um site estático, sem build. Basta servir a pasta. No GitHub Pages: Settings → Pages → Deploy from a branch → `main` / `root`.

## Como editar

Preços e condições ficam em `data.js`, no objeto de cada destino. As parcelas são calculadas em `app.js` a partir do mês da inscrição e do mês da última parcela.
