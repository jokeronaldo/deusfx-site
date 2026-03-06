# DeusFX — Guia de Reatividade com Signals (v2)

> Como e onde usar signals para suprir a carência de reatividade nativa dos
> Web Components, combinando Lit, preact-signals e o registry do DeusFX.

---

## O problema dos Web Components

Web Components nativos não têm reatividade entre componentes. Um atributo
passado de pai para filho é uma **cópia de valor** — mudar no filho não reflete
no pai, e o pai não sabe quando o filho mudou.

O Lit resolve isso dentro de um único componente com `@property` e `@state`,
mas entre componentes aninhados o problema persiste.

**O DeusFX resolve isso com quatro ferramentas:**

- `Signal` — valor reativo, observável por qualquer um com a referência
- `computed` — valor derivado de signals, recalcula automaticamente
- `effect` — side effect que executa quando um signal muda
- `emit` / `reactToSignal` — eventos e comandos desacoplados entre componentes
- `registry` — mapa global de componentes e seus signals públicos

---

## Mapa mental: quando usar cada ferramenta

```
Tenho um valor que muda e precisa reagir em algum lugar?
│
├── No próprio componente
│     → signal + @property ou @state + effect
│
├── Em um filho direto (renderizado no meu template)
│     → passa o Signal por referência via prop (.xSignal)
│
├── Em um descendente qualquer (mesmo sem relação direta)
│     → registry.getDescendantSignals() + computed
│
├── Em um ancestral qualquer
│     → registry.getNearestAncestorSignal() + computed
│       ou emit (child:emissor:evento) + reactToSignal
│
└── Em componente sem relação hierárquica
      → emit + reactToSignal com namespace
```

---

## Padrão 1 — Estado local com `signal` + `@property` / `@state`

Use quando o valor é interno ao componente e o Lit precisa re-renderizar
quando ele muda.

```typescript
// signal guarda o valor reativo
private _isActive: Signal<string> = signal("no")

// @property expõe via getter/setter — Lit detecta mudança e re-renderiza
@property({ type: String, attribute: "is-active", reflect: true })
get isActive() { return this._isActive.value }
set isActive(v: string) { this._isActive.value = v }

// @state — valor interno sem exposição externa
// use quando o signal não está em um @property mas precisa triggerar render
@state()
private _snapshot: string[] = []

connectedCallback() {
  super.connectedCallback()
  effect(() => {
    // qualquer mudança em _signal atualiza _snapshot
    // Lit detecta mudança no @state e chama render()
    this._snapshot = [...this._signal.value]
  })
}
```

**`@state` vs `@property`:**
- `@property` — valor exposto para fora (atributo HTML ou prop)
- `@state` — valor interno, só para triggerar re-render do Lit

---

## Padrão 2 — Side effects no DOM com `effect`

Use quando uma mudança de signal precisa escrever diretamente no DOM —
CSS vars, atributos, classList — coisas que o Lit não gerencia via template.

```typescript
protected setupDOMEffects() {
  // CSS custom property — não pode ser feita só com binding do Lit
  // pois o template não tem acesso ao :host style diretamente
  effect(() => {
    this.style.setProperty("--item-state-active", this._isActive.value)
  })

  // força re-render quando computed muda
  // necessário quando o computed não é lido diretamente no template
  effect(() => {
    this._optionsFiltered.value   // lê para rastrear
    this._optionsActive.value     // lê para rastrear
    this.requestUpdate()          // notifica o Lit
  })
}
```

**Regra:** se você precisa de `style.setProperty`, `setAttribute`, ou
`classList` em resposta a um valor reativo — use `effect`.

---

## Padrão 3 — Valores derivados com `computed`

Use quando um valor é sempre derivado de outros signals. Nunca recalcula
desnecessariamente — só quando as dependências mudam.

```typescript
// ❌ ERRADO — getter JavaScript puro, não é rastreado por ninguém
get optionsFiltered() {
  return this.options.filter(item => item.text.includes(this.search))
}

// ✅ CORRETO — computed rastreia os signals internamente
private _optionsFiltered = computed(() => {
  const search = this._search.value    // rastreado
  const options = this._options.value  // rastreado
  if (!search) return options
  return options.filter(item =>
    item.text.toLowerCase().includes(search.toLowerCase())
  )
})

get optionsFiltered() { return this._optionsFiltered.value }
```

**Regra:** se o valor depende de outros signals, use `computed`.
Getters JavaScript puros não são reativos.

---

## Padrão 4 — Signals públicos via `publicSignals`

