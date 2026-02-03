# Plano de Atualização - Segurança e Performance

**Data**: Fevereiro 2026
**Site**: Salão Loha (salaoloha.com.br)
**Última atualização do código**: ~2024
**Análise realizada em**: https://www.salaoloha.com.br/

---

## Resumo Executivo

O site utiliza bibliotecas com 2 anos de idade. Foram identificadas vulnerabilidades de segurança críticas que precisam de correção imediata, especialmente no Lottie-web que possui falhas de XSS conhecidas.

---

## Resultado do Lighthouse (Fev 2026)

### Scores Gerais

| Categoria | Score | Status |
|-----------|-------|--------|
| **Performance** | 53% | Precisa melhorar |
| **SEO** | 100% | Excelente |
| **Acessibilidade** | 85% | Bom |
| **Best Practices** | 100% | Excelente |

### Core Web Vitals

| Métrica | Valor Atual | Meta | Status |
|---------|-------------|------|--------|
| **LCP** (Largest Contentful Paint) | 7.86s | < 2.5s | Ruim |
| **FCP** (First Contentful Paint) | 5.38s | < 1.8s | Ruim |
| **Speed Index** | 7.82s | < 3.4s | Ruim |
| **Time to Interactive** | 7.95s | < 3.8s | Ruim |
| **Total Blocking Time** | 81ms | < 200ms | Bom |

### Problemas Identificados (Ordenados por Impacto)

| Problema | Score | Impacto |
|----------|-------|---------|
| Third-party code blocking | 0% | 270ms bloqueio |
| Serve images in WebP/AVIF | 0% | ~1MB economia |
| Properly size images | 0% | 95% desperdício |
| Color contrast | 0% | Acessibilidade |
| iframe sem title | 0% | Acessibilidade |
| Heading order | 0% | SEO/Acessibilidade |
| Links sem nome | 0% | Acessibilidade |
| Unused JavaScript | 0% | Performance |
| Images sem width/height | 50% | Layout shift |
| Cache policy | 50% | Performance |

### Imagens Mais Problemáticas

| Arquivo | Tamanho | Desperdício | Economia com WebP |
|---------|---------|-------------|-------------------|
| work8.jpg | 1.01 MB | 95% | 305 KB |
| work1.jpg | 319 KB | 89% | 91 KB |
| work4.jpg | 312 KB | 89% | 85 KB |
| work3.jpg | 285 KB | 89% | 90 KB |
| about.jpg | 199 KB | 88% | - |

### Third-Party Impact (Bloqueio de Main Thread)

| Serviço | Tamanho | Tempo Bloqueio |
|---------|---------|----------------|
| **Lottie-web** | 55 KB | **250ms** |
| LordIcon | 84 KB | 14ms |
| FancyBox | 31 KB | 3ms |
| Bootstrap | 25 KB | 3ms |
| Google Maps | 330 KB | 0ms (iframe) |
| Google Fonts | 40 KB | 0ms |

---

## Headers de Segurança

### Headers Presentes

| Header | Valor | Status |
|--------|-------|--------|
| `strict-transport-security` | max-age=63072000 | OK |
| `cache-control` | public, max-age=0, must-revalidate | OK |

### Headers Ausentes (Recomendados)

| Header | Função | Prioridade |
|--------|--------|------------|
| `Content-Security-Policy` | Previne XSS e injeção | Alta |
| `X-Frame-Options` | Previne clickjacking | Alta |
| `X-Content-Type-Options` | Previne MIME sniffing | Média |
| `Referrer-Policy` | Controla informações enviadas | Média |
| `Permissions-Policy` | Controla APIs do browser | Baixa |

### Configuração Recomendada para Vercel

Adicionar em `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(), microphone=(), camera=()"
        }
      ]
    }
  ]
}
```

---

## SEO - Status Atual

### Pontos Positivos (já implementados)
- Meta description presente e adequada
- Meta keywords presente
- Título otimizado com localização (Osasco)
- `lang="pt-BR"` definido
- `robots.txt` configurado
- `sitemap.xml` presente

