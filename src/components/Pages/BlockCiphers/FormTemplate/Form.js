import React, { Component } from 'react';
import * as RandExp from "randexp";
import {
    padding,
    hexList,
    inputKey,
} from './Auxiliary'

import {
    SelectInput, Input, ErrorMessage, InputBox,
    Mode, SelectMode, InputIV, GenerateIV,
    Key, InputKey, KeyButton,
    Execution, Encrypt, Decrypt,
    Output, SelectOutput, OutputBox

} from './styles.js';


const validHex = RegExp('^(?:[0-9A-Fa-f]{2} ){0,31}[0-9A-Fa-f]{2}$');
const validBase64 = RegExp('^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$');

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {

            selectedInput: 'Hex',
            input: null,

            selectedMode: "ECB",
            inputIV: null,

            key: null,

            errors: {
                input: '',
                key: '',
                inputIV: '',
            }
        };

    }

    createRandomIV = () => {
        document.getElementById("inputIV").value = new RandExp(this.props.IVFormat).gen();
        this.setState({ inputIV: document.getElementById("inputIV").value });
    }

    createRandomKey = () => {
        document.getElementById("key").value = new RandExp(this.props.KeyFormat).gen();
        this.setState({ key: document.getElementById("key").value });
    }

    setFormatOption = (event) => {
        this.setState({ selectedInput: event.target.value });
    }

    setModeOption = (event) => {
        this.setState({ selectedMode: event.target.value });
        if (event.target.value === "ECB") {
            document.getElementById('inputIV').disabled = true;
            document.getElementById('generateIV').disabled = true;
            document.getElementById('inputIV').placeholder = "IV not required for ECB";
        } else {
            document.getElementById('inputIV').disabled = false;
            document.getElementById('generateIV').disabled = false;
            document.getElementById('inputIV').placeholder = "Enter IV";
            document.getElementById('generateIV').onclick = this.createRandomIV;
        }
    }

    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'input':
                if (this.state.selectedInput === 'Hex') {
                    errors.input = validHex.test(value)
                        ? ''
                        : 'Invalid format. Please type in Hex. Do not include a space at the end.';
                    break;
                } else if (this.state.selectedInput === 'Base64') {
                    errors.input = validBase64.test(value)
                        ? ''
                        : 'Invalid format. Please type in Base64 encoding';
                    break;
                }
            case 'key':
                errors.key = RegExp(this.props.KeyFormat).test(value)
                    ? ''
                    : 'Invalid key. Please type in hex a key of ' + this.props.KeyLength + ' bytes';
                break;
            case 'inputIV':
                if (this.state.selectedMode !== 'ECB') {
                    errors.inputIV = RegExp(this.props.IVFormat).test(value)
                        ? ''
                        : 'Invalid IV. Please type in hex a IV of ' + this.props.IVLength + ' bytes';
                    break;
                }

        }
        this.setState({ errors, [name]: value });
    };

    encrypt = (event) => {
        if (this.validateForm(this.state.errors)) {
            document.getElementById("output").value = this.props.ENCRYPT(
                hexList(this.props.size, padding(this.state.input.replace(/\s/g, ''))),
                inputKey(this.state.key.replace(/\s/g, '')),
                this.state.selectedMode,
                " "
            );
        } else {
            document.getElementById("output").value = "Invalid or Incomplete submission."
        }

    }


    //Form values
    render() {
        const { errors } = this.state;
        return (
            <div>
                {/*Input Section*/}
                <Input>
                    {/* Select form for Input formats */}
                    <SelectInput>
                        <select onChange={this.setFormatOption}>
                            <option value="Hex"> Hex</option>
                            <option value="Base64"> Base64</option>
                        </select>
                    </SelectInput>

                    {/* Input form */}
                    <InputBox name='input' placeholder="Type input here" onChange={this.handleChange} noValidate />

                    {/* Error Message informing users to submit valid input*/}
                    <ErrorMessage>
                        {errors.input.length > 0 &&
                            <span>{errors.input}</span>}
                    </ErrorMessage>
                </Input>

                {/*Modes of operation section*/}
                <Mode>
                    {/* Selection menu where users can choose a mode of operation to Encrypt and Decrypt inputs*/}
                    <SelectMode onChange={this.setModeOption}>
                        <option value="ECB">ECB - Electronic Codebook</option>
                        <option value="CBC">CBC - Cipher block chaining</option>
                        <option value="CFB">CFB - Cipher feedback</option>
                        <option value="OFB">OFB - Output feedback</option>
                    </SelectMode>

                    {/*Input box to submit valid Initialization Vector*/}
                    <InputIV name='inputIV' id="inputIV" disabled='true' placeholder="IV not required for ECB" onChange={this.handleChange} noValidate />

                    <GenerateIV id='generateIV' disabled='true'> Generate random IV </GenerateIV>

                    <ErrorMessage>
                        {errors.inputIV.length > 0 &&
                            <span>{errors.inputIV}</span>}
                    </ErrorMessage>


                </Mode>


                <Key>
                    <InputKey name='key' placeholder="Enter key" id="key" onChange={this.handleChange} noValidate></InputKey>

                    <KeyButton onClick={this.createRandomKey}> Genenerate random key </KeyButton>

                    <ErrorMessage>
                        {errors.key.length > 0 &&
                            <span>{errors.key}</span>}

                    </ErrorMessage >

                </Key>

                <Execution>
                    <Encrypt onClick={this.encrypt}> Encrypt </Encrypt>
                    <Decrypt> Decrypt </Decrypt>
                </Execution>

                <Output>
                    <SelectOutput  >
                        <option value="Hex"> Hex</option>
                        <option value="Base64"> Base64</option>
                    </SelectOutput>
                    <OutputBox id="output" disabled>

                    </OutputBox>
                </Output>
            </div>
        );
    }
}