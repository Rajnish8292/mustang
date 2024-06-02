import Loader from "./loader"

export default function LoadingPage()
{
    return (
        <div style={{
            position:'fixed',
            top:0,
            left:0,
            zIndex:'10',
            height:' 100vh',
            width:'100vw',
            background:'#d3d3d3',
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        }}>
            <Loader />
        </div>
    )
}