import React, { Component } from 'react'
<script crossorigin src="https://cdn.jsdelivr.net/npm/sweetalert2@10/dist/sweetalert2.all.min.js"></script>  
export default class Form extends Component {
  state={id:'',hotel:'', rating:''}

  constructor(props){
    super(props)
  }
   
  render() {
  const onChangeHandle=(e)=>{this.setState({[e.target.name]:e.target.value})}

  function showMessage(){
    setTimeout(function () {
        document.getElementById('success').style.display='none';
    }, 3000);
  }
  function trigger(){
    setTimeout(function () {
      var element = document.getElementById("itemSorting");
      var trigger = Object.getOwnPropertyDescriptor(
        window.HTMLSelectElement.prototype,
        "value"
      ).set;
      trigger.call(element, 3); // 4 is the select option's value we want to set
      var event = new Event("change", { bubbles: true });
      element.dispatchEvent(event);
      document.getElementById('success').style.display='block';
  }, 500);
  }

  const saveHotelInfo=(event)=>{
    event.preventDefault()
    this.props.addHotel({...this.state});
    this.setState({hotel: '', rating:''})
    trigger()
    showMessage() 
  }

    return (
      <div>
        <button type="button" className="btn btn-outline-primary add" data-bs-toggle="modal" id='closeAddModal' data-bs-target="#staticBackdrop">+</button>
         <span className='bannerHotel'>OTEL EKLE</span>
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Otel Ekle</h5>
                <button type="button"  className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={saveHotelInfo} style={{width:"400px", margin:"0 auto", padding:"0"}}>
              <div className="modal-body">
                <div className="col-12">
                  <label htmlFor="inputAddress" className="form-label float-start">Otel Adı</label>
                  <input className="form-control" value={this.state.hotel} onChange={onChangeHandle} 
                  type="text" required name='hotel' id='hotel' ></input>
                </div>
                <div className="col-12">
                  <label htmlFor="inputAddress" className="form-label float-start">Puan</label>
                <input className="form-control" value={this.state.rating} onChange={onChangeHandle} 
                type="number" inputMode="decimal" required max="10" name='rating' id='rating'></input>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-outline-primary">EKLE</button>
                <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal">VAZGEÇ</button>
              </div>
              </form>
            </div>
          </div>
        </div>        
      </div>
    )
  }
}