Todo componente declara quais signals quer expor para o ecossistema.
O registry extrai automaticamente ao registrar o componente.

```typescript
// dfx-list.host.ts
private _itemsActive: Signal<string[]> = signal([])

// convenção: publicSignals é o contrato público do componente
// qualquer ancestral ou descendente pode acessar via registry
publicSignals = {
  itemsActive: this._itemsActive
}

// dfx-item.host.ts
private _isActive: Signal<string> = signal("no")

publicSignals = {
  isActive: this._isActive
}
```

Se `publicSignals` for definido após o registro (casos dinâmicos):

```typescript
// força o registry a re-extrair os signals
registry.refreshSignals(this.uuid)
```

---

## Padrão 5 — Consulta ao registry com `computed`

Use quando um componente precisa reagir ao estado de descendentes ou
ancestrais sem acoplamento direto. O `computed` rastreia os signals
encontrados — qualquer mudança recalcula automaticamente.

```typescript
// dfx-dropdown — agrega estado de TODOS os dfx-list descendentes
// funciona para 1 list, para 10 lists, para sub-árvores futuras
// sem nenhum código adicional
private _optionsActiveComputed = computed(() => {
  const allActive = registry
    .getDescendantSignals<string[]>(this, "dfx-list", "itemsActive")
    .flatMap(s => s.value)

  return allActive
    .map(active => this._options.value.find(item => item?.value === active))
    .filter(Boolean) as DropdownOptions[]
})

// dfx-item — lê o estado do list pai mais próximo
private _parentListActive = computed(() => {
  const signal = registry.getNearestAncestorSignal<string[]>(
    this, "dfx-list", "itemsActive"
  )
  return signal?.value ?? []
})
```

**Métodos do registry para signals:**

| Método | Quando usar |
|---|---|
| `getSignal(uuid, name)` | Quando sabe o uuid exato |
| `getDescendantSignals(host, tag, name)` | Pai buscando estado de filhos |
| `getAncestorSignals(host, tag, name)` | Filho buscando estado de pais |
| `getNearestAncestorSignal(host, tag, name)` | Filho buscando o pai mais próximo |

---

## Padrão 6 — Comunicação via `emit` + `reactToSignal`

Use para **eventos e comandos** — ações que acontecem uma vez e disparam
uma reação. Não use para estado contínuo observável (use registry + computed).

### Namespace obrigatório

```
{direção}:{emissor}:{evento}

child:item:active              — item ativou, sobe para o pai
child:item:inactive            — item desativou, sobe para o pai
child:list:update              — list atualizou, sobe para o pai
parent:list:deactivate-others  — list comanda desativação, desce
parent:dropdown:close          — dropdown comanda fechamento, desce
```

**Direção:**
- `child:` — sobe na árvore (filho → pai → avô)
- `parent:` — desce na árvore (pai → filhos)
- sem prefixo / `self:` — broadcast para todos

### Emitindo

```typescript
// simples
this.emit({ signal: "child:item:active", payload: this.value })

// com exclusão
this.emit({
  signal: "parent:list:deactivate-others",
  except: [this.uuid]
})

// múltiplos de uma vez
this.emitBatch([
  { signal: "child:item:active", payload: this.value },
  { signal: "child:item:focus" },
])
```

### Reagindo

```typescript
@reactToSignal("child:item:active")
handleItemActive(signalData: SignalPayload) {
  // signalData.from    — uuid do emissor
  // signalData.payload — dado enviado
  // signalData.to      — uuid(s) destino (se targeted)
  this._itemsActive.value = [...this._itemsActive.value, signalData.payload]
}
```

---

## Registry vs emit: papéis complementares

```
registry + computed  →  estado contínuo, observável, reativo automaticamente
emit + reactToSignal →  eventos pontuais, comandos, ações de uma vez
```

**Exemplos práticos:**

```
✅ registry: dropdown sabe quais opções estão ativas no list
✅ registry: item sabe se está ativo consultando o list pai
✅ emit:     item notifica que foi clicado (child:item:active)
✅ emit:     list comanda desativação dos outros itens (parent:list:deactivate-others)

❌ emit para estado: usar child:list:update para sincronizar itemsActive
   → substituir por registry.getDescendantSignals()

❌ registry para comando: consultar registry para saber "quem devo desativar"
   → usar emit com except:[] para broadcast direcionado
```

---

## Ciclo completo no DeusFX

