export const SHOW_WARNING = 'SHOW_WARNING';
export const HIDE_WARNING = 'HIDE_WARNING';

export const showWarning = () => ({
    type: SHOW_WARNING,
    payload: true
});

export const hideWarning = () => ({
    type: HIDE_WARNING,
    payload: false
});
