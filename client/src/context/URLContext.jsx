import { createContext, useReducer } from "react"

export const URLContext = createContext();
const searchParams = new URLSearchParams(window.location.search);
    const q = searchParams.get("query");
    const p = searchParams.get("page");
    const g = searchParams.get("gender");
    const c = searchParams.get("category");
    const s = searchParams.get("sort")
    
export const URLContextProvider = ({children})=>{
    const queries = {
        query:q?q:"",
        page:p?p:1,
        gender:g?g:"",
        category:c?c:"",
        sort:s?s:"",
    }
    function dispatch(state ,action){

        switch (action.type) {
            case "query":
                return{
                    ...state,
                    query:action.payload,
                    page:1
                }

            case "page":
                return{
                    ...state,
                    page:action.payload
                }

            case "gender":
            return{
                ...state,
                gender:action.payload,
                page:1
            }
            case "category":
            return{
                ...state,
                category:action.payload,
                page:1
            }
            case "sort":
            return{
                ...state,
                sort:action.payload,
                page:1
            }
            default:
                return state;
        }
    }

    const [URLState,URLDispatch] = useReducer(dispatch,queries);
    return(
        <URLContext.Provider value={{URLState,URLDispatch}}>
            {children}
        </URLContext.Provider>
    )
}