```
1. Componente conecta ao DOM
   → connectedCallback chama registry.register(uuid, this)
   → registry extrai publicSignals automaticamente

2. Usuário clica em dfx-item
   → item atualiza _isActive (Signal próprio)
   → item emite "child:item:active" com payload

3. dfx-list recebe via @reactToSignal("child:item:active")
   → atualiza _itemsActive (publicSignal)
   → registry já tem a referência — qualquer computed que lê
     getDescendantSignals("dfx-list", "itemsActive") recalcula

4. dfx-dropdown tem computed que lê getDescendantSignals
   → recalcula _optionsActiveComputed automaticamente
   → effect detecta mudança → requestUpdate()
   → Lit re-renderiza

5. Qualquer outro componente externo
   → registry.getDescendantSignals(host, "dfx-list", "itemsActive")
   → sem acoplamento, sem eventos, sem props manuais
```

---

## Tabela de decisão rápida

| Situação | Solução |
|---|---|
| Valor interno que triggera re-render | `signal` + `@property` ou `@state` |
| Valor derivado de outros signals | `computed` |
| Side effect no DOM (CSS var, classList) | `effect` |
| Filho direto no template precisa do estado do pai | Passa `Signal` por referência via prop |
| Estado de descendentes/ancestrais sem acoplamento | `registry.getDescendantSignals` + `computed` |
| Evento pontual, comando, ação de uma vez | `emit` + `reactToSignal` com namespace |
| Re-render quando computed muda | `effect` lendo o computed + `requestUpdate()` |
| Expor estado para o ecossistema | `publicSignals` |

---

## Anti-padrões a evitar

**Getter JavaScript como computed:**
```typescript
// ❌ não é reativo
get filtered() { return this.items.filter(...) }

// ✅ reativo
private _filtered = computed(() => this._items.value.filter(...))
```

**Mutar array do signal diretamente:**
```typescript
// ❌ Lit não detecta, signal não notifica
this._items.value.push(newItem)

// ✅ reatribui para notificar
this._items.value = [...this._items.value, newItem]
```

**Passar valor do signal como prop quando precisa de reatividade:**
```typescript
// ❌ passa cópia do valor no momento do render
html`<dfx-filho .items="${this._items.value}"></dfx-filho>`

// ✅ passa o Signal em si
html`<dfx-filho .itemsSignal="${this._items}"></dfx-filho>`
```

**Usar emit para sincronizar estado contínuo:**
```typescript
// ❌ verboso, frágil, precisa de handler em todo consumidor
this.emit({ signal: "child:list:update", payload: this._itemsActive.value })

// ✅ publicSignals + registry — automático para todos os consumidores
publicSignals = { itemsActive: this._itemsActive }
// consumidor:
registry.getDescendantSignals(this, "dfx-list", "itemsActive")
```

**Não declarar publicSignals:**
```typescript
// ❌ estado interno invisível para o ecossistema
private _itemsActive: Signal<string[]> = signal([])

// ✅ expõe o que outros componentes podem precisar
private _itemsActive: Signal<string[]> = signal([])
publicSignals = { itemsActive: this._itemsActive }
```

**Usar Map nativo para acumular signals:**
```typescript
// ❌ Map nativo é invisível para o preact-signals
// o computed nunca re-executa quando o Map é mutado
private _listSignals = new Map<string, Signal<string[]>>()

handleChildListUpdate(signalData: SignalPayload) {
  this._listSignals.set(uuid, signal)  // computed não detecta
}

// ✅ Map dentro de um Signal — reatribuição notifica o computed
private _listSignals = signal(new Map<string, Signal<string[]>>())

handleChildListUpdate(signalData: SignalPayload) {
  const newMap = new Map(this._listSignals.value)
  newMap.set(uuid, signal)
  this._listSignals.value = newMap  // computed re-executa
}
```

**Emitir Signal sem identificador no payload:**
```typescript
// ❌ payload sem uuid — receptor não sabe de qual componente veio
// impossível acumular signals de múltiplos emissores do mesmo tipo
this.emit({
  signal: "child:list:update",
  payload: this._itemsActive  // só o Signal
})

// ✅ payload com uuid — receptor mapeia por origem
// suporta múltiplos dfx-list, sub-árvores, composição livre
this.emit({
  signal: "child:list:update",
  payload: { uuid: this.uuid, signal: this._itemsActive }
})

// receptor:
@reactToSignal("child:list:update")
handleChildListUpdate(signalData: SignalPayload) {
  const { uuid, signal } = signalData.payload
  if (!this._listSignals.value.has(uuid)) {
    const newMap = new Map(this._listSignals.value)
    newMap.set(uuid, signal)
    this._listSignals.value = newMap
  }
}
```
