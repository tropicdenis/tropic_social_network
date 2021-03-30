import React, {ChangeEvent} from "react";
import DialogItem from "./DialogItem/DialogItem";
import s from './Dialogs.module.css';
import Message from "./Message/Message";
import {StoreType} from "../../Redux/Store";
import {
    InitialDialogsType,
    sendMessageActionCreator,
    updateNewMessageBodyActionCreator
} from "../../Redux/DialogsReducer";

type DialogsPropsType = {
    dialogsPage: InitialDialogsType
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void
}
const Dialogs = (props: DialogsPropsType) => {

    let state = props.dialogsPage;

    let dialogsElemets = state.dialogs
        .map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    let messagesElements = state.messages
        .map(m => <Message message={m.message}  key={m.id} id={m.id}/>)
    let newMessageBody = state.newMessageBody;
    let onSendMessageClick = () => {
        props.sendMessage()
    }
    let onNewMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        let body = event.target.value;
        props.updateNewMessageBody(body);
    }

    return (
        <div>
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElemets}
                </div>

                <div className={s.messages}>
                    <div>{messagesElements}</div>
                    <div>
                        <div><textarea placeholder={"Enter your message"} value={newMessageBody}
                                       onChange={onNewMessageChange}>
                        </textarea>
                        </div>
                        <div>
                            <button onClick={onSendMessageClick}>Send Message</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs

