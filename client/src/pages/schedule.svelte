<script>
    /* Images */
let anon = "anonymous.png";
let name = "name?"
</script>

<h1>Opening Hours</h1>
<div id="schedule">
  <div>
    <p>Mandag-fredag kl. 8.30-11.45 og 12.30-15.45 (bemandet).</p>

    <p>
      Som datamatikerstuderende har du adgang til Code Lab i KEAS GENERELLE
      ÅBNINGSTIDER.
    </p>

    <p>
      I den bemandede åbningstid kan du se på vagtplanen, hvilken tutor der har
      vagten.
    </p>
    <div id="schedule-table">
    <table>
        <tr>
            <th>Tid</th>
            <th>Mandag</th>
            <th>Tirsdag</th>
            <th>Onsdag</th>
            <th>Torsdag</th>
            <th>Fredag</th>
        </tr>
        <tr>
            <td>  8.30-11.45</td> 
            <td><img src={anon} alt="image of tutor"/><p class="name">{name}</p></td>
            <td><img src={anon} alt="image of tutor"/><p class="name">{name}</p></td>
            <td><img src={anon} alt="image of tutor"/><p class="name">{name}</p></td>
            <td><img src={anon} alt="image of tutor"/><p class="name">{name}</p></td>
            <td><img src={anon} alt="image of tutor"/><p class="name">{name}</p></td>
        </tr>
        <tr>
            <td>12.30-15.45</td>
            <td><img src={anon} alt="image of tutor"/><p class="name">{name}</p></td>
            <td><img src={anon} alt="image of tutor"/><p class="name">{name}</p></td>
            <td><img src={anon} alt="image of tutor"/><p class="name">{name}</p></td>
            <td><img src={anon} alt="image of tutor"/><p class="name">{name}</p></td>
            <td><img src={anon} alt="image of tutor"/><p class="name">{name}</p></td>
        </tr>
    </table>
</div>
  </div>
  <div id="green-box">
    <h4>ADGANG TIL LABBET</h4>
    <p>Code Lab er udelukkende for studerende på datamatikeruddannelsen.</p>
  </div>
</div>

<style>
  h1,
  h4 {
    margin: 5px;
  }
  img {
    height: 50px;
  }
  
  .name {
    margin: 0px;
  }

  #schedule {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px;
    text-align: left;
    min-height: 350px;
  }
  #schedule-table {
    display:flex;
    justify-content: center;
  }

  #green-box {
    bottom: 0;
    background-color: rgb(130, 225, 191);
    padding: 5px;
    ;
  }
</style>
