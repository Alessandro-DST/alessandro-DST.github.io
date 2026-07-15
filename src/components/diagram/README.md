# Infrastructure diagram module

A self-contained, data-driven network diagram. The SVG is rendered at build
time from [`data.ts`](./data.ts); a small vanilla script adds hover/focus
popups. No framework, no imports from the rest of the site.

**Customizing the diagram = editing `data.ts`.** You only touch the other
files to add a new node *type* or change the visuals.

> **⚠ Sanitized data only.** `data.ts` is published on a public website from a
> public repository. Never put real IP addresses, hostnames, credentials or
> internal domain names in it — generic labels and product names only.

## Data model (`types.ts`)

```ts
export const diagram: DiagramData = {
  width: 900,   // SVG viewBox width  — the coordinate space, not pixels
  height: 560,  // SVG viewBox height — grow these if you need more room
  nodes: [...],
  edges: [...],
};
```

### Nodes

```ts
{ id: 'web', label: 'Web Server', type: 'server', tech: ['nginx', 'Debian'], x: 130, y: 500 }
```

| Field  | Meaning |
| ------ | ------- |
| `id`   | Unique key, referenced by edges. Never shown to visitors. |
| `label`| Name drawn on the node and used as the popup title. |
| `type` | One of `NodeType` (see below). Controls the role line shown under the label / in the popup, and per-type styling. |
| `tech` | Product/software names shown as tags in the popup. May be empty (`[]`). Must not contain the `\|` character (used internally as a separator). |
| `x`,`y`| Position of the node **centre**, in viewBox coordinates (origin = top-left). |

### Edges

```ts
{ from: 'switch', to: 'web' }
{ from: 'internet', to: 'firewall', label: 'WAN' }
```

Straight lines drawn centre-to-centre beneath the nodes. `from`/`to` must
match node `id`s — the build **fails with an explicit error** if they don't,
so typos can't ship. The optional `label` is drawn near the line's midpoint.

### Node types

`NodeType` (in `types.ts`):
`internet · firewall · router · switch · server · service · storage · vpn · wifi · client`

Each type maps to a human-readable role in `NODE_TYPE_LABELS` (in `data.ts`),
e.g. `vpn` → "VPN gateway". That text appears under the node label and as the
popup subtitle.

**To add a new type** (e.g. `camera`):
1. Add it to the `NodeType` union in `types.ts`.
2. Add its display label to `NODE_TYPE_LABELS` in `data.ts` — the type checker
   forces this, since the map is `Record<NodeType, string>`.
3. Optional: style it in `InfraDiagram.astro` — each node's `<rect>` gets the
   class `box-<type>`, so add a `.box-camera { fill: ...; }` rule. Types
   without a rule use the default white box (currently only `firewall` and
   `vpn` have tinted fills).

## Layout tips

- Node boxes are **120 × 56** viewBox units (`NODE_W`/`NODE_H` at the top of
  `InfraDiagram.astro`). Keep node centres ≥ 150 units apart horizontally and
  ≥ 110 vertically to avoid overlap.
- Coordinates are manual by design — a 10-node diagram is easier to lay out by
  hand than to configure an auto-layout for. Sketch on a grid: rows for tiers
  (WAN → firewall → LAN), columns for siblings.
- Need more space? Increase `width`/`height` in `data.ts`; the SVG scales to
  its container, so the rendered size on the page doesn't change.
- Long labels don't wrap. If a `label` overflows the box, shorten it and put
  the detail in `tech`.

## Popup contents

The popup shows, in order: `label` (title), `NODE_TYPE_LABELS[type]`
(subtitle), and one tag per `tech` entry. To add a new field to the popup you
must touch `InfraDiagram.astro` in three places: the interface in `types.ts`,
the `data-*` attribute on the node `<g>`, and the tooltip fill logic in the
`<script>` — follow how `tech` is wired through.

## Previewing changes

```sh
npm run dev   # http://localhost:4321 — edits to data.ts hot-reload
```

`npx astro check` catches schema mistakes (wrong type name, missing field);
`npm run build` additionally validates edge references.
