import React, {useRef, useState} from 'react'
import {Card, Button, Form, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import {Link, useNavigate} from 'react-router-dom'

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {currentUser ,updateEmail, updatePassword} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function handleSubmit(e){
        setError('')
        const promise = []
        e.preventDefault()
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }
     
        if(emailRef.current.value !== currentUser.email){
            promise.push(updateEmail(emailRef.current.value))
        }
        if(passwordConfirmRef.current.value ){
            promise.push(updatePassword(passwordRef.current.value))
        }
        Promise.all(promise).then((res)=>{
            navigate('/')
        }).catch((err)=>{
            setError(err.message)
        }).finally(()=>{
            setLoading(false)
        })
    }
  return (
    <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Update Profile</h2>
                <Form onSubmit={handleSubmit}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" required ref={emailRef}  defaultValue={currentUser.email}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"  ref={passwordRef}  placeholder="Leave blank to keep the same"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPasswordConfirm">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password"  ref={passwordConfirmRef}placeholder="Leave blank to keep the same" />
                    </Form.Group>
                    <br></br>
                    <Button disabled={loading} className='w-100' variant="primary" type="submit"> 
                        Update 
                    </Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            <Link to='/'>Cancel</Link>
        </div>
    </>
  )
}
