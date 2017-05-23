export const changeColor = (col) => ({
    type: 'CHANGE_COLOR',
    col
});

export const handleNewColor = () => {(dispatch, getState) => ({
    type: 'ADD_COLOR',
    color: getState().newColor
});
};

export const addHandler = (key, value) => ({
    type: 'CHANGE_NEW_COLOR',
    key,
    value
});