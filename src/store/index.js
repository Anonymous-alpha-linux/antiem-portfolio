import React, { createContext } from 'react';
export const ItemContext = createContext();

export default function index() {
    const [state, setState] = React.useState();
    return <ItemContext.Provider value={[state]}>index</ItemContext.Provider>;
}