### Pontos a Melhorar

| Item | Status | Ação |
|------|--------|------|
| Sitemap lastmod | Desatualizado (2024-02-16) | Atualizar data |
| Open Graph tags | Ausente | Adicionar og:title, og:description, og:image |
| Twitter Cards | Ausente | Adicionar twitter:card, twitter:title |
| Structured Data | Ausente | Adicionar JSON-LD para LocalBusiness |
| Canonical URL | Ausente | Adicionar link rel="canonical" |

---

## Métricas de Esforço

> **Nota**: Estimativas de tempo em desenvolvimento de software são notoriamente imprecisas. O tempo real depende de fatores como familiaridade com o código, ambiente de teste, debugging e imprevistos. As métricas abaixo fornecem dados concretos para auxiliar no planejamento.

### Visão Geral por Tarefa

| Tarefa | Arquivos | Linhas | Testes | Quebra? |
|--------|----------|--------|--------|---------|
| **Fase 1 - Segurança Crítica** |
| 1.1 Lottie-web | 1 | 1 | 1 verificação | Não |
| 1.2 rel="noopener" | 1 | 5 | 5 links | Não |
| 1.3 Bootstrap | 2 | 2 + CSS | 3 componentes | Não |
| **Fase 2 - Breaking Change** |
| 2.1 FancyBox v4→v5 | 2 | ~35 | Galeria completa | **SIM** |
| **Fase 3 - Otimização** |
| 3.1 Sandbox iframe | 1 | 1 | 1 verificação | Não |
| **Fase 4 - Headers** |
| 4.1 vercel.json | 1 | ~20 | Deploy | Não |
| **Fase 5 - SEO** |
| 5.1 Open Graph | 1 | ~15 | Share test | Não |
| 5.2 JSON-LD | 1 | ~30 | Rich results | Não |
| 5.3 Sitemap | 1 | 1 | - | Não |
| **Fase 6 - Performance** |
| 6.1 WebP conversion | 9 imgs | - | 9 imagens | Não |
| 6.2 width/height | 1 | ~15 | Layout | Não |
| 6.3 picture tags | 1 | ~30 | 9 imagens | Não |
| **Fase 7 - Acessibilidade** |
| 7.1 iframe title | 1 | 1 | Screen reader | Não |
| 7.2 Contraste | 1 | ~5 | Visual | Não |
| 7.3 Aria-labels | 1 | ~10 | Screen reader | Não |

### Totais por Fase

| Fase | Descrição | Arquivos | Linhas | Prioridade |
|------|-----------|----------|--------|------------|
| **1** | Segurança Crítica | 2 | 8 + CSS | Crítica |
| **2** | FancyBox (breaking) | 2 | ~35 | Alta |
| **3** | Sandbox iframe | 1 | 1 | Baixa |
| **4** | Headers segurança | 1 | ~20 | Alta |
| **5** | SEO | 2 | ~46 | Média |
| **6** | Performance imgs | 1 + 9 imgs | ~45 | Média |
| **7** | Acessibilidade | 2 | ~16 | Média |
| | **TOTAL** | | **~171** | |

### Dependências

```
Fase 1 ─────────────────────────────► Fazer primeiro (segurança)
    │
    ├── 1.1 Lottie-web (isolado)
    ├── 1.2 rel="noopener" (isolado)
    └── 1.3 Bootstrap (isolado)

Fase 4 ─────────────────────────────► Após Fase 1 (headers)
    └── 4.1 vercel.json (isolado)

Fase 2 ─────────────────────────────► Requer testes extensivos
    └── 2.1 FancyBox (breaking change)

Fase 5 ─────────────────────────────► Independente
    ├── 5.1 Open Graph (isolado)
    ├── 5.2 JSON-LD (isolado)
    └── 5.3 Sitemap (isolado)

Fase 6 ─────────────────────────────► 6.1 antes de 6.3
    ├── 6.1 Converter WebP ──► primeiro
    ├── 6.2 width/height (isolado)
    └── 6.3 picture tags ────► após 6.1

Fase 7 ─────────────────────────────► Independente
    ├── 7.1 iframe title (isolado)
    ├── 7.2 Contraste (isolado)
    └── 7.3 Aria-labels (isolado)

Fase 3 ─────────────────────────────► Baixa prioridade
    └── 3.1 Sandbox (isolado)
```

