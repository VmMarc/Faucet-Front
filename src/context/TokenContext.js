import {createContext, useContext, useEffect, useReducer} from "react"
import { ethers } from "ethers"
import { Web3Context } from "web3-hooks"
import { FaucetContext } from "../App"
import { tokenReducer } from "../reducers/tokenReducer"

export const TokenContext = createContext()

const initialState = {
  ownBalance: 0,
  token: {name: "", symbol: "", decimals: "", totalSupply: 0},
  balance: 0,
  allowance: 0,
  error: "",
  loading: false
}

export const TokenContextProvider = ({children}) => {

  const [robinetToken] = useContext(FaucetContext)
  const [web3State] = useContext(Web3Context)
  const [state, dispatch] = useReducer(tokenReducer, initialState)
  const { ownBalance, token, balance, allowance, error, loading } = state
   useEffect(() => { 
    async function fetchData() {
      if (web3State.isLogged) {
        try {
          const nameToken = await robinetToken.name()
          const symbol = await robinetToken.symbol()
          const decimals = await robinetToken.decimals()
          const totalSupply = await robinetToken.totalSupply() 
          const token = {name: nameToken, symbol: symbol, decimals: decimals, totalSupply: ethers.utils.formatEther(totalSupply)}

          const ownBalance1 = await robinetToken.balanceOf(web3State.account) 
          const ownBalance = ethers.utils.formatEther(ownBalance1)
          dispatch({type: 'INIT', payload: [token, ownBalance]})

        } catch (e) {
          dispatch({type: 'ERROR', payload: e.message})
        }
      }
    }
    fetchData()
    
  },[web3State, robinetToken])

  return (
    <TokenContext.Provider value={{ ownBalance, token, balance, allowance, error, loading, dispatch}}>
      {children}
    </TokenContext.Provider>
  )
}

export const useToken = () => {
  const context = useContext(TokenContext)
  if (context === undefined) {
    throw new Error(`You try to use FilterContext outside of its provider.`)
  }
  return context
}
