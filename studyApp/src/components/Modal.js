import React, { Component } from 'react'

export default class Modal extends Component {
    state={delData:{}}

    constructor(props){
      super(props)
    //   if (localStorage.getItem("delData") === null) {
    //     this.state = {delData: {id:1, name: "Hotel 1"}}
    //   }
    //   else{
    //     this.state = {delData: JSON.parse(localStorage.getItem('delData'))}
    //     //this.state = {date: new Date()};
    //   }
    }

  render() {
      
    function showMessage(){
      setTimeout(function () {
          document.getElementById('deleted').style.display='none';
      }, 3000);
    }

    const deleteHotel = (ID) => {
        let items =JSON.parse(localStorage.getItem("hotel"));
        console.log(items.length)
        items = items.filter(
          (item) => item.id !== ID,
          document.getElementById(ID).remove()
        );
        localStorage.setItem("hotel", JSON.stringify(items));
        if (items.length === 0) { 
        localStorage.removeItem("hotel");
        }
        document.getElementById('deleted').style.display='block';
        document.getElementById('deleteModal').click()
        showMessage()
      };
    return (
      
      <div>
        <button type="button" className="btn btn-primary btnDelBtn" data-bs-toggle="modal" data-bs-target="#exampleModal" id='deleteModal'>hideDeleteButton</button>
        <div className="alert alert-warning col-1 float-end" id='deleted' role="alert"> SİLİNDİ </div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel"></h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p> <b>{this.props.slcData.hotel}</b>'i silmek istediğinizden emin misiniz?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={()=>{deleteHotel(this.props.slcData.id)}} className="btn btn-outline-primary">OTELİ SİL</button>
                    <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal">VAZGEÇ</button>
                </div>
                </div>
            </div>
        </div>

      </div>
    )
  }
}