---

## Fase 1: Correções Críticas de Segurança

### 1.1 Atualizar Lottie-web (5.7.4 → 5.13.0)

**Risco atual**: CRÍTICO - Vulnerabilidades XSS conhecidas
**Quebra de código**: NÃO
**Complexidade**: Simples

**Análise**:
- API permanece compatível entre 5.7.4 e 5.13.0
- Apenas atualizar URL do CDN
- O código em `js/main.js` (linha 85-91) continuará funcionando

**Alteração necessária** em `index.html` linha 405:
```html
<!-- DE -->
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.7.4/lottie.min.js"></script>

<!-- PARA -->
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.13.0/lottie.min.js"></script>
```

**Teste necessário**: Verificar se animação do calendário no botão "Agende agora" funciona.

---

### 1.2 Adicionar rel="noopener noreferrer" aos links externos

**Risco atual**: MÉDIO - Vulnerabilidade de tabnabbing
**Quebra de código**: NÃO
**Complexidade**: Simples

**Links afetados** em `index.html`:
- Linha 368: Instagram
- Linha 372: Facebook
- Linha 377: TikTok
- Linha 383: WB Digital Solutions
- Linha 391: WhatsApp

**Alteração necessária**:
```html
<!-- DE -->
<a href="https://www.instagram.com/salaoloha/" target="_blank">

<!-- PARA -->
<a href="https://www.instagram.com/salaoloha/" target="_blank" rel="noopener noreferrer">
```

**Teste necessário**: Verificar se links abrem em nova aba corretamente.

---

### 1.3 Atualizar Bootstrap (5.3.2 → 5.3.8)

**Risco atual**: BAIXO - Correções de bugs e segurança
**Quebra de código**: NÃO
**Complexidade**: Simples

**Análise**:
- Versões 5.3.x são totalmente compatíveis entre si
- Apenas patch updates (correções)
- CSS local (`css/bootstrap.min.css`) também deve ser atualizado

**Alterações necessárias**:

1. Em `index.html` linha 407-408:
```html
<!-- DE -->
<script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
  crossorigin="anonymous"></script>

<!-- PARA -->
<script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
  crossorigin="anonymous"></script>
```

2. Baixar novo `css/bootstrap.min.css` de:
   https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css

**Teste necessário**: Verificar navbar, grid responsivo e modal do menu mobile.

---

## Fase 2: Atualização com Breaking Changes

### 2.1 Migrar FancyBox (v4 → v5)

**Risco atual**: ALTO - Versão muito desatualizada
**Quebra de código**: SIM - Breaking changes significativos
**Complexidade**: Moderada

**Análise de breaking changes**:

| Aspecto | FancyBox 4 | FancyBox 5 |
|---------|------------|------------|
| CSS | `@fancyapps/ui@4/dist/fancybox.min.css` | `@fancyapps/ui@5/dist/fancybox/fancybox.css` |
| JS | `@fancyapps/ui@4/dist/fancybox.umd.min.js` | `@fancyapps/ui@5/dist/fancybox/fancybox.umd.js` |
| Inicialização | `Fancybox.bind(element, options)` | `Fancybox.bind("[data-fancybox]", options)` |
| Opções | `buttons`, `transitionEffect` | Removidas/renomeadas |

**Alterações necessárias**:

1. Em `index.html` - Atualizar CDN links:
```html
<!-- DE -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4/dist/fancybox.min.css" />
<script defer src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4/dist/fancybox.umd.min.js"></script>

<!-- PARA -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5/dist/fancybox/fancybox.css" />
<script defer src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5/dist/fancybox/fancybox.umd.js"></script>
```

