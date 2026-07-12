/**
 * Data model for the infrastructure diagram.
 *
 * This module is self-contained: it has no imports from the rest of the site,
 * so the whole `diagram/` folder can be lifted into its own repo unchanged.
 */

export type NodeType =
  | 'internet'
  | 'firewall'
  | 'router'
  | 'switch'
  | 'server'
  | 'service'
  | 'storage'
  | 'vpn'
  | 'wifi'
  | 'client';

export interface DiagramNode {
  /** Unique id, referenced by edges. */
  id: string;
  /** Display name shown on the node and as the popup title. */
  label: string;
  /** Role of the node — controls styling and the popup subtitle. */
  type: NodeType;
  /** Generic product/software names shown as tags in the popup. */
  tech: string[];
  /** Position of the node centre, in viewBox coordinates. */
  x: number;
  y: number;
}

export interface DiagramEdge {
  /** `id` of the source node. */
  from: string;
  /** `id` of the target node. */
  to: string;
  /** Optional short label drawn next to the link (e.g. "WAN", "VPN tunnel"). */
  label?: string;
}

export interface DiagramData {
  /** Width/height of the SVG viewBox that node coordinates refer to. */
  width: number;
  height: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}
