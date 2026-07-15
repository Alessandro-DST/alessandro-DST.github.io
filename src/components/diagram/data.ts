/**
 * Diagram content — edit this file to change the diagram, no code changes needed.
 *
 * ⚠ SANITIZED DATA ONLY. This file is published on a public website from a
 * public repository. Never put real IP addresses, hostnames, ports,
 * credentials, interface names, internal domain names or any other private
 * configuration detail in here. Generic labels and product names only.
 */
import type { DiagramData, NodeType } from './types';

/** Human-readable role shown under the node label and in the popup. */
export const NODE_TYPE_LABELS: Record<NodeType, string> = {
  internet: 'Uplink',
  firewall: 'Firewall',
  router: 'Router',
  switch: 'Switch',
  server: 'Server',
  service: 'Service',
  storage: 'Storage',
  database: 'Database',
  vpn: 'VPN gateway',
  wifi: 'Wi-Fi access point',
  client: 'Client device',
};

export const diagram: DiagramData = {
  width: 900,
  height: 720,
  nodes: [
    { id: 'internet', label: 'Internet', type: 'internet', tech: [], x: 220, y: 50 },
    {
      id: 'firewall',
      label: 'Firewall',
      type: 'firewall',
      tech: ['Deny-all inbound', 'VPN-only'],
      x: 220,
      y: 150,
    },
    // --- VPS members ---
    { id: 'wireguard', label: 'VPN Gateway', type: 'vpn', tech: ['WireGuard'], x: 220, y: 400 },
    { id: 'ospos', label: 'OSPOS', type: 'service', tech: ['Docker'], x: 520, y: 300 },
    { id: 'metabase', label: 'Metabase', type: 'service', tech: ['Docker'], x: 520, y: 400 },
    { id: 'mariadb', label: 'MariaDB', type: 'database', tech: ['Docker'], x: 520, y: 500 },
    {
      id: 'backup',
      label: 'Backup Pipeline',
      type: 'service',
      tech: ['Encrypted dumps'],
      x: 770,
      y: 500,
    },
    // --- VPN clients ---
    { id: 'laptop', label: 'Laptop', type: 'client', tech: ['WireGuard client'], x: 110, y: 650 },
    { id: 'phone', label: 'Phone', type: 'client', tech: ['WireGuard client'], x: 300, y: 650 },
    {
      id: 'pos',
      label: 'POS Tablets',
      type: 'client',
      tech: ['WireGuard client'],
      x: 490,
      y: 650,
    },
  ],
  edges: [
    { from: 'internet', to: 'firewall', label: 'WAN' },
    { from: 'firewall', to: 'wireguard', label: 'VPN port only' },
    { from: 'wireguard', to: 'ospos' },
    { from: 'wireguard', to: 'metabase' },
    { from: 'wireguard', to: 'mariadb' },
    { from: 'ospos', to: 'metabase' },
    { from: 'metabase', to: 'mariadb' },
    { from: 'mariadb', to: 'backup' },
    { from: 'laptop', to: 'wireguard' },
    { from: 'phone', to: 'wireguard', label: 'VPN tunnel' },
    { from: 'pos', to: 'wireguard' },
  ],
  groups: [
    {
      id: 'vps',
      label: 'VPS',
      nodes: ['wireguard', 'ospos', 'metabase', 'mariadb', 'backup'],
    },
  ],
};
