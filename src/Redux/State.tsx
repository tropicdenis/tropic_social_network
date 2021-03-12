export type DialogType = {
    name: string,
    id: number
}
export type MessageType = {
    id: number
    message: string
}

export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type DialogsPageType = {
    messages: Array<MessageType>
    dialogs: Array<DialogType>
}

export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}

export type FriendType = {
    name: string
    avatarURL: string
}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    friends: Array<FriendType>
}
export type StoreType = {
    _state: RootStateType
    rerenderEntireTree: ()=> void
    addPost: ()=> void
    updateNewPostText: (newPostText: string) => void
    subscribe:(observer: ()=> void) => void

}
let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "Hi, how are you?", likesCount: 12},
                {id: 2, message: "It's my first post", likesCount: 11},
                {id: 3, message: "Blabla", likesCount: 5},
                {id: 4, message: "Dadada", likesCount: 14}
            ],
            newPostText: ""
        },
        dialogsPage: {
            messages: [
                {id: 1, message: "Hi"},
                {id: 2, message: "How is your it-kamasutra"},
                {id: 3, message: "Yo"},
                {id: 4, message: "Yo"},
                {id: 5, message: "Yo"},
            ],
            dialogs: [
                {id: 1, name: "Dimych"},
                {id: 2, name: "Andrey"},
                {id: 3, name: "Sveta"},
                {id: 4, name: "Sasha"},
                {id: 5, name: "Viktor"},
                {id: 6, name: "Valera"},
            ]
        },
        friends: [
            {
                name: "Garry",
                avatarURL: "https://nick-intl.mtvnimages.com/uri/mgid:file:gsp:kids-assets:/nick/properties/spongebob-squarepants/characters/gary-character-web-desktop.png?height=0&width=480&matte=true&crop=false"
            },
            {name: "Patrick", avatarURL: "https://upload.wikimedia.org/wikipedia/ru/4/4e/Patrick_star-4854.jpg"},
            {name: "Squidi", avatarURL: "https://www.meme-arsenal.com/memes/8ba9362a677fe74c4e7af0feaeef2360.jpg"}
        ]
    },
    rerenderEntireTree() {
        console.log("State changed");
    },
    addPost () {
        const newPost: PostType = {
            id: new Date().getTime(),
            message: this._state.profilePage.newPostText,
            likesCount: 0
        };
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = ""
        this.rerenderEntireTree();
    },
    updateNewPostText (newPostText) {
        this._state.profilePage.newPostText = (newPostText);
        this.rerenderEntireTree();
    },
    subscribe (observer) {
        this.rerenderEntireTree = observer //набллюдатель
    }
}

/*window.state = state;*/
export default store

//store - ООП

