import styled from '@emotion/styled'

export const Space = styled.div`
    margin-top: 5%;
    margin-left: 25%;
    display: inline-block;
    positon: fixed;
    background-color: #80ced6;
`

export const SelectInput = styled.div`
    margin-bottom: 5px;
`
export const Input = styled.div`
    display: block;
    margin: 25px;
`
export const InputBox = styled.textarea`
    display: inline-block;
    border: solid 1px #000;
    min-height: 200px;
    width: 500px;
    resize: vertical;
    font-size: 150%; 
`
export const ErrorMessage = styled.div`
    padding: 5px 0 0 5px; 
    height: 20px; 
    width: 500px;
    left:0;
    top:0"
`




export const Mode = styled.div`
    margin: 25px;
`
export const SelectMode = styled.select`
    margin-top: 25px;
    margin-bottom: 10px;
    display: block;
`


export const InputIV = styled.input`
    display: inline-block;
    margin-right: 10px;
    width: 55%;
`

export const GenerateIV = styled.button`
    display: inline-block;
`


export const Key = styled.div`
    margin: 25px;
`
export const InputKey = styled.input`
    width: 55%;
    margin-right: 10px;
    display: inline-block;
`
export const KeyButton = styled.button`
    display: inline-block;
`


export const Execution = styled.div`
    margin: 25px;
`
export const Decrypt = styled.button`
    display: inline-block;
    padding: 15px 25px;
    font-size: 24px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    outline: none;
    color: #fff;
    background-color: #4CAF50;
    border: solid;
    border-color: black;
    border-width: 7px;
    box-shadow: 0 9px #999;
    

    &:hover {
        background-color: #3e8e41
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 5px #666;
        transform: translateY(4px);
      }
`
export const Encrypt = styled.button`
    display: inline-block;
    padding: 15px 25px;
    font-size: 24px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    outline: none;
    color: #fff;
    background-color: #f44336;
    border: solid;
    border-color: black;
    border-width: 7px;
    box-shadow: 0 9px #999;
    margin-right: 25px;

    &:hover {
      background-color: #FF0000
    }

    &:active {
        background-color: #FF0000;
        box-shadow: 0 5px #666;
        transform: translateY(4px);
    }
`

export const Output = styled.div`
    margin: 25px;
`
export const SelectOutput = styled.select`
    margin-bottom: 5px;
`
export const OutputBox = styled.textarea`
    display: block;
    border: solid 1px #000;
    min-height: 200px;
    width: 500px;
    resize: vertical;
    font-size: 150%; 
`