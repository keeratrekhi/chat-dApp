"use client";

import MsgHistory from '@/components/MessageHistory';
import SendMessage from '@/components/sendMessage';
import { ConnectButton, WalletButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';


export default function Home() {
     const {address} = useAccount();

  return (
    <main className="container max-w-xl mx-auto">
      <div className='flex flex-col h-screen justify-between gap-5 '>
        <div className='py-5 flex justify-between items-center'>

    <ConnectButton />
   
    </div>  

    <MsgHistory connectaddress={address}/>
    <SendMessage/>

    </div>
    </main>
  );
}
