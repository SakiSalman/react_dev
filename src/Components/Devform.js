import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Devform = () => {


    // get all filelds
    const [ input, setInput] = useState({

        name : '',
        email : '',
        phone : '',
        photo : ''

    });

    // get all data
    let { name, email, phone, photo } = input;


    // form management

    const handleSubmit = (e) => {

        e.preventDefault()

         if ( name === '' || email === '' || phone === '' || photo === '' ) {
             
            setAlert({
                msg : 'All Fields are Required!',
                type : 'danger',
                status : true
            });

         }else{


            axios.post("http://localhost:5050/users", input).then(res =>{

                setAlert({
                    msg : 'Data Stable!',
                    type : 'success',
                    status : true
                });
    
                setInput({
                    name : '',
                    email : '',
                    phone : '',
                    photo : ''
                });

            }).catch( err => {
                console.log(err);
            });
           
         }
    }

    // alert manaagement

    const [alert, setAlert] = useState({
        msg : '',
        type : 'danger',
        status : false

    });
    // alertclose
    const handleClose = () => {

        setAlert({

            status : false
        });

    }
    // get users data 
    const [ users, setUsers] = useState([]);
    console.log(users);
    // Get all Userers

   useEffect( () => {

            axios.get('http://localhost:5050/users').then( res => {

                setUsers( res.data);


            }).catch(error => {
                console.log(error);
            });



   }, [users]);

//    User Delate Mamagemenr

   const handleDelate = (id) => {

            axios.delete('http://localhost:5050/users/' + id).then( res => {  
                
                setAlert({
                    msg : 'User Delated',
                    type : 'danger',
                    status : true
                })

            });
   }


  return (
    <>
    
    <div className="container">
        <div className="row mt-5">
            <div className="col-md-4">
               <div className="card border-primary">
                   <div className="card-header">
                       <h3>Create a User</h3>

                        {
                            alert.status && <p className={`alert alert-${alert.type} d-flex justify-content-between`}> {alert.msg}  <button className='btn-close' onClick={handleClose}></button></p>
                        }
                       
                   </div>
                   <div className="card-body">
                   <form action="" onSubmit={handleSubmit}>
                    <div className="form-group mt-2">
                        <label htmlFor="name">Your Name</label>
                        <input type="text" className="form-control" id='name' value={input.name} onChange={ e => setInput({ ...input, name : e.target.value})}/>
                    </div>
                    <div className="form-group mt-2">
                    <label htmlFor="email">Your E-mail</label>
                        <input type="text" className="form-control" id='email' value={input.email} onChange={ e => setInput({ ...input, email : e.target.value})}/>
                    </div>
                    <div className="form-group mt-2">
                    <label htmlFor="phone">Your Phone</label>
                        <input type="text" className="form-control" id='phone' value={input.phone} onChange={ e => setInput({ ...input, phone : e.target.value})}/>
                    </div>
                    <div className="form-group mt-2">
                    <label htmlFor="photo">Your photo</label>
                        <input type="text" className="form-control" id='photo' value={input.photo} onChange={ e => setInput({ ...input, photo : e.target.value})}/>
                    </div>
                    <div className="form-group mt-2">
                        <input type="submit" className="btn btn-success w-100" value={'Submit'} id='photo'/>
                    </div>
                </form>
                   </div>
               </div>
            </div>
            <div className="col-md-8">

                <div className="card border-primary">
                    <div className="card-body">

                        <table className="table table-striped">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Photo</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>


                                {

                                    users.map( (data, index) =>

                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.phone}</td>
                                        <td> <img  style={ { width : '50px', height : '50px', objectFit : 'cover' } } src={data.photo} alt="" /></td>
                                        <td> <p onClick={ () => handleDelate( data.id )} className="btn btn-danger">Delate</p></td>
                                        
                                    </tr>

                                    )  

                                }

                               

                            </tbody>
                        </table>
                    </div>
                </div>
                            
            </div>
        </div>
    </div>
    
    </>
  )
}

export default Devform;