2. Em `js/main.js` - Reescrever inicialização (linhas 1-33):
```javascript
// DE (código atual)
document.querySelectorAll('[data-fancybox="gallery"]').forEach(function (element) {
  Fancybox.bind(element, {
    buttons: ['zoom', 'share', 'slideShow', ...],
    loop: true,
    speed: 500,
    transitionEffect: 'slide',
    // ...
  });
});

// PARA (FancyBox 5)
Fancybox.bind('[data-fancybox="gallery"]', {
  Toolbar: {
    display: {
      left: ["infobar"],
      middle: ["zoomIn", "zoomOut", "toggle1to1", "rotateCCW", "rotateCW", "flipX", "flipY"],
      right: ["slideshow", "thumbs", "close"],
    },
  },
  loop: true,
  animated: true,
  showClass: "f-zoomInUp",
  hideClass: "f-fadeOut",
  Thumbs: {
    type: "classic",
  },
});
```

**Teste necessário**:
- Abrir galeria de fotos
- Navegar entre imagens
- Testar em mobile (touch/swipe)
- Verificar botões de zoom, fullscreen, download

---

## Fase 3: Melhorias de Performance

### 3.1 Adicionar sandbox ao iframe do Google Maps

**Quebra de código**: NÃO
**Complexidade**: Simples

**Alteração** em `index.html` linha 331:
```html
<iframe
  src="https://www.google.com/maps/embed?..."
  sandbox="allow-scripts allow-same-origin"
  ...
></iframe>
```

---

### 3.2 Otimizar carregamento de fontes

**Quebra de código**: NÃO
**Complexidade**: Simples

**Alteração** em `index.html` linhas 5-8:
```html
<!-- Adicionar &display=swap se não tiver -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
  rel="stylesheet" />
```

---

### 3.3 Converter imagens para WebP

**Quebra de código**: NÃO (se manter fallback)
**Complexidade**: Moderada

**Ação**: Converter todas as imagens em `/images/` para WebP mantendo originais como fallback.

```html
<!-- Exemplo de implementação com fallback -->
<picture>
  <source srcset="images/work1.webp" type="image/webp">
  <img src="images/work1.jpg" alt="..." loading="lazy">
</picture>
```

**Economia estimada**: ~60-70% do tamanho atual (~9.9 MB → ~3-4 MB)

---

## Fase 4: Headers de Segurança

### 4.1 Configurar headers no Vercel

**Risco atual**: MÉDIO - Faltam headers de segurança
**Quebra de código**: NÃO
**Complexidade**: Simples

**Alteração** em `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "geolocation=(), microphone=(), camera=()" }
      ]
    },
    {
      "source": "/images/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/css/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/js/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

---

## Fase 5: Melhorias de SEO

### 5.1 Adicionar Open Graph e Twitter Cards

**Quebra de código**: NÃO
**Complexidade**: Simples

**Adicionar** em `index.html` no `<head>`:
```html
<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:title" content="Salão Loha - Estética e Beleza em Osasco" />
<meta property="og:description" content="Descubra a beleza em sua essência no Salão Loha. Serviços de cabelereiro, manicure, terapia capilar e depilação." />
<meta property="og:image" content="https://www.salaoloha.com.br/images/og-image.jpg" />
<meta property="og:url" content="https://www.salaoloha.com.br/" />
<meta property="og:locale" content="pt_BR" />

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Salão Loha - Estética e Beleza em Osasco" />
<meta name="twitter:description" content="Descubra a beleza em sua essência no Salão Loha." />
<meta name="twitter:image" content="https://www.salaoloha.com.br/images/og-image.jpg" />

<!-- Canonical -->
<link rel="canonical" href="https://www.salaoloha.com.br/" />
```

### 5.2 Adicionar Schema.org (JSON-LD)

**Quebra de código**: NÃO
**Complexidade**: Simples

**Adicionar** antes do `</head>`:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Salão Loha",
  "description": "Salão de beleza especializado em cabelereiro, manicure, terapia capilar e depilação",
  "url": "https://www.salaoloha.com.br",
  "telephone": "+55-11-94212-4242",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua Dona Primitiva Vianco, 100 - lj 08",
    "addressLocality": "Osasco",
    "addressRegion": "SP",
    "postalCode": "06018-010",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -23.527919,
    "longitude": -46.779388
  },
  "openingHours": "Mo-Sa 09:00-19:00",
  "priceRange": "$$",
  "image": "https://www.salaoloha.com.br/images/logo.png",
  "sameAs": [
    "https://www.instagram.com/salaoloha/",
    "https://www.facebook.com/salaoloha",
    "https://www.tiktok.com/@lohacabeleireiros"
  ]
}
</script>
```

