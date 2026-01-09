"use client";
import ChatMessage from '@/components/ChatMessage';
import { useEffect, useState } from 'react';
import { Log } from 'viem';
import { useAccount, usePublicClient, useTransactionReceipt, useWatchContractEvent, useWriteContract } from "wagmi";
import ScrollableBox from './ScrollableBox';

export default function MsgHistory({connectaddress} : {connectaddress: `0x${string}`| undefined}){
     const chatjson=require("../../chatting-contracts/out/chat.sol/chat.json");
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3" as `0x${string}`;
    
      const [message,Setmessage]=useState<string>("");
      const [messages,setMessages]=useState<Log[]>();
      const publicClient = usePublicClient();
      const {address} = useAccount();

      useWatchContractEvent({
        address: contractAddress,
        abi: chatjson.abi,
        eventName: 'Message',
        onLogs: () => {
          console.log('New message detected, refreshing...');
          fetchMessages();
        },
      });
    
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

          useEffect(()=>{       
            fetchMessages();
          },[]);
        

    return(
        <>  
        <ScrollableBox className='flex flex-col py-5 px-2 w-full h-full overflow-y-auto scrollbar-thumb-blue scrollbar-track-blue scrollbar-w-2 scrollbar-track-blue-lighter scrolling-touch'>
           <div>
            {messages?.map((log, i) => {
               return  <ChatMessage key={i} address={log.args.sender} message={log.args.message} connectedAddress={connectaddress}/>
            })}
            </div>
            </ScrollableBox>
        </>
    )
}