import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
function Empty() {
   const navigate = useNavigate();
   useEffect(() => {
      navigate('/');
   })
   return (<></>)
}
export default Empty;