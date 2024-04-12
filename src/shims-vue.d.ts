/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// declare module '*.svg' {
//     import Vue, { VueConstructor } from 'vue';
//     const content: VueConstructor<Vue>;
//     export default content;
// }

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.(png|jpe?g|gif)' {
    const value: string;
    export default value;
}

declare module 'vue/types/vue' {
  // Declare interface for extending Vue with $t function
  interface Vue {
    $t: (key: string, ...args: any[]) => string;
  }
}