### 5.3 Atualizar Sitemap

**Quebra de código**: NÃO
**Complexidade**: Simples

**Alteração** em `sitemap.xml`:
```xml
<lastmod>2026-02-03</lastmod>
```

---

## Fase 6: Otimização de Performance (Imagens)

### 6.1 Redimensionar e converter imagens

**Quebra de código**: NÃO
**Complexidade**: Moderada

**Comandos para conversão** (requer ImageMagick ou cwebp):
```bash
# Instalar cwebp (se não tiver)
brew install webp

# Converter todas as imagens da galeria
for img in images/work*.jpg; do
  cwebp -q 80 "$img" -o "${img%.jpg}.webp"
done

# Converter imagens de background
cwebp -q 85 images/bg-intro.jpg -o images/bg-intro.webp
cwebp -q 80 images/about.jpg -o images/about.webp
```

### 6.2 Adicionar width/height às imagens

**Quebra de código**: NÃO
**Complexidade**: Simples

**Alteração** em `index.html` - todas as tags `<img>`:
```html
<!-- DE -->
<img loading="lazy" src="images/work1.jpg" alt="..." class="img-fluid" />

<!-- PARA -->
<img loading="lazy" src="images/work1.jpg" alt="..." class="img-fluid" width="800" height="533" />
```

### 6.3 Implementar picture tags com fallback

**Quebra de código**: NÃO
**Complexidade**: Moderada

```html
<picture>
  <source srcset="images/work1.webp" type="image/webp">
  <img loading="lazy" src="images/work1.jpg" alt="..." width="800" height="533" class="img-fluid" />
</picture>
```

---

## Fase 7: Acessibilidade

### 7.1 Adicionar title ao iframe do Maps

**Quebra de código**: NÃO
**Complexidade**: Simples

```html
<iframe
  title="Localização do Salão Loha no Google Maps"
  src="https://www.google.com/maps/embed?..."
></iframe>
```

### 7.2 Corrigir contraste de cores

**Quebra de código**: NÃO
**Complexidade**: Simples

Verificar e ajustar cores com contraste insuficiente no `css/style.css`.

### 7.3 Adicionar aria-label aos links de ícones

**Quebra de código**: NÃO
**Complexidade**: Simples

```html
<!-- DE -->
<a href="https://www.instagram.com/salaoloha/" target="_blank">
  <i class="fab fa-instagram"></i>
</a>

<!-- PARA -->
<a href="https://www.instagram.com/salaoloha/" target="_blank" rel="noopener noreferrer" aria-label="Instagram do Salão Loha">
  <i class="fab fa-instagram" aria-hidden="true"></i>
</a>
```

---

## Ordem de Execução Atualizada

