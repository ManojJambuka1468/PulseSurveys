export interface navItem{
    title:string;
    slug:string;
    icon?:string;
    children?:navItem[];
}