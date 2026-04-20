// Nexy: Synchronous Preamble Injection
if (import.meta.env.DEV) {
  (window as any).$RefreshReg$ = () => {};
  (window as any).$RefreshSig$ = () => (type: any) => type;
  (window as any).__vite_plugin_react_preamble_installed__ = true;
  import('/@react-refresh').then(m => m.default.injectIntoGlobalHook(window));
}

import "/src/globale.css";
import "@nexy/runtime.ts";
import "@nexy/ff.auto.ts";
export {};
