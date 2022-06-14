import React, { Component, useState } from 'react'
import './List.css'
import PropsTypes from 'prop-types'
import Modal from './Modal'

export default class List extends Component {
  static propTypes = {
    hotels:PropsTypes.array.isRequired
  }

  constructor(props)
  {
    super(props)
    this.state={slcData:{}, sorting:'', delData:{},sortedList:this.props.hotels}
  }
    
  componentDidMount() { 
    var newSortedData=this.props.hotels.sort((a, b)=>{
      return b.id - a.id;
        })
    this.setState({sorting:0})
    this.setState({sortedList:newSortedData}) 
    }
  render() {

    const ratingerPlus = (e)=>{
        const id = e.target.id;
        this.props.updateRating(id,'plus')

        //siralama sonucuna gore ilgili datanin rating degerinin guncellenmis halini set eden yontem
        var newSortedData=this.props.hotels.sort((a, b)=>{
          //en son secilen siralama bilgisine gore istenilirse bu return kullanilmali
          //return this.state.sorting == 1 ? a.rating - b.rating: this.state.sorting == 2 ? b.rating - a.rating: b.id - a.id
           return b.rating - a.rating
        })
        this.setState({sortedList:newSortedData}) 
    }

    const ratingerMinus = (e)=>{
      const id = e.target.id;
      this.props.updateRating(id,'minus')
      console.log('azalan', id)
      
      //siralama sonucuna gore ilgili datanin rating degerinin guncellenmis halini set eden yontem
      var newSortedData=this.props.hotels.sort((a, b)=>{
        //en son secilen siralama bilgisine gore istenilirse bu return kullanilmali
        //return this.state.sorting == 1 ? a.rating - b.rating: this.state.sorting == 2 ? b.rating - a.rating: b.id - a.id
        return b.rating - a.rating
      })
      this.setState({sortedList:newSortedData}) 
    }

    const deleteIndex = (item,name) => {
      let tempData ={id:item,hotel:name}
      setOpenModal(tempData)
    };

    const setOpenModal = (selectedData) => {
      this.setState({slcData: selectedData})
       document.getElementById('deleteModal').click()
    };  

    const handleSelectChange =(event) =>{
      var sorttype=event.target.value
      this.state.sorting =sorttype //guncel sorting degerini tutan state 
      var newSortedData=this.props.hotels.sort((a, b)=>{
        return sorttype == 1 ? a.rating - b.rating: sorttype == 2 ? b.rating - a.rating: b.id - a.id
      })
      this.setState({sortedList:newSortedData}) 
  }
    return (
      <div >
        <div className="alert alert-warning col-1 float-end" id='success' role="alert"> EKLENDI </div>
         <div className='container'>
           <div className='form-group'>
            <select onChange={handleSelectChange} id="itemSorting" className="w-50 mx-auto form-select form-select-lg " aria-label=".form-select-lg example">      
              <option value="0"> &#8645; Siralama</option>
              <option hidden value="3"> &#8645; Siralama</option>
              <option defaultValue={true} value="1">Puan (Artan)</option>
              <option value="2">Puan (Azalan)</option>
            </select>
            </div>
          <ul className='listField'>
             {
               this.state.sortedList.map((item,index)=>{
                 return(
                    <li className='obj' key={index} id={item.id}>
                    <div className="container">
                      <div className="card">
                        <div className="row">
                          <div className="col-12 col-md-4 text-center">
                            <img src="https://images.etstur.com/files/images/hotelImages/test/TR/50636/l/general-view--7-.jpg"
                            className="hotelImg rounded float-start" alt="..."/>
                          </div>
                          <div className="col-12 col-md-8 pr-0">
                            <div className="card-body">
                              <h5 className="card-title">{item.hotel}</h5>
                              <span className="cardText">{item.rating} Puan</span>
                              <div style={{display:"flex"}}>
                                <button className='btnRating plus btn btn-outline-primary' onClick={ratingerPlus} id={item.id}>PUAN ARTTIR</button>
                                <button className='btnRating minus btn btn-outline-primary' onClick={ratingerMinus} id={item.id}>PUAN AZALT</button>
                              
                              </div>
                            </div>
                          </div>
                          <div className="hover-btn">
                            <button type="button" className="close" onClick={()=>{deleteIndex(item.id, item.hotel)}} data-dismiss="alert">
                                X
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                 )
               })
             }
          </ul>
          <Modal setOpenModal={setOpenModal} slcData={this.state.slcData}/>
          </div>
      </div>
    )
  }
}
