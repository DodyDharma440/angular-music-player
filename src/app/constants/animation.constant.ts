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

export const fadeModal = (
  elementId: string = 'fadeModal',
  duration: number = 0.5
) => {
  trigger(elementId, [
    state(
      'open',
      style({
        transform: 'scale(1) translateY(0)',
        opacity: 1,
      })
    ),
    state(
      'close',
      style({
        transform: 'scale(0.95) translateY(-20px)',
        opacity: 0,
      })
    ),
    transition('open => close', [animate(`${duration}s ease-out`)]),
    transition('close => open', [animate(`${duration}s ease-in`)]),
  ]);
};

export const modalAnimation = {
  in: {
    overlay: 'animate-[fade-in_0.2s_linear]',
    body: 'animate-[fade-down_0.2s_linear]',
  },
  out: {
    overlay: 'animate-[fade-out.2s_linear]',
    body: 'animate-[fade-up_0.2s_linear]',
  },
};
