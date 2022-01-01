export interface SharedLoadingState{
    stat:boolean;
    errMsg:string;
}
export const initialLoad:SharedLoadingState ={
    stat:false,
    errMsg:''
}