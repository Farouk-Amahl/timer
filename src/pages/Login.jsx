import { useState } from "react";

function Login({setAccess}){
  const [log, setLog] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://akadi.makak.space/compteur/log.php?log=${log}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setAccess(data.pass);
      });
  }


  return(
    <form onSubmit={handleSubmit}>
      <input type="password" className="form-control" onChange={e => setLog(e.target.value)} />
    </form>
  )
}

export default Login;
