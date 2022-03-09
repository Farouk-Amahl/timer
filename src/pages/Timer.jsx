import { useState, useEffect } from "react";

function Timer(){
  const clients = require("../tables/clients.json");
  const projets = require("../tables/projets.json");
  const [go, setGo] = useState(false);
  const [client, setClient] = useState("");
  const [projet, setProjet] = useState("");
  const [listProject, setListProject] = useState([]);
  const ms = Date.now();

  const handleStart = () => {

    fetch(`https://akadi.makak.space/compteur/timer.php?cl=${client}&pr=${projet}&nocache=`+ms)
    /*fetch(`http://localhost/compteur/timer.php?cl=1&pr=1`)*/
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        setGo(data.start);
      });
  }

  const handleStop = () => {
    fetch(`https://akadi.makak.space/compteur/timer.php?id=2&nocache=`+ms)
      /*fetch(`http://localhost/compteur/timer.php?id=2`)*/
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        setGo(data.start);
      });
  }

  const handleClientChange = (e) => {
    setClient(e.target.value);
  }

  const handleProjetChange = (e) => {
    setProjet(e.target.value);
  }

  useEffect(() => {
    setListProject(projets.filter((projet) => projet.client === client));
  }, [client]);

  useEffect(() => {
    fetch(`https://akadi.makak.space/compteur/timer.php`)
    /*fetch(`http://localhost/compteur/timer.php`)*/
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        setGo(data.start);
      });
  }, []);

  return(
    <>
    { go ?
      <div>
      <select value={client} class="form-select" name="client" id="selectClient" onChange={handleClientChange}>
        <option selected>Select</option>
        { clients.map( (client) => <option key={client.id} value={client.id}>{client.name}</option> ) }
      </select>
      <select class="form-select" name="projet" onChange={handleProjetChange}>
        <option selected>Select</option>
        { client && listProject.map( (projet) => <option key={projet.id} value={projet.id}>{projet.name}</option> )}
      </select>
      <input type="button" onClick={handleStart} className="btn btn-secondary" value="start"/>
      </div>
      :
      <input type="button" onClick={handleStop} className="btn btn-warning" value="stop"/>
    }
    </>
  )
}

export default Timer;