```
┌─────────────────────────────────────────────────────────────┐
│ FASE 1 - CRÍTICO (Segurança - fazer imediatamente)         │
├─────────────────────────────────────────────────────────────┤
│ 1.1 Lottie-web 5.7.4 → 5.13.0          [1 linha]           │
│ 1.2 rel="noopener noreferrer"          [5 linhas]          │
│ 1.3 Bootstrap 5.3.2 → 5.3.8            [2 linhas + CSS]    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ FASE 4 - Headers de Segurança                               │
├─────────────────────────────────────────────────────────────┤
│ 4.1 Configurar vercel.json             [~20 linhas]        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ FASE 2 - IMPORTANTE (Breaking change)                       │
├─────────────────────────────────────────────────────────────┤
│ 2.1 FancyBox v4 → v5                   [~35 linhas]        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ FASE 5 - SEO                                                │
├─────────────────────────────────────────────────────────────┤
│ 5.1 Open Graph + Twitter Cards         [~15 linhas]        │
│ 5.2 Schema.org JSON-LD                 [~30 linhas]        │
│ 5.3 Atualizar sitemap                  [1 linha]           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ FASE 6 - Performance (maior impacto)                        │
├─────────────────────────────────────────────────────────────┤
│ 6.1 Converter imagens para WebP        [9+ arquivos]       │
│ 6.2 Adicionar width/height             [~15 linhas]        │
│ 6.3 Implementar picture tags           [~30 linhas]        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ FASE 7 - Acessibilidade                                     │
├─────────────────────────────────────────────────────────────┤
│ 7.1 Title no iframe                    [1 linha]           │
│ 7.2 Corrigir contraste                 [CSS]               │
│ 7.3 Aria-labels nos links              [~10 linhas]        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ FASE 3 - Otimização adicional                               │
├─────────────────────────────────────────────────────────────┤
│ 3.1 Sandbox no iframe Maps             [1 linha]           │
└─────────────────────────────────────────────────────────────┘
```

---

## Métricas de Esforço Atualizadas

| Fase | Arquivos | Linhas | Quebra? | Prioridade |
|------|----------|--------|---------|------------|
| **Fase 1** | 2 | 8 + CSS | Não | Crítica |
| **Fase 4** | 1 | ~20 | Não | Alta |
| **Fase 2** | 2 | ~35 | **SIM** | Alta |
| **Fase 5** | 2 | ~46 | Não | Média |
| **Fase 6** | 1 + 9 imgs | ~45 | Não | Média |
| **Fase 7** | 2 | ~12 | Não | Média |
| **Fase 3** | 1 | 1 | Não | Baixa |

**Total**: ~171 linhas de código + conversão de 9 imagens

---

## Checklist de Testes Pós-Atualização

### Fase 1 - Segurança
- [ ] Animação do calendário no botão "Agende agora" (Lottie)
- [ ] Navbar responsiva funciona (Bootstrap)
- [ ] Menu mobile abre/fecha (Bootstrap)
- [ ] Links externos abrem em nova aba

### Fase 2 - FancyBox
- [ ] Galeria de fotos abre ao clicar
- [ ] Navegação entre imagens (setas)
- [ ] Fechar galeria (X e ESC)
- [ ] Swipe em mobile funciona
- [ ] Thumbnails aparecem
- [ ] Zoom funciona

### Fase 4 - Headers
- [ ] Verificar headers com `curl -I https://www.salaoloha.com.br/`
- [ ] Testar em [SecurityHeaders.com](https://securityheaders.com/)

### Fase 5 - SEO
- [ ] Testar compartilhamento no Facebook (Open Graph)
- [ ] Testar compartilhamento no Twitter
- [ ] Validar JSON-LD em [Google Rich Results Test](https://search.google.com/test/rich-results)

### Fase 6 - Performance
- [ ] Todas as imagens carregam corretamente
- [ ] Imagens WebP servidas em browsers modernos
- [ ] Fallback JPG funciona em browsers antigos
- [ ] Rodar Lighthouse novamente (meta: Performance > 80%)

### Fase 7 - Acessibilidade
- [ ] Testar com screen reader (VoiceOver/NVDA)
- [ ] Verificar contraste com [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [ ] iframe do Maps acessível

---

## Referências

- [Snyk - Lottie-web vulnerabilities](https://security.snyk.io/package/npm/lottie-web/5.7.4)
- [FancyBox 5 Migration Guide](https://fancyapps.com/fancybox/getting-started/)
- [Bootstrap 5.3.8 Release Notes](https://blog.getbootstrap.com/)
- [OWASP - Tabnabbing](https://owasp.org/www-community/attacks/Reverse_Tabnabbing)
- [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/)
- [Web.dev - Core Web Vitals](https://web.dev/vitals/)
- [Schema.org - BeautySalon](https://schema.org/BeautySalon)
- [SecurityHeaders.com](https://securityheaders.com/)
