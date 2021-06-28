import spinner from '../images/spinner.gif';

export default function Spinner ({title, subtitle}) {

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '200vh',
      background: '#fff',
      opacity: '0.8',
      zIndex: 1000
    }}>
      <div class='row'>
        <div class='col-10 mx-auto text-center' style={{marginTop: '30vh', opacity: 1}}>
          <br /><br />
          <div class='text-center'>
            <h3> {title} </h3>
            <span> {subtitle} </span>
          </div>
          <br />
          <img src={ spinner } style={{width: 75}}/>
      </div>
      </div>
    </div>
  )
}
