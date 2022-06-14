import React, { Component } from "react";
import Form from "./Form";
import List from "./List";

export default class Hotel extends Component {
  state = {
    name: [
      {id:1, hotel: "Hotel 1", rating: 9.7 },
      {id:2, hotel: "Hotel 2", rating: 5.0 },
      {id:3, hotel: "Hotel 3", rating: 8.4 }
    ],
    rating:''
  };

    constructor(props){
      super(props)
       localStorage.setItem('hotel', JSON.stringify(this.state.name))
    }

    componentDidMount() { 
      //console.log(localStorage.getItem('hotel'))
     }

  render() {
      const updateRating = (data,type) =>{
         const hotels= JSON.parse(localStorage.getItem('hotel'))
        // localStorage.removeItem("hotel");
         const index = hotels.findIndex(o=>{return o.id == data})
        //  console.log('rating',hotels[index].rating)
          const indexRating = hotels[index].rating
          const setValue = 0.1
          // console.log('ratingsert',indexRating)
         type == 'plus' ? 
         hotels[index].rating=parseFloat((indexRating + setValue).toFixed(1)) : 
         hotels[index].rating=parseFloat((indexRating - setValue).toFixed(1))

        //  if(type == 'plus'){
        //   console.log('index',hotels[index].id)
        //   // hotels[index].rating=((hotels[index].rating)+0.1).toFixed(1)
        //  }
        //  else{
        //   hotels[index].rating=((hotels[index].rating)-0.1).toFixed(1)
        //  }
        console.log('array',hotels)
        // updateData(hotels)
        this.setState({name:hotels}) 
        //  hotels.push(newData)
         localStorage.setItem('hotel', JSON.stringify(hotels))
        
      }

      // const updateData = (data) =>{
      //   this.setState({name:data}) 
      // }


    const addHotel = (data) => {
      const name= JSON.parse(localStorage.getItem('hotel'))
            const maximum = name.reduce(function (prev, curr) {
        return prev.id > curr.id ? prev : curr
      })
      const newData = {...data, id:maximum.id+1}
      name.push(newData)
      localStorage.setItem('hotel', JSON.stringify(name))
      this.setState ({name: JSON.parse(localStorage.getItem('hotel'))})
      //Proje boyutunun yuksel olmamasi adina Bootstrap cdn ile dahil ettigim icin asil ilgili tetikleyiciyi kullanamadigim icin ilgili ID ye konumlanip tetiklemek durumunda kaldim.
      // bootstrap.Modal.getOrCreateInstance('#staticBackdrop').hide()
      document.getElementById('closeAddModal').click()
    };
    return (
      <div>
        <Form addHotel={addHotel} />
        <List updateRating={updateRating} hotels={this.state.name} />
        {/* <button onClick={ratingerPlus}>PUAN ARTTIR</button>
          <button onClick={ratingerMinus}>PUAN AZALT</button> */}
      </div>
    );
  }
}
