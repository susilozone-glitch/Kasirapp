/// <reference types="vite/client" />

// ionicons ships JS icon exports without bundled type declarations in some
// versions; declare the module so TS treats named icon imports as valid.
declare module 'ionicons/icons';
