import Spinner from "../assets/SpinnerGap.svg"

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
            <img src={Spinner} className="w-[32px] h-[32px]" alt="" />
        </div>
  )
}

export default Loader