import React, { useEffect, useState } from "react";

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string,
};

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
};

const Chat: React.FC = () => {
    const [wsChanel, setWsChanel] = useState<WebSocket | null> (null);

    useEffect(() => {
        let ws: WebSocket;

        const closeHandler = () => {
            setTimeout(createChanel, 3000);
        };

        function createChanel() {
            ws?.removeEventListener('close', closeHandler);
            ws?.close();

            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
            ws.addEventListener('close', closeHandler);
            setWsChanel(ws);
        };

        createChanel();

        return () => {
            ws.removeEventListener('close', closeHandler);
            ws.close();
        };
    }, []);

    return (
        <div>
            <Messages wsChanel={wsChanel}/>
            <AddMessageForm wsChanel={wsChanel}/>
        </div>
    )
};

const Messages: React.FC<{wsChanel: WebSocket | null}> = ({wsChanel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);

    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        };
        
        wsChanel?.addEventListener('message', messageHandler);

        return () => {
            wsChanel?.removeEventListener('message', messageHandler);
        };
    }, [wsChanel]);

    return (
        <div style={{height: '500px', overflowY: 'auto'}}>
            {messages.map((m, index) => <Message key={index} message={m}/>)}
        </div>
    )
};

const Message: React.FC<{message: ChatMessageType}> = ({message}) => {
    return (
        <div>
            <img style={{width: '30px'}} src={message.photo} alt={''}/>
            <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
};

const AddMessageForm: React.FC<{wsChanel: WebSocket | null}> = ({wsChanel}) => {
    const [message, setMessage] =useState('');
    const [readyStatus, setReadyStatus] =useState<'pending' | 'ready'>('pending');

    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('ready');
        };

        wsChanel?.addEventListener('open', openHandler);

        return () => {
            wsChanel?.removeEventListener('open', openHandler);
        };
    }, [wsChanel]);

    const sendMessage = () => {
        if (!message) {
            return;
        };

        wsChanel?.send(message);

        setMessage('');
    };

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button disabled={wsChanel == null || readyStatus !== 'ready'} onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
};

export default ChatPage;