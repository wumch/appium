import {Driver} from './idriver';
declare module './driver' {
  export interface BaseDriver extends Driver {}
}
