import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const toggleMenu = (elementId: string = 'toggleMenu') =>
  trigger(elementId, [
    state(
      'open',
      style({
        transform: 'scale(1)',
        opacity: 1,
      })
    ),
    state(
      'close',
      style({
        transform: 'scale(0.95)',
        opacity: 0,
      })
    ),
    transition('open => close', [animate('0.1s ease-out')]),
    transition('close => open', [animate('0.1s ease-in')]),
  ]);
