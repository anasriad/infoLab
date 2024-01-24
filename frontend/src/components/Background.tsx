import ParticlesBg from "particles-bg"
interface Props{
    Color: string
}
export default function Animation(props: Props) {
    const {Color} = props
    return <>
        <div className="  bg-transparent">
            <ParticlesBg type="cobweb" bg={true} color={Color}/>
        </div>
    </>
}