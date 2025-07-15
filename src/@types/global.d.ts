// This file allows TypeScript to understand the @/ path alias
declare module '@/components/*' {
  const component: any;
  export default component;
}
