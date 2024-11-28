export enum Keys {
    Q = 'Q',
    W = 'W',
    E = 'E',
    R = 'R',
    T = 'T',
    Y = 'Y',
    U = 'U',
    I = 'I',
    O = 'O',
    P = 'P',
    A = 'A',
    S = 'S',
    D = 'D',
    F = 'F',
    G = 'G',
    H = 'H',
    J = 'J',
    K = 'K',
    L = 'L',
    Enter = 'Enter',
    Z = 'Z',
    X = 'X',
    C = 'C',
    V = 'V',
    B = 'B',
    N = 'N',
    M = 'M',
    Delete = 'Delete'
};

export const keyOptions = () => {
    const keys = [];
    for (let key of Object.values(Keys)) {
        keys.push({ name: key })
    }
    return keys;
}