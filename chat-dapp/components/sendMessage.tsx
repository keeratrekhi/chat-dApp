"use client";


import { useEffect, useState } from 'react';
import { Log } from 'viem';
import { useAccount, usePublicClient, useTransactionReceipt, useWatchContractEvent, useWriteContract } from "wagmi";


export default function SendMessage(){

    const [message,Setmessage]=useState<string>("");
    const [messages,setMessages]=useState<Log[]>();
    const chatjson=require("../../chatting-contracts/out/chat.sol/chat.json");
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3" as `0x${string}`;
    const publicClient = usePublicClient();
    const { writeContractAsync, isPending, data, error } = useWriteContract();


    const fetchMessages=async()=>{
  
      const logs=await publicClient?.getContractEvents({
        address: contractAddress,
        abi:chatjson.abi,
        eventName:'Message',
        fromBlock:BigInt(0),
        toBlock:'latest',
      });
      setMessages(logs);
    }

    const sendmessage = async () => {
        if (!message || message.length === 0) return;
      
        try {
          console.log("✉️ Sending message:", message);
          const tx = await writeContractAsync({
            address: contractAddress,
            abi: chatjson.abi,
            functionName: "sendMessage",
            args: [message],
          });
      
          console.log("Transaction sent:", tx);
          Setmessage("");
          
          const receipt = await publicClient?.waitForTransactionReceipt({ hash: tx });
          console.log("Transaction confirmed:", receipt);
          
        
          await fetchMessages();
      
        } catch (err) {
          console.error("Contract write error:", err);
        }
      };

    return (
      <div className="flex items-center w-full max-w-lg rounded-lg border border-gray-300 bg-white p-2 shadow-sm">
      <input 
        type="text" 
        className="flex-1 border-none outline-none bg-transparent px-2" 
        value={message}
        onChange={(e) => {Setmessage(e.target.value)}}
        placeholder="Type a message..."
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendmessage();
          }
        }}
      />
      <button 
        className="ml-2 rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 transition-colors" 
        onClick={(e) => { e.preventDefault(); sendmessage(); }} 
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </button>
    </div>
    )
}