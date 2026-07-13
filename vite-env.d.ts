/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  // আপনার অন্যান্য এনভায়রনমেন্ট ভ্যারিয়েবলগুলো এখানে যোগ করতে পারেন
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}