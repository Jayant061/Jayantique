import { createContext, useReducer } from "react"


export const ProductContext = createContext();

export const ProductContextProvider = ({children})=>{
    // state
    
    const INITIAL_STATE= {
        products:[],
        similarProducts:[],
        trendingProducts:[],
        query: "",

    }

    // reducer

    const ProductReducers = (state,action)=>{
        switch (action.type) {
            case "getProducts":
                return {
                   ...state,
                   products:action.payload
                };
            case "similarProducts":
                return{
                    ...state,
                    similarProducts:action.payload
                }
            case "trendingProducts":
                return {
                    ...state,
                    trendingProducts:action.payload
                } 
            case "Query":
                return{
                    ...state,
                    query:action.payload
                }
            default:
               return state
        }
    }

    const [state, dispatch] = useReducer(ProductReducers,INITIAL_STATE);

    return(
        <ProductContext.Provider value = {{state,dispatch}}>
            {children}
        </ProductContext.Provider>
    )


}
