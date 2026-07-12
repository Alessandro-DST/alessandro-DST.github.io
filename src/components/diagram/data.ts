/**
 * Diagram content — edit this file to change the diagram, no code changes needed.
 *
 * ⚠ SANITIZED DATA ONLY. This file is published on a public website from a
 * public repository. Never put real IP addresses, hostnames, credentials,
 * internal domain names or any other private configuration detail in here.
 * Generic labels and product names only.
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
  vpn: 'VPN gateway',
  wifi: 'Wi-Fi access point',
  client: 'Client device',
};

export const diagram: DiagramData = {
  width: 900,
  height: 560,
  nodes: [
    { id: 'internet', label: 'Internet', type: 'internet', tech: ['ISP modem'], x: 450, y: 60 },
    { id: 'firewall', label: 'Firewall', type: 'firewall', tech: ['OPNsense'], x: 450, y: 170 },
    { id: 'router', label: 'Router', type: 'router', tech: ['MikroTik'], x: 450, y: 280 },
    { id: 'switch', label: 'Core Switch', type: 'switch', tech: ['Managed L2'], x: 450, y: 390 },
    { id: 'web', label: 'Web Server', type: 'server', tech: ['nginx', 'Debian'], x: 130, y: 500 },
    { id: 'app', label: 'App Server', type: 'server', tech: ['Docker', 'Node.js'], x: 290, y: 500 },
    { id: 'nas', label: 'NAS', type: 'storage', tech: ['TrueNAS', 'ZFS'], x: 450, y: 500 },
    { id: 'vpn', label: 'VPN Gateway', type: 'vpn', tech: ['WireGuard'], x: 610, y: 500 },
    { id: 'wifi', label: 'Wi-Fi AP', type: 'wifi', tech: ['UniFi'], x: 770, y: 500 },
  ],
  edges: [
    { from: 'internet', to: 'firewall', label: 'WAN' },
    { from: 'firewall', to: 'router' },
    { from: 'router', to: 'switch' },
    { from: 'switch', to: 'web' },
    { from: 'switch', to: 'app' },
    { from: 'switch', to: 'nas' },
    { from: 'switch', to: 'vpn' },
    { from: 'switch', to: 'wifi' },
  ],
};
