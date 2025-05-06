/// <reference types="react-scripts" />
/// <reference types="react" />
/// <reference types="react-dom" />

// Make sure the TypeScript compiler knows about the JSX namespace
import React from 'react';

// Global JSX namespace augmentation
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Ensure React events are properly typed
declare namespace React {
  interface SyntheticEvent<T = Element> {
    bubbles: boolean;
    cancelable: boolean;
    currentTarget: EventTarget & T;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    nativeEvent: Event;
    preventDefault(): void;
    stopPropagation(): void;
    target: EventTarget & T;
    timeStamp: number;
    type: string;
  }

  interface FormEvent<T = Element> extends SyntheticEvent<T> {
    // Form event specific properties
  }

  interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
    target: EventTarget & T;
  }
}

// Module declarations for asset imports
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.json' {
  const content: any;
  export default content;
}

// Ensure EventTarget is properly defined for TypeScript
interface EventTarget {
  [key: string]: any;
} 