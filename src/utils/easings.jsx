export const easing = {
    linear: t => t,

    easeIn: t =>
        t * t,

    easeOut: t =>
        1 - Math.pow(1 - t, 2),

    easeInOut: t =>
        t < 0.5
            ? 2 * t * t
            : 1 - Math.pow(-2 * t + 2, 2) / 2,

    cubicIn: t =>
        t * t * t,

    cubicOut: t =>
        1 - Math.pow(1 - t, 3),

    cubicInOut: t =>
        t < 0.5
            ? 4 * t * t * t
            : 1 -
              Math.pow(-2 * t + 2, 3) / 2,

    quintOut: t =>
        1 - Math.pow(1 - t, 5),

    smooth: t =>
        t * t * (3 - 2 * t)
};