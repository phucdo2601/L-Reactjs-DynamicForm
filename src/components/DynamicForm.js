import { Button, Container, IconButton, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
        }
    },
    button: {
        margin: theme.spacing(1),
      }
}))



const DynamicForm = () => {

    const classes = useStyles();

    const [isSendClicked, setIsSendClicked] = useState(false);

    const dataArrInit = [
        {
            id: uuidv4(),
            firstName: '',
            lastName: '',
        },
       
    ]

    const [inputFields, setInputFields] = useState(dataArrInit);

    const handleChangeInput = (index, e) => {
        const values = [...inputFields];
        values[index][e.target.name] = e.target.value
        setInputFields(values);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSendClicked(true);
        console.log("InputFields: ",inputFields);
    }

    const handleAddFields = () => {
        setInputFields([...inputFields, { id: uuidv4(),  firstName: '', lastName: '' }])
      }
    
      const handleRemoveFields = id => {
        const values  = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
      }

  return (
    <>
        <Container>
            <h1>Add new Member</h1>

            <form className={classes.root} onSubmit={handleSubmit}>
                {
                    inputFields.map((inputField, index) => (
                        <>
                            <div key={index}>
                               <TextField 
                                    name='firstName'
                                    label='First Name'
                                    value={inputField.firstName}
                                    variant="filled"
                                    onChange={(e) => handleChangeInput(index, e)}
                                    />

                                <TextField 
                                    name='lastName'
                                    label='Last Name'
                                    value={inputField.lastName}
                                    variant="filled"
                                    onChange={(e) => handleChangeInput(index, e)}

                                    />

                                <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                                    <RemoveIcon />
                                </IconButton>

                                <IconButton onClick={handleAddFields}>
                                    <AddIcon />
                                </IconButton>
                            </div>
                        </>
                    )) 
                }

                <Button 
                className={classes.button}
                variant="contained" 
                color="primary" 
                type="submit"
                endIcon={<Icon>send</Icon>}
                onClick={handleSubmit}
                >
                    Send
                </Button>
            </form>

            <hr />
            
            {
                isSendClicked && <>
                    {
                        inputFields.map((model, index) =>(
                            <div>
                                {model.firstName} - {model.lastName}
                            </div>
                        ))
                    }
                </>
            }
        </Container>
    </>
  )
}

export default DynamicForm