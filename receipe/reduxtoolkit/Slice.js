const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    searchText: '',
    id:'',
    profile_id:'',
    favourite:[],
    follow1:0,
    result1:[],
    image:'',
    comment:[],
    progress:'',
    userResult:[],
    editResult:[],
    rating1:[],
    TrueOrfalse:false,
    TrueOrfalse1:false
};

const slice = createSlice({
    name: "searchText",
    initialState,
    reducers: {
        add: (state, action) => {
            state.searchText = action.payload;
        },
        id:(state,action)=>{
            state.id=action.payload
        },
        profile_id:(state,action)=>{
            state.profile_id=action.payload
        },
        wishlist:(state,action)=>{
            state.favourite =[...state.favourite,action.payload];
        },
        removeList:(state,action)=>{
            state.favourite=state.favourite.filter(item=> item._id!==action.payload);
        },
        follow:(state,action)=>{
            state.follow1 =state.follow1+1
        },
        unfollow:(state,action)=>{
            state.follow1=state.follow1-1;
        },
        initialFollow:(state,action)=>{
            state.follow1=action.payload
        },
        store: (state, action) => {
            const { payload } = action;
            const chunks = [];
            const chunkLength = 24;
            for (let i = 0; i < payload.length; i += chunkLength) {
              chunks.push(payload.substring(i, i + chunkLength));
            }
            state.result1 = state.result1.concat(chunks);
          },
        removeStore:(state,action)=>{
          state.result1=state.result1.filter((item)=>item!==action.payload);
        },
        imageChange:(state,action)=>{
            state.image=action.payload
        }, 
        commentList:(state,action)=>{
            state.comment=action.payload;
        },
        addcommentList:(state,action)=>{
            state.comment=[...state?.comment,action.payload];
        },
        deleteCommentList:(state,action)=>{
            state.comment=state.comment.filter((cmt)=> cmt.unique_id !== action.payload)
        },
        progressChange:(state,action)=>{
            state.progress=true;
        },
        initialResult:(state,action)=>{
            state.userResult=action.payload
        },
        deleteResult:(state,action)=>{
            state.userResult=state.userResult.filter((res)=> res._id != action.payload)
        },
        editResult1:(state,action)=>{
            state.editResult=action.payload;
        },
        ratingStore:(state,action)=>{

            console.log(action.payload);
            state.rating1=[...action.payload]
        },
        stateChange:(state,action)=>{
            state.TrueOrfalse=!state.TrueOrfalse;
        },
        profileChange:(state,action)=>{
            state.TrueOrfalse1=!state.TrueOrfalse1;
        }
    }
});

export const { profileChange,stateChange,ratingStore,removeStore,add,id,commentList,editResult1,progressChange,deleteResult,initialResult,deleteCommentList,addcommentList,wishlist,removeList,profile_id,follow,initialFollow,unfollow,imageChange,store } = slice.actions;
export default slice.reducer;
