import React, {useEffect , useState} from 'react';
import {ethers} from 'ethers' ;

import { contractABI , contractAddress} from '../utils/constants' ;

export const TransactionContext = React.createContext();

const {ethereum} = window ;

const getEthereumContract = () => {
    const providers = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress , contractABI , signer)
}

export const TransactionProvider = ({children}) => {

    const [currentAccount , setCurrentAccount] = useState('');
    const [formData , setFormData] = useState({addressTo : '' , message : '' , keyword : '' , amount: ''});
    const [isLoading , setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const handleChange = (e , name)=>{
            setFormData((prevState) => ({ ...prevState, [name] :e.target.value}));

    }


    
    const checkIfWalletisConnected = async () => {
       try {
        if (!ethereum) return alert("Please install Metamask");
        const accounts = await ethereum.request({method : 'eth_accounts'})

        if (accounts.length ) {
            setCurrentAccount(accounts[0]);

        }else {
            console.log("No Account found");
        }

        
       } catch (error) {
        console.log(error);

        throw new Error("No ethereum Object found");
        
       }
        console.log(accounts);
    }

    const connectWallet = async () => {
        try{
            if (!ethereum) return alert("Please install Metamask");
            const accounts = await ethereum.request({method : 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
        }catch(error){
            console.log(error);
            throw new Error("No Ethereum Object");

        }
    }

    const sendTransactions = async() => {
        try {
            if (!ethereum) return alert("Please install Metamask");

            const {addressTo, amount, message, keyword} = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method :'eth_sendTransaction' ,
                params :[{
                    from : currentAccount,
                    to : addressTo ,
                    gas : '0x5208', //21000 gwei
                    value: parsedAmount._hex,
                }]
            });

            const transactionHash = transactionContract.addtoChain(addressTo, parsedAmount, message, keyword);
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();


        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum Object");

            
        }
    }

    useEffect(() => {
        checkIfWalletisConnected();
    })
    return (
        <TransactionContext.Provider value ={{connectWallet , currentAccount, formData, setFormData, handleChange , sendTransactions}}>
            {children}
        </TransactionContext.Provider>
    );
}